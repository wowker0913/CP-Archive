(function () {
  "use strict";
  const data = window.SITE_DATA;
  if (!data) return;
  if (Array.isArray(data.timelineLinks) || Array.isArray(data.timelineImages)) {
    data.timeline = [
      ...(Array.isArray(data.timelineLinks) ? data.timelineLinks : []),
      ...(Array.isArray(data.timelineImages) ? data.timelineImages : [])
    ];
  }
  document.documentElement.classList.add("js");
  const currentPage = document.body.dataset.page;
  const navItems = [["home", "01", "HOME", "index.html"], ["profile", "02", "PROFILE", "profile.html"], ["timeline", "03", "TIMELINE", "timeline.html"], ["archive", "04", "ARCHIVE", "archive.html"]];
  const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (char) => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"}[char]));

  function renderChrome() {
    const header = document.querySelector("[data-site-header]");
    const footer = document.querySelector("[data-site-footer]");
    if (header) {
      header.innerHTML = `<header class="site-header"><a class="brand" href="index.html" aria-label="kiyo米·Archive 首页"><span class="brand-dot blue"></span><span>${escapeHtml(data.site.title)}</span><span class="brand-dot green"></span></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span class="menu-icon" aria-hidden="true"><span></span><span></span><span></span></span><b class="menu-label">MENU</b><b class="sr-only">打开导航</b></button><nav id="site-nav" class="site-nav" aria-label="主导航">${navItems.map(([id, index, label, href]) => `<a href="${href}"${currentPage === id ? ' aria-current="page"' : ""}><span class="nav-index">${index}</span><span class="nav-label">${label}</span></a>`).join("")}</nav></header>`;
      const toggle = header.querySelector(".menu-toggle");
      const nav = header.querySelector(".site-nav");
      const setMenuState = (open) => { toggle.setAttribute("aria-expanded", String(open)); toggle.querySelector(".sr-only").textContent = open ? "关闭导航" : "打开导航"; nav.classList.toggle("open", open); document.body.classList.toggle("menu-open", open); };
      toggle.addEventListener("click", () => setMenuState(toggle.getAttribute("aria-expanded") !== "true"));
      nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenuState(false)));
      document.addEventListener("keydown", (event) => { if (event.key === "Escape") setMenuState(false); });
      document.addEventListener("click", (event) => { if (!nav.classList.contains("open") || toggle.contains(event.target) || nav.contains(event.target)) return; setMenuState(false); });
    }
    if (footer) {
      const email = data.site.contactEmail ? `<a href="mailto:${escapeHtml(data.site.contactEmail)}">${escapeHtml(data.site.contactEmail)}</a>` : "联系邮箱将在发布前补充";
      footer.innerHTML = `<footer class="site-footer"><p class="footer-brand">${escapeHtml(data.site.title)}</p><p>素材版权归原作者或权利人所有；如有侵权，请通过邮箱联系删除。本站整理内容禁止用于商业用途。</p><p>${email}</p><p class="copyright">© ${new Date().getFullYear()} kiyo米·Archive</p></footer>`;
    }
  }

  function emptyState(title, text) { return `<div class="empty-state"><span aria-hidden="true"></span><h2>${escapeHtml(title)}</h2><p>${escapeHtml(text)}</p></div>`; }

  function renderPerson() {
    const root = document.querySelector("#person-page"); if (!root) return;
    const person = data.people.find((item) => item.id === document.body.dataset.person); if (!person) return;
    const facts = person.facts.length ? person.facts.map((fact) => `<div><dt>${escapeHtml(fact.label)}</dt><dd>${escapeHtml(fact.value)}</dd></div>`).join("") : `<div class="profile-pending"><dt>基本资料</dt><dd>等待录入已确认的公开资料</dd></div>`;
    const links = person.links.length ? person.links.map((link) => `<li><a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)} <span aria-hidden="true">↗</span></a></li>`).join("") : `<li class="muted">相关链接将在资料整理后显示</li>`;
    const fanPosts = Array.isArray(person.fanPosts) ? person.fanPosts.filter((post) => post && post.url) : [];
    const fanPostSection = fanPosts.length ? `<section class="profile-links fan-posts"><h2>安利帖</h2><p>粉丝整理内容，仅供延伸阅读。</p><ul>${fanPosts.map((post) => `<li><a href="${escapeHtml(post.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(post.label || "查看帖子")} <span aria-hidden="true">↗</span></a></li>`).join("")}</ul></section>` : "";
    root.innerHTML = `<article class="person-layout ${person.color}"><div class="person-image reveal"><img src="${escapeHtml(person.image)}" alt="${escapeHtml(person.name)}" width="900" height="1200"></div><div class="person-copy reveal"><a class="back-link" href="profile.html">← 返回 Profile</a><p class="section-code">PROFILE / ${person.id.toUpperCase()}</p><h1>${escapeHtml(person.name)}</h1><p class="person-intro">${escapeHtml(person.intro)}</p><dl class="facts-list">${facts}</dl><section class="profile-links"><h2>相关链接</h2><ul>${links}</ul></section>${fanPostSection}</div></article>`;
  }

  function timelineAnchor(event, events) {
    const date = event.date || "";
    const sharedDate = Boolean(date) && events.filter((item) => item.date === date).length > 1;
    return sharedDate ? (event.id || date) : (date || event.id);
  }


  function isIsoDate(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(value || "");
  }

  function eventSpan(event) {
    const start = event.date || "";
    const end = event.endDate || "";
    const startLabel = start.replaceAll("-", ".");
    if (!isIsoDate(start) || !isIsoDate(end) || end <= start) return { start, end: "", label: startLabel, markup: "" };
    const endLabel = end.replaceAll("-", ".");
    const sameYear = start.slice(0, 4) === end.slice(0, 4);
    const visibleEnd = sameYear ? endLabel.slice(5) : endLabel;
    const label = startLabel + " \u2014 " + visibleEnd;
    const markup = '<span class="range-start">' + escapeHtml(startLabel) + '</span><span class="range-mark" aria-hidden="true">\u2014</span><span class="range-end">' + escapeHtml(visibleEnd) + "</span>";
    return { start, end, label, markup };
  }

  function eventYears(event) {
    const startYear = (event.date || "").slice(0, 4);
    if (!/^\d{4}$/.test(startYear)) return [];
    const years = [startYear];
    if (!isIsoDate(event.endDate) || event.endDate <= (event.date || "")) return years;
    const endYear = event.endDate.slice(0, 4);
    const from = Number(startYear);
    const to = Number(endYear);
    if (!Number.isFinite(to) || to <= from) return years;
    if (to - from > 20) return [startYear, endYear];
    for (let year = from + 1; year <= to; year += 1) years.push(String(year));
    return years;
  }

  function ensureShotDialog() {
    let dialog = document.querySelector("#shot-dialog");
    if (dialog) return dialog;
    dialog = document.createElement("dialog");
    dialog.id = "shot-dialog";
    dialog.className = "shot-dialog";
    dialog.setAttribute("aria-label", "查看截图");
    dialog.innerHTML = '<div class="shot-stage"><div class="shot-frame"><img alt=""><button class="dialog-close" type="button" aria-label="关闭">×</button></div><a class="shot-source" target="_blank" rel="noopener noreferrer" hidden>查看原博 <span aria-hidden="true">↗</span></a></div>';
    document.body.appendChild(dialog);
    const image = dialog.querySelector("img");
    const link = dialog.querySelector(".shot-source");
    dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => { if (event.target === dialog || event.target === dialog.querySelector(".shot-stage")) dialog.close(); });
    dialog.showShot = (button) => {
      const source = button.dataset.shotSource || "";
      image.src = button.dataset.shotSrc || "";
      image.alt = button.dataset.shotAlt || "互动截图";
      if (/^https?:\/\//i.test(source)) {
        link.href = source;
        link.hidden = false;
      } else {
        link.hidden = true;
        link.removeAttribute("href");
      }
      if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
    };
    return dialog;
  }

  function renderTimeline() {
    const root = document.querySelector("#timeline-list");
    const select = document.querySelector("#year-filter");
    const sortButtons = [...document.querySelectorAll(".timeline-sort [data-order]")];
    if (!root || !select) return;
    const events = [...data.timeline];
    const years = [...new Set(events.flatMap(eventYears))].sort((a, b) => b.localeCompare(a));
    years.forEach((year) => select.insertAdjacentHTML("beforeend", `<option value="${escapeHtml(year)}">${escapeHtml(year)} \u5e74</option>`));
    select.disabled = years.length === 0;
    let order = "desc";
    const draw = () => {
      const year = select.value || "all";
      const items = events
        .filter((event) => year === "all" || eventYears(event).includes(year))
        .sort((a, b) => order === "asc" ? (a.date || "").localeCompare(b.date || "") : (b.date || "").localeCompare(a.date || ""));
      const eventBody = (event) => {
        const rawSources = [].concat(event.sources || event.source || []);
        const sources = rawSources.map((source) => typeof source === "string" ? { label: "\u67e5\u770b\u539f\u59cb\u6765\u6e90", url: source } : source).filter((source) => source && source.url);
        const sourceLinks = sources.length ? `<div class="timeline-sources">${sources.map((source) => `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label || "\u67e5\u770b\u539f\u59cb\u6765\u6e90")} <span aria-hidden="true">\u2197</span></a>`).join("")}</div>` : "";
        const shots = Array.isArray(event.images) ? event.images.filter((image) => image && image.src && !String(image.src).includes("帖子完整链接")) : [];
        const shotStrip = shots.length ? `<div class="timeline-shots">${shots.map((image) => `<button type="button" class="timeline-shot" data-shot-src="${escapeHtml(image.src)}" data-shot-alt="${escapeHtml(image.alt || event.title || "互动截图")}" data-shot-source="${escapeHtml(image.source || "")}"><img src="${escapeHtml(image.thumb || image.src)}" alt="${escapeHtml(image.alt || event.title || "互动截图")}" loading="lazy"></button>`).join("")}</div>` : "";
        return `<h2>${escapeHtml(event.title)}</h2><p>${escapeHtml(event.summary)}</p>${shotStrip}${sourceLinks}`;
      };
      const groups = [];
      const groupAt = new Map();
      items.forEach((event) => {
        const span = eventSpan(event);
        const key = !span.end && event.date ? event.date : "";
        if (key && groupAt.has(key)) groups[groupAt.get(key)].events.push(event);
        else {
          if (key) groupAt.set(key, groups.length);
          groups.push({ date: event.date || "", events: [event] });
        }
      });
      root.innerHTML = groups.length ? groups.map((group) => {
        if (group.events.length === 1) {
          const event = group.events[0];
          const span = eventSpan(event);
          const timeMarkup = span.markup ? `<time class="timeline-range" datetime="${escapeHtml(span.start + "/" + span.end)}">${span.markup}</time>` : `<time datetime="${escapeHtml(event.date)}">${escapeHtml((event.date || "").replaceAll("-", "."))}</time>`;
          return `<article class="timeline-entry reveal" id="${escapeHtml(timelineAnchor(event, data.timeline))}">${timeMarkup}<span class="timeline-node" aria-hidden="true"></span><div>${eventBody(event)}</div></article>`;
        }
        const inner = group.events.map((event) => `<section class="timeline-event" id="${escapeHtml(timelineAnchor(event, data.timeline))}">${eventBody(event)}</section>`).join("");
        return `<article class="timeline-entry timeline-shared reveal"><time datetime="${escapeHtml(group.date)}">${escapeHtml(group.date.replaceAll("-", "."))}</time><span class="timeline-node" aria-hidden="true"></span><div class="timeline-day-events">${inner}</div></article>`;
      }).join("") : emptyState("\u65f6\u95f4\u7ebf\u6b63\u5728\u6574\u7406", order === "asc" ? "\u771f\u5b9e\u4e8b\u4ef6\u53ca\u539f\u59cb\u6765\u6e90\u6574\u7406\u5b8c\u6210\u540e\uff0c\u5c06\u6309\u65f6\u95f4\u6b63\u5e8f\u51fa\u73b0\u5728\u8fd9\u91cc\u3002" : "\u771f\u5b9e\u4e8b\u4ef6\u53ca\u539f\u59cb\u6765\u6e90\u6574\u7406\u5b8c\u6210\u540e\uff0c\u5c06\u6309\u65f6\u95f4\u5012\u5e8f\u51fa\u73b0\u5728\u8fd9\u91cc\u3002");
      observeReveals();
    };
    select.addEventListener("change", draw);
    if (!root.dataset.shotsBound) {
      root.dataset.shotsBound = "true";
      const dialog = ensureShotDialog();
      root.addEventListener("click", (event) => {
        const button = event.target.closest(".timeline-shot");
        if (!button || !root.contains(button)) return;
        dialog.showShot(button);
      });
    }
    sortButtons.forEach((button) => {
      button.addEventListener("click", () => {
        order = button.dataset.order === "asc" ? "asc" : "desc";
        sortButtons.forEach((item) => {
          const active = item === button;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        draw();
      });
    });
    draw();
  }

  function renderTimelinePosts() {
    const section = document.querySelector("#timeline-posts");
    const list = document.querySelector("#timeline-posts-list");
    if (!section || !list) return;
    const posts = Array.isArray(data.timelinePosts) ? data.timelinePosts.filter((post) => post && post.title && post.url) : [];
    if (!posts.length) return;
    posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    list.innerHTML = posts.map((post) => `<li><a href="${escapeHtml(post.url)}" target="_blank" rel="noopener noreferrer"><span class="timeline-post-meta">${post.platform ? `<span>${escapeHtml(post.platform)}</span>` : ""}${post.date ? `<time datetime="${escapeHtml(post.date)}">${escapeHtml(post.date.replaceAll("-", "."))}</time>` : ""}</span><span class="timeline-post-title">${escapeHtml(post.title)}</span><span class="timeline-post-arrow" aria-hidden="true">↗</span></a></li>`).join("");
    section.hidden = false;
  }

  function renderMoments() {
    const root = document.querySelector("#moments-grid"); if (!root) return;
    const items = [...data.moments].sort((a, b) => b.date.localeCompare(a.date));
    if (!items.length) { root.innerHTML = emptyState("瞬间正在挑选", "照片、GIF 与短片完成筛选后，将以轻量缩略图陈列在这里。"); return; }
    root.innerHTML = items.map((item, index) => { const action = item.type === "video" ? `href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer"` : `href="${escapeHtml(item.media)}" data-full="${escapeHtml(item.media)}" data-caption="${escapeHtml(item.text)}"`; return `<article class="moment-card reveal" id="${escapeHtml(item.id)}"><a class="moment-media" ${action}><img src="${escapeHtml(item.thumbnail)}" alt="${escapeHtml(item.text)}" loading="lazy" width="720" height="900"><span>${item.type === "video" ? "观看短片 ↗" : "查看完整图片"}</span></a><div class="moment-meta"><time datetime="${escapeHtml(item.date)}">${escapeHtml(item.date.replaceAll("-", "."))}</time><p>${escapeHtml(item.text)}</p><small>${String(index + 1).padStart(2, "0")}</small></div></article>`; }).join("");
    const dialog = document.querySelector("#media-dialog"); const dialogMedia = dialog.querySelector(".dialog-media"); const dialogCaption = dialog.querySelector(".dialog-caption");
    root.querySelectorAll("[data-full]").forEach((link) => link.addEventListener("click", (event) => { event.preventDefault(); dialogMedia.innerHTML = `<img src="${escapeHtml(link.dataset.full)}" alt="${escapeHtml(link.dataset.caption)}">`; dialogCaption.textContent = link.dataset.caption; dialog.showModal(); }));
    dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close()); dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  }

  function renderArchive() {
    const statsRoot = document.querySelector("#archive-stats"); const directoryRoot = document.querySelector("#archive-directory"); if (!statsRoot || !directoryRoot) return;
    const years = data.timeline.flatMap(eventYears); const yearSpan = years.length ? `${Math.min(...years.map(Number))}—${Math.max(...years.map(Number))}` : "待录入";
    const stats = [[data.timeline.length, "EVENTS"], [yearSpan, "YEARS"]]; statsRoot.innerHTML = stats.map(([value, label], index) => `<div class="stat reveal"><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(value)}</strong><p>${label}</p></div>`).join("");
    const peopleLinks = data.people.map((person) => `<li><a href="${person.id}.html"><span>${escapeHtml(person.name)}</span><small>查看个人档案 →</small></a></li>`).join("");
    const sortedTimeline = [...data.timeline].sort((a, b) => (b.date || "").localeCompare(a.date || "")); const recentTimeline = sortedTimeline.slice(0, 3); const timelineLinks = recentTimeline.length ? recentTimeline.map((event) => `<li><a href="timeline.html#${escapeHtml(timelineAnchor(event, data.timeline))}"><span>${escapeHtml(event.title)}</span><small${eventSpan(event).end ? ' class="is-range"' : ""}>${escapeHtml(eventSpan(event).label || event.date)} →</small></a></li>`).join("") : `<li class="directory-empty">真实事件整理后自动生成目录</li>`; const timelineMore = sortedTimeline.length > recentTimeline.length ? `<li class="directory-more"><a href="timeline.html"><span>更多</span><small>查看全部 →</small></a></li>` : "";
    const timelinePostLink = Array.isArray(data.timelinePosts) && data.timelinePosts.some((post) => post && post.title && post.url) ? `<li><a href="timeline.html#timeline-posts"><span>延伸阅读</span><small>豆瓣 / 微博 →</small></a></li>` : "";
    directoryRoot.innerHTML = `<section><h3>PROFILE</h3><ol>${peopleLinks}${timelinePostLink}</ol></section><section><h3>TIMELINE</h3><ol>${timelineLinks}${timelineMore}</ol></section>`;
  }

  function observeReveals() {
    const items = document.querySelectorAll(".reveal:not(.is-visible)"); if (!("IntersectionObserver" in window)) { items.forEach((item) => item.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.12 }); items.forEach((item) => observer.observe(item));
  }

  renderChrome(); renderPerson(); renderTimeline(); renderTimelinePosts(); renderMoments(); renderArchive(); observeReveals();
})();
