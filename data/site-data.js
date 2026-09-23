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
      intro: "2026.7.12 山西人 SNH48teamHII",
      facts: [ 
        { label: "昵称", value: "Yuki 覃妤千 可萌" },
        { label: "应援色", value: "蓝色" },
      ],
      links: [  
        { label: "微博大号", url: "https://weibo.com/u/8015074819" },
        { label: "微博小号", url: "https://weibo.com/u/5915317653" },
        { label: "小红书", url: " https://xhslink.cn/o/7Wmlo8OYqMh"},
        { label: "抖音", url: " https://v.douyin.com/eaj9cMY1NH8/ "}
        
      ]
    },
    {
      id: "gcm",
      name: "龚晨美",
      color: "green",
      image: "images/gcm.jpg",
      intro: "2004.10.19 江西人 SNH48teamHII",
      facts: [
        { label: "昵称", value: "米米、美美、老龚" },
        { label: "应援色", value: "溪绿色" },
      ],
      links: [
        { label: "微博大号", url: "https://weibo.com/u/8011162323" },
        { label: "微博小号", url: "https://weibo.com/u/7596287858" },
        { label: "抖音", url: "https://v.douyin.com/DXHeN_O5HAE/ "}]
    }
  ],
  timeline: [
    // 示例结构（整理好真实资料后取消注释并替换）：
    { id:"event-2025-03",date:"2025-03-29",title:"头号新闻出道",summary:"mc提及",source:"https://weibo.com/8012533864/5345400670126837" },
    { id: "event-2026-07", date: "2026-07-18", title: "龚晨美生日公演", summary: "大mc+舞台+念信", source: "https://www.bilibili.com/video/BV12iKN6yEZv/?spm_id_from=333.337.search-card.all.click&vd_source=19d238feaafcdbe60c35dbed23f125b4" },
    { id :"event-2026-09", date: "2026-09-11", title: "260911赫兹2.0", summary:"你在身边在你身边",source:"https://www.bilibili.com/video/BV1qYYU6DEwH?t=715.1"},
    { id: "event-2026-09", date: "2026-09-13", title: "联合生公舞台", summary: "辛德瑞拉舞台", source: "https://www.bilibili.com/video/BV1JTYB6ZE2F/?share_source=copy_web&vd_source=641ec61c34a5a985cbfcf46d6d63708b"},
    { id: "event-2026-09", date: "2026-09-13", title: "联合生公mc", summary: "念信", source: "https://www.bilibili.com/video/BV1zuYB64Epz/?share_source=copy_web&vd_source=641ec61c34a5a985cbfcf46d6d63708b" },
    { id: "event-2026-09", date: "2026-09-17", title: "260917赫兹2.0", summary: "否定句", source: "https://www.bilibili.com/video/BV1Ebe36QEyq?t=369.3&p=3"},
    
  ],
  moments: [
    // 图片：{ id: "moment-01", type: "image", date: "2026-01-01", text: "一句文案", thumbnail: "images/thumb.webp", media: "images/original.jpg" }
    // 视频：{ id: "moment-02", type: "video", date: "2026-01-01", text: "一句文案", thumbnail: "images/thumb.webp", link: "https://..." }
  ]
};
