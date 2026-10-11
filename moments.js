(function () {
  "use strict";
  const carousel = document.querySelector("#moments-grid");
  if (!carousel || !window.SITE_DATA) return;
  const preview = new URLSearchParams(location.search).get("preview") === "1";
  const source = preview ? window.MOMENTS_PREVIEW : window.SITE_DATA.moments;
  const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  const yearOf = (item) => /^\d{4}-\d{2}-\d{2}$/.test(item.date || "") ? item.date.slice(0, 4) : /^\d{4}$/.test(String(item.year || "")) ? String(item.year) : null;
  const groups = new Map();
  (Array.isArray(source) ? source : []).forEach((item) => {
    if (!item || !item.id || !item.thumbnail || (item.type === "video" ? !/^https?:\/\//i.test(item.link || "") : !item.media)) return;
    const year = yearOf(item);
    if (!year) return;
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year).push(item);
  });
  const albums = [...groups].sort(([a], [b]) => b.localeCompare(a)).map(([year, items]) => ({ year, items: items.sort((a, b) => (b.date || "").localeCompare(a.date || "") || (a.order ?? 0) - (b.order ?? 0)) }));
  document.querySelector("#album-preview-label").hidden = !preview;
  if (!albums.length) {
    carousel.classList.add("is-empty");
    carousel.innerHTML = '<div class="album-empty"><h2>相册正在整理</h2><p>照片、GIF 与短片整理好后，会按年份收进相册。</p></div>';
    return;
  }
  const shelf = document.querySelector("#album-shelf");
  const yearPrev = document.querySelector("#album-year-prev");
  const yearNext = document.querySelector("#album-year-next");
  const yearStatus = document.querySelector("#album-year-status");
  const reader = document.querySelector("#album-reader");
  const book = document.querySelector("#album-book");
  const back = document.querySelector("#album-back");
  const pagePrev = document.querySelector("#album-page-prev");
  const pageNext = document.querySelector("#album-page-next");
  const pageStatus = document.querySelector("#album-page-status");
  const hint = reader.querySelector(".album-hint");
  const dialog = document.querySelector("#media-dialog");
  const dialogMedia = dialog.querySelector(".dialog-media");
  const dialogCaption = dialog.querySelector(".dialog-caption");
  const wideScreen = matchMedia("(min-width: 768px)");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const host = document.createElement("div");
  host.className = "album-flip-host";
  const staticSpread = document.createElement("div");
  staticSpread.className = "album-spread";
  const corners = ["top-left", "top-right", "bottom-left", "bottom-right"].map((position) => {
    const corner = document.createElement("span");
    corner.className = "album-corner";
    corner.dataset.corner = position;
    corner.setAttribute("aria-hidden", "true");
    return corner;
  });
  book.append(host, staticSpread, ...corners);
  let selectedAlbum = 0;
  let pageIndex = 0;
  let pageSize = wideScreen.matches ? 2 : 1;
  let engine = null;
  let pages = [];
  let engineAlbum = -1;
  let engineFailed = false;
  let staticMode = true;
  let rebuilding = false;
  let busy = false;
  let loading = false;
  let loadVersion = 0;
  let gesture = null;
  let suppressClickUntil = 0;
  let lastTrigger = null;
  let focusAfterTurn = null;
  let lastWidth = 0;
  let lastHeight = 0;
  let resizeFrame = 0;
  const album = () => albums[selectedAlbum];
  document.querySelector("#album-shelf-controls").hidden = false;
  carousel.innerHTML = albums.map((entry, index) => `<button type="button" class="year-album" data-album="${index}" aria-label="打开 ${entry.year} 年相册，共 ${entry.items.length} 条内容"><span class="year-cover"><span>${entry.year}年</span></span></button>`).join("");
  const covers = [...carousel.querySelectorAll(".year-album")];
  function drawShelf() {
    covers.forEach((cover, index) => {
      const slot = index - selectedAlbum;
      cover.hidden = Math.abs(slot) > 2;
      cover.style.setProperty("--slot", slot);
      cover.style.setProperty("--tilt", slot === 0 ? "0deg" : slot < 0 ? "28deg" : "-28deg");
      cover.style.setProperty("--scale", slot === 0 ? "1" : "0.84");
      cover.style.zIndex = String(3 - Math.abs(slot));
      cover.setAttribute("aria-current", String(slot === 0));
    });
    yearPrev.disabled = selectedAlbum === 0;
    yearNext.disabled = selectedAlbum === albums.length - 1;
    yearStatus.textContent = `${album().year}年 · ${album().items.length}页`;
  }
  function selectAlbum(offset) {
    const next = selectedAlbum + offset;
    if (next < 0 || next >= albums.length) return;
    selectedAlbum = next;
    drawShelf();
  }
  function pageHtml(index) {
    const item = album().items[index];
    if (!item) return '<div class="album-page album-page-blank" data-density="soft" aria-hidden="true" inert></div>';
    const caption = item.text || "";
    const alt = caption || `${album().year}年相册第${index + 1}张照片`;
    const action = item.type === "video" ? `href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer"` : `href="${escapeHtml(item.media)}" data-full="${escapeHtml(item.media)}" data-caption="${escapeHtml(alt)}"`;
    // Portrait leaves are cloned by StPageFlip: preserve identity without duplicate IDs.
    return `<div class="album-page" data-density="soft" data-moment-id="${escapeHtml(item.id)}" data-page-index="${index}" aria-hidden="true" inert><div class="album-page-content"><a class="album-photo is-loading" ${action} tabindex="-1" aria-label="${escapeHtml(item.type === "video" ? `观看短片：${alt}` : `查看原图：${alt}`)}"><img src="${escapeHtml(item.thumbnail)}" alt="${escapeHtml(alt)}" decoding="async" draggable="false">${item.type === "video" ? '<span class="album-video-action">观看短片 ↗</span>' : ""}</a><div class="album-page-note"><div>${item.date ? `<time datetime="${escapeHtml(item.date)}">${escapeHtml(item.date.replaceAll("-", "."))}</time>` : ""}${caption ? `<p>${escapeHtml(caption)}</p>` : ""}</div><span>${index + 1}</span></div></div></div>`;
  }
  function syncAccess() {
    book.querySelectorAll(".album-page").forEach((page) => {
      const index = Number(page.dataset.pageIndex);
      const original = staticMode ? staticSpread.contains(page) : pages.includes(page);
      const active = original && !reader.hidden && !busy && page.hasAttribute("data-page-index") && index >= pageIndex && index < pageIndex + pageSize;
      page.inert = !active;
      page.setAttribute("aria-hidden", String(!active));
      page.querySelectorAll("a").forEach((link) => { link.tabIndex = active ? 0 : -1; });
    });
  }
  function updateControls() {
    pagePrev.disabled = busy || pageIndex === 0;
    pageNext.disabled = busy || pageIndex + pageSize >= album().items.length;
    const last = Math.min(pageIndex + pageSize, album().items.length);
    pageStatus.textContent = last > pageIndex + 1 ? `${pageIndex + 1} - ${last} / ${album().items.length}` : `${pageIndex + 1} / ${album().items.length}`;
    book.setAttribute("aria-busy", String(busy));
    hint.textContent = loading ? "照片加载中" : staticMode ? "左右翻页 · 点击照片查看原图" : "拖动页角或左右翻页 · 点击照片查看原图";
    corners.forEach((corner) => {
      const direction = corner.dataset.corner.endsWith("left") ? -1 : 1;
      corner.hidden = staticMode || (direction < 0 ? pageIndex === 0 : pageIndex + pageSize >= album().items.length);
    });
    syncAccess();
  }
  function settle() {
    if (rebuilding) return;
    if (!staticMode) pageIndex = Math.min(engine.getCurrentPageIndex(), album().items.length - 1);
    busy = loading;
    updateControls();
    if (focusAfterTurn) {
      const control = focusAfterTurn;
      focusAfterTurn = null;
      (control.disabled ? control === pageNext ? pagePrev : pageNext : control).focus({ preventScroll: true });
    }
  }
  function finishTurn() {
    if (gesture?.corner && engine && !staticMode) engine.userStop(gesture.point);
    if (gesture) {
      if (book.hasPointerCapture(gesture.id)) book.releasePointerCapture(gesture.id);
      gesture = null;
    }
    if (engine && !staticMode) {
      engine.getRender().finishAnimation();
      const render = engine.getRender();
      // Clear a fold interrupted before the renderer has an animation to finish.
      render.setBottomPage(null);
      render.setFlippingPage(null);
      render.clearShadow();
      engine.getFlipController().reset();
      engine.getFlipController().setState("read");
      pageIndex = Math.min(engine.getCurrentPageIndex(), album().items.length - 1);
    }
    busy = loading;
    focusAfterTurn = null;
  }
  function drawStatic() {
    staticSpread.innerHTML = pageHtml(pageIndex) + (pageSize === 2 ? pageHtml(pageIndex + 1) : "");
    refreshImages();
  }
  function configureReader(reset = false) {
    const focusedPhoto = dialog.open ? lastTrigger : document.activeElement.closest?.(".album-photo");
    const focusedIndex = focusedPhoto?.closest(".album-page")?.dataset.pageIndex;
    finishTurn();
    const savedIndex = reset ? 0 : focusedIndex === undefined ? pageIndex : Number(focusedIndex);
    pageSize = wideScreen.matches ? 2 : 1;
    pageIndex = Math.floor(savedIndex / pageSize) * pageSize;
    staticMode = reducedMotion.matches || engineFailed || !window.St?.PageFlip || album().items.length === 1;
    book.dataset.renderer = staticMode ? "static" : "paper";
    book.classList.toggle("is-single", pageSize === 1);
    host.hidden = staticMode;
    staticSpread.hidden = !staticMode;
    rebuilding = true;
    if (staticMode) drawStatic();
    else {
      try {
        const width = book.clientWidth / pageSize;
        const height = book.clientHeight;
        if (!engine) {
          engine = new window.St.PageFlip(host, { width, height, size: "fixed", usePortrait: pageSize === 1, autoSize: false, flippingTime: 650, maxShadowOpacity: .14, showCover: false, useMouseEvents: false, showPageCorners: false, mobileScrollSupport: true });
          engine.on("flip", () => { if (!rebuilding) { pageIndex = Math.min(engine.getCurrentPageIndex(), album().items.length - 1); updateControls(); } });
          engine.on("changeState", ({ data }) => {
            if (rebuilding) return;
            if (data === "read") settle();
            else { busy = true; updateControls(); }
          });
          host.innerHTML = album().items.map((_, index) => pageHtml(index)).join("") + (album().items.length % 2 ? pageHtml(album().items.length) : "");
          pages = [...host.children];
          engine.loadFromHTML(pages);
          engineAlbum = selectedAlbum;
        } else {
          Object.assign(engine.getSettings(), { width, height, usePortrait: pageSize === 1 });
          engine.update();
          if (engineAlbum !== selectedAlbum) {
            engine.turnToPage(0);
            const template = document.createElement("template");
            template.innerHTML = album().items.map((_, index) => pageHtml(index)).join("") + (album().items.length % 2 ? pageHtml(album().items.length) : "");
            pages = [...template.content.children];
            engine.updateFromHtml(pages);
            engineAlbum = selectedAlbum;
          }
        }
        engine.turnToPage(pageIndex);
        refreshImages();
      } catch (error) {
        console.warn("相册翻页组件不可用，已切换为静态浏览。", error);
        engineFailed = true;
        staticMode = true;
        host.hidden = true;
        staticSpread.hidden = false;
        book.dataset.renderer = "static";
        drawStatic();
      }
    }
    rebuilding = false;
    lastWidth = book.clientWidth;
    lastHeight = book.clientHeight;
    updateControls();
    if (focusedIndex !== undefined) {
      const replacement = activePhoto(Number(focusedIndex));
      if (dialog.open) lastTrigger = replacement;
      else replacement?.focus({ preventScroll: true });
    }
  }
  function activePhoto(index) {
    return [...book.querySelectorAll(".album-page")].find((page) => Number(page.dataset.pageIndex) === index && (staticMode ? staticSpread.contains(page) : pages.includes(page)))?.querySelector(".album-photo");
  }
  async function openAlbum(index) {
    selectedAlbum = index;
    pageIndex = 0;
    loading = true;
    busy = true;
    const version = ++loadVersion;
    drawShelf();
    shelf.hidden = true;
    reader.hidden = false;
    document.querySelector("#album-reader-title").textContent = `${album().year}年`;
    configureReader(true);
    back.focus({ preventScroll: true });
    if (!reducedMotion.matches) reader.classList.add("is-entering");
    // Decode original leaves before folding. Temporary copies reuse the same decoded assets.
    await Promise.all([...book.querySelectorAll("img")].map((image) => image.decode().catch(() => {})));
    if (version !== loadVersion || reader.hidden) return;
    refreshImages();
    loading = false;
    settle();
  }
  function turnPage(direction) {
    if (busy || reader.hidden || dialog.open) return;
    const target = pageIndex + direction * pageSize;
    if (target < 0 || target >= album().items.length) return;
    focusAfterTurn = [pagePrev, pageNext].includes(document.activeElement) ? document.activeElement : document.activeElement.closest?.(".album-photo") ? (direction > 0 ? pageNext : pagePrev) : null;
    if (staticMode) { pageIndex = target; drawStatic(); settle(); }
    else {
      busy = true;
      updateControls();
      // 2.0.7 scales duration by pixel distance below 1000px. Normalize button
      // turns to 650ms on small pages; drag completion keeps the native timing.
      const bounds = engine.getBoundsRect();
      const steps = Math.floor(Math.max(bounds.pageWidth * 2 - bounds.height / 10, bounds.height / 10)) + 1;
      engine.getSettings().flippingTime = 650 / Math.min(1, steps / 1000);
      if (direction > 0) engine.flipNext("bottom");
      else engine.flipPrev("bottom");
      engine.getSettings().flippingTime = 650;
    }
  }
  function refreshImages() { book.querySelectorAll("img").forEach((image) => { if (image.complete) imageState(image); }); }
  function imageState(image) {
    image.parentElement.classList.remove("is-loading");
    if (image.naturalWidth) return;
    image.hidden = true;
    if (image.parentElement.querySelector(".album-image-error")) return;
    const message = document.createElement("span");
    message.className = "album-image-error";
    message.textContent = "图片暂时无法加载";
    image.parentElement.appendChild(message);
  }
  carousel.addEventListener("click", (event) => { const cover = event.target.closest("[data-album]"); if (cover) openAlbum(Number(cover.dataset.album)); });
  yearPrev.addEventListener("click", () => selectAlbum(-1));
  yearNext.addEventListener("click", () => selectAlbum(1));
  pagePrev.addEventListener("click", () => turnPage(-1));
  pageNext.addEventListener("click", () => turnPage(1));
  back.addEventListener("click", () => {
    finishTurn();
    ++loadVersion;
    loading = false;
    busy = false;
    reader.hidden = true;
    reader.classList.remove("is-entering");
    shelf.hidden = false;
    syncAccess();
    drawShelf();
    covers[selectedAlbum].focus({ preventScroll: true });
  });
  reader.addEventListener("animationend", () => reader.classList.remove("is-entering"));
  function resizeReader() {
    if (reader.hidden) return;
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => {
      if (book.clientWidth !== lastWidth || book.clientHeight !== lastHeight || pageSize !== (wideScreen.matches ? 2 : 1)) configureReader();
    });
  }
  window.addEventListener("resize", resizeReader);
  wideScreen.addEventListener("change", resizeReader);
  new ResizeObserver(resizeReader).observe(book);
  reducedMotion.addEventListener("change", () => { if (!reader.hidden) configureReader(); });
  document.addEventListener("keydown", (event) => {
    if (dialog.open || document.body.classList.contains("menu-open") || event.altKey || event.ctrlKey || event.metaKey || event.target.closest("input, textarea, select")) return;
    if ((event.key === "ArrowLeft" || event.key === "ArrowRight") && document.querySelector(".album-shell").contains(document.activeElement)) {
      event.preventDefault();
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      if (reader.hidden) selectAlbum(direction); else turnPage(direction);
    }
  });
  function localPoint(event) { const rect = engine.getUI().getDistElement().getBoundingClientRect(); return { x: event.clientX - rect.left, y: event.clientY - rect.top }; }
  book.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0 || busy || dialog.open) return;
    const corner = event.target.closest(".album-corner");
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, corner: !!corner, point: null, moved: false };
    if (corner && !staticMode) { event.preventDefault(); gesture.point = localPoint(event); engine.startUserTouch(gesture.point); book.setPointerCapture(event.pointerId); }
  });
  window.addEventListener("pointermove", (event) => {
    if (!gesture || gesture.id !== event.pointerId || !gesture.corner) return;
    event.preventDefault();
    gesture.point = localPoint(event);
    gesture.moved ||= Math.hypot(event.clientX - gesture.x, event.clientY - gesture.y) > 5;
    // Lock originals before the component creates an inaccessible portrait copy.
    if (gesture.moved) { busy = true; updateControls(); }
    engine.userMove(gesture.point, true);
  });
  function endGesture(event, cancelled = false) {
    if (!gesture || gesture.id !== event.pointerId) return;
    const current = gesture;
    gesture = null;
    if (book.hasPointerCapture(event.pointerId)) book.releasePointerCapture(event.pointerId);
    if (current.corner) {
      suppressClickUntil = performance.now() + 400;
      if (cancelled) engine.userStop(current.point, true);
      else {
        const point = localPoint(event);
        engine.userMove(point, true);
        engine.userStop(point);
      }
      if (cancelled) finishTurn();
      if (engine.getState() === "read") settle();
    } else if (!cancelled) {
      const dx = event.clientX - current.x;
      const dy = event.clientY - current.y;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) { suppressClickUntil = performance.now() + 400; turnPage(dx < 0 ? 1 : -1); }
      else if (Math.hypot(dx, dy) > 12) suppressClickUntil = performance.now() + 400;
    } else suppressClickUntil = performance.now() + 400;
  }
  window.addEventListener("pointerup", (event) => endGesture(event));
  window.addEventListener("pointercancel", (event) => endGesture(event, true));
  book.addEventListener("lostpointercapture", (event) => { if (gesture?.id === event.pointerId) endGesture(event, true); });
  book.addEventListener("dragstart", (event) => event.preventDefault());
  book.addEventListener("click", (event) => {
    if (performance.now() < suppressClickUntil || busy) { event.preventDefault(); event.stopPropagation(); return; }
    const trigger = event.target.closest("a[data-full]");
    if (!trigger) return;
    event.preventDefault();
    lastTrigger = trigger;
    const image = document.createElement("img");
    image.src = trigger.dataset.full;
    image.alt = trigger.dataset.caption;
    dialogMedia.replaceChildren(image);
    dialogCaption.textContent = trigger.dataset.caption;
    dialog.showModal();
  }, true);
  ["load", "error"].forEach((type) => book.addEventListener(type, (event) => { if (event.target.tagName === "IMG") imageState(event.target); }, true));
  let shelfGesture = null;
  let shelfSuppressClick = false;
  carousel.addEventListener("pointerdown", (event) => { shelfSuppressClick = false; if (event.isPrimary && event.button === 0) shelfGesture = { id: event.pointerId, x: event.clientX, y: event.clientY }; });
  carousel.addEventListener("pointerup", (event) => {
    if (!shelfGesture || shelfGesture.id !== event.pointerId) return;
    const dx = event.clientX - shelfGesture.x;
    const dy = event.clientY - shelfGesture.y;
    shelfGesture = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) { shelfSuppressClick = true; selectAlbum(dx < 0 ? 1 : -1); }
  });
  carousel.addEventListener("pointercancel", () => { shelfGesture = null; });
  carousel.addEventListener("click", (event) => { if (shelfSuppressClick) { event.preventDefault(); event.stopImmediatePropagation(); shelfSuppressClick = false; } }, true);
  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("close", () => {
    dialogMedia.replaceChildren();
    if (lastTrigger?.isConnected && !lastTrigger.closest("[inert]")) lastTrigger.focus({ preventScroll: true }); else back.focus({ preventScroll: true });
    lastTrigger = null;
  });
  drawShelf();
})();
