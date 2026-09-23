(function () {
  "use strict";
  const data = window.SITE_DATA;
  if (!data) return;
  const currentPage = document.body.dataset.page;
  const navItems = [["home", "HOME", "index.html"], ["profile", "PROFILE", "profile.html"], ["timeline", "TIMELINE", "timeline.html"], ["moments", "MOMENTS", "moments.html"], ["archive", "ARCHIVE", "archive.html"]];
  const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (char) => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"}[char]));

  function renderChrome() {
    const header = document.querySelector("[data-site-header]");
    const footer = document.querySelector("[data-site-footer]");
    if (header) {
      header.innerHTML = `<header class="site-header"><a class="brand" href="index.html" aria-label="kiyo米·Archive 首页"><span class="brand-dot blue"></span><span>${escapeHtml(data.site.title)}</span><span class="brand-dot green"></span></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span class="menu-icon" aria-hidden="true"><span></span><span></span><span></span></span><b class="menu-label">MENU</b><b class="sr-only">打开导航</b></button><nav id="site-nav" class="site-nav" aria-label="主导航">${navItems.map(([id, label, href]) => `<a href="${href}"${currentPage === id ? ' aria-current="page"' : ""}>${label}</a>`).join("")}</nav></header>`;
      const toggle = header.querySelector(".menu-toggle");
      const nav = header.querySelector(".site-nav");
      const setMenuState = (open) => { toggle.setAttribute("aria-expanded", String(open)); toggle.querySelector(".sr-only").textContent = open ? "关闭导航" : "打开导航"; nav.classList.toggle("open", open); document.body.classList.toggle("menu-open", open); };
      toggle.addEventListener("click", () => setMenuState(toggle.getAttribute("aria-expanded") !== "true"));
      nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenuState(false)));
      document.addEventListener("keydown", (event) => { if (event.key === "Escape") setMenuState(false); });
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
    root.innerHTML = `<article class="person-layout ${person.color}"><div class="person-image reveal"><img src="${escapeHtml(person.image)}" alt="${escapeHtml(person.name)}" width="900" height="1200"></div><div class="person-copy reveal"><a class="back-link" href="profile.html">← 返回 Profile</a><p class="section-code">PROFILE / ${person.id.toUpperCase()}</p><h1>${escapeHtml(person.name)}</h1><p class="person-intro">${escapeHtml(person.intro)}</p><dl class="facts-list">${facts}</dl><section class="profile-links"><h2>相关链接</h2><ul>${links}</ul></section></div></article>`;
  }

  function renderTimeline() {
    const root = document.querySelector("#timeline-list"); const select = document.querySelector("#year-filter"); if (!root || !select) return;
    const sorted = [...data.timeline].sort((a, b) => b.date.localeCompare(a.date)); const years = [...new Set(sorted.map((event) => event.date.slice(0, 4)))];
    years.forEach((year) => select.insertAdjacentHTML("beforeend", `<option value="${escapeHtml(year)}">${escapeHtml(year)} 年</option>`)); select.disabled = years.length === 0;
    const draw = (year = "all") => { const items = year === "all" ? sorted : sorted.filter((event) => event.date.startsWith(year)); root.innerHTML = items.length ? items.map((event) => { const rawSources = Array.isArray(event.sources) ? event.sources : (event.source ? [event.source] : []); const sources = rawSources.map((source) => typeof source === "string" ? { label: "查看原始来源", url: source } : source).filter((source) => source && source.url); const sourceLinks = sources.length ? `<div class="timeline-sources">${sources.map((source) => `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label || "查看原始来源")} <span aria-hidden="true">↗</span></a>`).join("")}</div>` : ""; return `<article class="timeline-entry reveal" id="${escapeHtml(event.id)}"><time datetime="${escapeHtml(event.date)}">${escapeHtml(event.date.replaceAll("-", "."))}</time><span class="timeline-node" aria-hidden="true"></span><div><h2>${escapeHtml(event.title)}</h2><p>${escapeHtml(event.summary)}</p>${sourceLinks}</div></article>`; }).join("") : emptyState("时间线正在整理", "真实事件及原始来源整理完成后，将按时间倒序出现在这里。"); observeReveals(); };
    select.addEventListener("change", () => draw(select.value)); draw();
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
    const years = data.timeline.map((event) => event.date.slice(0, 4)).filter(Boolean); const yearSpan = years.length ? `${Math.min(...years.map(Number))}—${Math.max(...years.map(Number))}` : "待录入"; const videoCount = data.moments.filter((item) => item.type === "video").length;
    const stats = [[data.timeline.length, "EVENTS"], [data.moments.length, "MOMENTS"], [videoCount, "VIDEOS"], [yearSpan, "YEARS"]]; statsRoot.innerHTML = stats.map(([value, label], index) => `<div class="stat reveal"><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(value)}</strong><p>${label}</p></div>`).join("");
    const peopleLinks = data.people.map((person) => `<li><a href="${person.id}.html"><span>${escapeHtml(person.name)}</span><small>查看个人档案 →</small></a></li>`).join("");
    const timelineLinks = data.timeline.length ? [...data.timeline].sort((a,b) => b.date.localeCompare(a.date)).map((event) => `<li><a href="timeline.html#${escapeHtml(event.id)}"><span>${escapeHtml(event.title)}</span><small>${escapeHtml(event.date)} →</small></a></li>`).join("") : `<li class="directory-empty">真实事件整理后自动生成目录</li>`;
    const momentLinks = data.moments.length ? [...data.moments].sort((a,b) => b.date.localeCompare(a.date)).map((item) => `<li><a href="moments.html#${escapeHtml(item.id)}"><span>${escapeHtml(item.text)}</span><small>${escapeHtml(item.date)} →</small></a></li>`).join("") : `<li class="directory-empty">精选瞬间整理后自动生成目录</li>`;
    directoryRoot.innerHTML = `<section><h3>PROFILE</h3><ol>${peopleLinks}</ol></section><section><h3>TIMELINE</h3><ol>${timelineLinks}</ol></section><section><h3>MOMENTS</h3><ol>${momentLinks}</ol></section>`;
  }

  function observeReveals() {
    const items = document.querySelectorAll(".reveal:not(.is-visible)"); if (!("IntersectionObserver" in window)) { items.forEach((item) => item.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.12 }); items.forEach((item) => observer.observe(item));
  }

  renderChrome(); renderPerson(); renderTimeline(); renderMoments(); renderArchive(); observeReveals();
})();
