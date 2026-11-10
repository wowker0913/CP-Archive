(function () {
  "use strict";
  const key = "cp-archive-theme";
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const query = new URLSearchParams(location.search).get("theme");
  let saved = null;
  try { saved = localStorage.getItem(key); } catch (_) {}
  let choice = ["dark", "light"].includes(query) ? query : (["dark", "light"].includes(saved) ? saved : null);
  function apply() {
    const theme = choice || (media.matches ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll(".theme-toggle").forEach((button) => {
      button.setAttribute("aria-label", theme === "dark" ? "切换到浅色模式" : "切换到深色模式");
      button.title = theme === "dark" ? "切换到浅色模式" : "切换到深色模式";
      button.querySelector(".theme-label").textContent = theme === "dark" ? "浅色" : "深色";
    });
  }
  window.archiveTheme = {
    apply,
    toggle() {
      choice = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      try { localStorage.setItem(key, choice); } catch (_) {}
      apply();
      try {
        const url = new URL(location.href);
        if (url.searchParams.has("theme")) {
          url.searchParams.delete("theme");
          history.replaceState(history.state, "", url.pathname + url.search + url.hash);
        }
      } catch (_) { /* 部分内置浏览器不允许修改历史记录；本页切换仍然生效。 */ }
    }
  };
  apply();
  const onSystemThemeChange = () => { if (!choice) apply(); };
  if (typeof media.addEventListener === "function") media.addEventListener("change", onSystemThemeChange);
  else if (typeof media.addListener === "function") media.addListener(onSystemThemeChange);
})();
