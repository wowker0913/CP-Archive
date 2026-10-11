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
  if (currentPage === "timeline") {
    const redirectOldReading = () => { if (location.hash === "#timeline-posts") location.replace("fanworks.html#reading"); };
    if (location.hash === "#timeline-posts") { redirectOldReading(); return; }
    window.addEventListener("hashchange", redirectOldReading);
  }
  const navItems = [
    ["home", "01", "HOME", "index.html"],
    ["profile", "02", "PROFILE", "profile.html"],
    ["timeline", "03", "TIMELINE", "timeline.html"],
    ["fanworks", "04", "FANWORKS", "fanworks.html"],
    // 暂时隐藏 Moments；恢复时取消此行及下方 Archive 目录入口的注释。
    // ["moments", "05", "MOMENTS", "moments.html"],
    ["archive", "05", "ARCHIVE", "archive.html"]
  ];
  const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (char) => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"}[char]));

  function renderChrome() {
    const header = document.querySelector("[data-site-header]");
    const footer = document.querySelector("[data-site-footer]");
    if (header) {
      header.innerHTML = `<header class="site-header"><a class="brand" href="index.html" aria-label="kiyo米·Archive 首页"><span class="brand-dot blue"></span><span>${escapeHtml(data.site.title)}</span><span class="brand-dot green"></span></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span class="menu-icon" aria-hidden="true"><span></span><span></span><span></span></span><b class="menu-label">MENU</b><b class="sr-only">打开导航</b></button><nav id="site-nav" class="site-nav" aria-label="主导航">${navItems.map(([id, index, label, href]) => `<a href="${href}"${currentPage === id ? ' aria-current="page"' : ""}><span class="nav-index">${index}</span><span class="nav-label">${label}</span></a>`).join("")}</nav></header>`;
      const toggle = header.querySelector(".menu-toggle");
      const nav = header.querySelector(".site-nav");
      const setMenuState = (open) => { toggle.setAttribute("aria-expanded", String(open)); toggle.querySelector(".sr-only").textContent = open ? "关闭导航" : "打开导航"; nav.classList.toggle("open", open); document.body.classList.toggle("menu-open", open); };
      toggle.addEventListener("click", () => {
        const open = toggle.getAttribute("aria-expanded") !== "true";
        setMenuState(open);
      });
      nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenuState(false)));
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && nav.classList.contains("open")) {
          setMenuState(false);
          toggle.focus();
        }
      });
      document.addEventListener("click", (event) => { if (!nav.classList.contains("open") || toggle.contains(event.target) || nav.contains(event.target)) return; setMenuState(false); });
      window.matchMedia("(min-width: 901px)").addEventListener("change", (event) => {
        if (!event.matches) return;
        const focusWasInMenu = nav.contains(document.activeElement) || document.activeElement === toggle;
        setMenuState(false);
        if (focusWasInMenu) header.querySelector(".brand")?.focus();
      });
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

  function renderFanWorks() {
    const root = document.querySelector("#fanworks-list");
    if (!root) return;
    const filtersRoot = document.querySelector("#reading");
    const typeRoot = document.querySelector("#fanworks-types");
    const countRoot = document.querySelector("#fanworks-count");
    const emptyRoot = document.querySelector("#fanworks-empty");
    const works = Array.isArray(data.fanWorks) ? data.fanWorks.filter((work) => work && work.id && work.title && /^https?:\/\//i.test(work.url || "")) : [];
    const types = ["同人文", "同人图", "剪辑", "延伸阅读", "未分类"];
    const items = works.map((work) => ({ ...work, category: types.includes(work.type) ? work.type : "未分类" })).sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    let selectedType = location.hash === "#reading" ? "延伸阅读" : "__all__";
    typeRoot.innerHTML = [["__all__", "全部"], ...types.map((type) => [type, type])].map(([value, label]) => `<button type="button" data-value="${escapeHtml(value)}" aria-controls="fanworks-list" aria-pressed="false">${escapeHtml(label)}</button>`).join("");
    const draw = () => {
      const visibleItems = items.filter((item) => selectedType === "__all__" || item.category === selectedType);
      typeRoot.querySelectorAll("button[data-value]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.value === selectedType)));
      countRoot.textContent = `显示 ${visibleItems.length} 条内容`;
      root.hidden = !visibleItems.length;
      emptyRoot.hidden = !!visibleItems.length;
      if (visibleItems.length) {
        root.innerHTML = `<ol>${visibleItems.map((item) => {
          const details = [item.category, item.creator ? `作者：${item.creator}` : "", item.platform, item.date].filter(Boolean);
          return `<li${item.id ? ` id="${escapeHtml(item.id)}"` : ""}><a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer"><span class="fanwork-copy"><span class="fanwork-title">${escapeHtml(item.title)}</span><small>${details.map(escapeHtml).join(" · ")}</small></span><span class="fanwork-arrow" aria-hidden="true">↗</span></a></li>`;
        }).join("")}</ol>`;
      } else {
        root.replaceChildren();
        emptyRoot.innerHTML = selectedType === "__all__" ? emptyState("内容正在整理", "粉丝创作与延伸阅读整理好后，会从这里前往原作。") : emptyState("这个分类暂时没有内容", "可以选择其他分类，或查看全部内容。");
      }
    };
    typeRoot.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-value]");
      if (!button) return;
      selectedType = button.dataset.value;
      if (selectedType === "延伸阅读") history.replaceState(history.state, "", `${location.pathname}${location.search}#reading`);
      else if (location.hash === "#reading") history.replaceState(history.state, "", `${location.pathname}${location.search}`);
      draw();
      button.focus({ preventScroll: true });
    });
    const revealReading = () => requestAnimationFrame(() => {
      if (location.hash === "#reading") filtersRoot.scrollIntoView({ behavior: "instant" });
    });
    window.addEventListener("hashchange", () => {
      selectedType = location.hash === "#reading" ? "延伸阅读" : "__all__";
      draw();
      if (location.hash === "#reading") revealReading();
    });
    draw();
    if (location.hash === "#reading") {
      if (document.readyState === "complete") revealReading();
      else window.addEventListener("load", revealReading, { once: true });
    }
  }

  function renderArchive() {
    const statsRoot = document.querySelector("#archive-stats"); const directoryRoot = document.querySelector("#archive-directory"); if (!statsRoot || !directoryRoot) return;
    const years = data.timeline.flatMap(eventYears); const yearSpan = years.length ? `${Math.min(...years.map(Number))}—${Math.max(...years.map(Number))}` : "待录入";
    const stats = [[data.timeline.length, "EVENTS"], [yearSpan, "YEARS"]]; statsRoot.innerHTML = stats.map(([value, label], index) => `<div class="stat reveal"><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(value)}</strong><p>${label}</p></div>`).join("");
    const peopleLinks = data.people.map((person) => `<li><a href="${person.id}.html"><span>${escapeHtml(person.name)}</span><small>查看个人档案 →</small></a></li>`).join("");
    const sortedTimeline = [...data.timeline].sort((a, b) => (b.date || "").localeCompare(a.date || "")); const recentTimeline = sortedTimeline.slice(0, 3); const timelineLinks = recentTimeline.length ? recentTimeline.map((event) => `<li><a href="timeline.html#${escapeHtml(timelineAnchor(event, data.timeline))}"><span>${escapeHtml(event.title)}</span><small${eventSpan(event).end ? ' class="is-range"' : ""}>${escapeHtml(eventSpan(event).label || event.date)} →</small></a></li>`).join("") : `<li class="directory-empty">真实事件整理后自动生成目录</li>`; const timelineMore = sortedTimeline.length > recentTimeline.length ? `<li class="directory-more"><a href="timeline.html"><span>更多</span><small>查看全部 →</small></a></li>` : "";
    const readingLink = Array.isArray(data.fanWorks) && data.fanWorks.some((work) => work && work.id && work.type === "延伸阅读" && work.title && /^https?:\/\//i.test(work.url || "")) ? `<li><a href="fanworks.html#reading"><span>延伸阅读</span><small>豆瓣 / 微博 →</small></a></li>` : "";
    directoryRoot.innerHTML = `<section><h3>PROFILE</h3><ol>${peopleLinks}</ol></section><section><h3>TIMELINE</h3><ol>${timelineLinks}${timelineMore}</ol></section><section><h3>FANWORKS</h3><ol><li><a href="fanworks.html"><span>同人二创</span><small>查看栏目 →</small></a></li>${readingLink}</ol></section><!-- 暂时隐藏 Moments
    <section><h3>MOMENTS</h3><ol><li><a href="moments.html"><span>被留下的瞬间</span><small>查看栏目 →</small></a></li></ol></section>
    -->`;
  }

  function observeReveals() {
    const items = document.querySelectorAll(".reveal:not(.is-visible)"); if (!("IntersectionObserver" in window)) { items.forEach((item) => item.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.12 }); items.forEach((item) => observer.observe(item));
  }

  renderChrome(); renderPerson(); renderTimeline(); renderFanWorks(); renderArchive(); observeReveals();
})();
