/*
 * 网站内容集中在这个文件中维护。
 * Timeline 正式条目必须填写 date、title、summary、source。
 * Moment 图片条目填写 type: "image"；视频条目填写 type: "video" 和外部 link。
 */
window.SITE_DATA = {
  site: {
    title: "kiyo米·Archive",
    tagline: "你在身边，在你身边。",
    contactEmail: ""
  },
  people: [
    {
      id: "qkm",
      name: "覃柯蒙",
      color: "blue",
      image: "images/qkm.jpg",
      intro: "个人简介将在资料整理后补充。",
      facts: [],
      links: []
    },
    {
      id: "gcm",
      name: "龚晨美",
      color: "green",
      image: "images/gcm.jpg",
      intro: "个人简介将在资料整理后补充。",
      facts: [],
      links: []
    }
  ],
  timeline: [
    // 示例结构（整理好真实资料后取消注释并替换）：
    // { id: "event-2026-01", date: "2026-01-01", title: "事件标题", summary: "事件简述", source: "https://..." }
  ],
  moments: [
    // 图片：{ id: "moment-01", type: "image", date: "2026-01-01", text: "一句文案", thumbnail: "images/thumb.webp", media: "images/original.jpg" }
    // 视频：{ id: "moment-02", type: "video", date: "2026-01-01", text: "一句文案", thumbnail: "images/thumb.webp", link: "https://..." }
  ]
};
