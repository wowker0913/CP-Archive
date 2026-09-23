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
        
      ],
      fanPosts: [ 
        { label: "豆瓣｜安利帖1", url: "https://www.douban.com/doubanapp/dispatch?uri=%2Fgroup%2Ftopic%2F495490321%3F_spm_id%3DMjkwMjU2Njkw&_i=8995519282dc228" },
        { label: "豆瓣｜安利帖2", url: "https://www.douban.com/doubanapp/dispatch?uri=%2Fgroup%2Ftopic%2F494340649%3F_spm_id%3DMjcxODQ0MTUy&_i=9016980582dc228" },
        { label: "微博｜图文整理标题", url: "https://帖子完整链接" }]
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
        { label: "抖音", url: "https://v.douyin.com/DXHeN_O5HAE/ "}],
      fanPosts: [
        { label: "豆瓣｜安利帖1", url: "https://www.douban.com/doubanapp/dispatch?uri=%2Fgroup%2Ftopic%2F496146918%3F_spm_id%3DMjc0NjQ3MDg2&_i=8995541482dc228" },
        { label: "微博｜图文整理标题", url: "https://帖子完整链接" }]
    }
  ],
  timeline: [
    // 示例结构（整理好真实资料后取消注释并替换）：//{ id:"event--", date:"", title:"", summary:"", source:""},
    { id:"event-2025-03", date:"2025-03-29", title:"头号新闻出道",summary:"mc提及",sources:
      [
        {label: "提及1",url: "https://weibo.com/8012533864/5345400670126837"},{label: "提及2",url: "https://weibo.com/8012533864/5345401667584501"}
      ] },
    { id: "event-2026-07", date: "2026-07-18", title: "龚晨美生日公演", summary: "大mc+舞台+念信", source: "https://www.bilibili.com/video/BV12iKN6yEZv/?spm_id_from=333.337.search-card.all.click&vd_source=19d238feaafcdbe60c35dbed23f125b4" },
    { id:"event-2026-09", date: "2026-09-11", title: "260911赫兹2.0", summary:"你在身边在你身边",source:"https://www.bilibili.com/video/BV1qYYU6DEwH?t=715.1"},
    { id: "event-2026-09", date: "2026-09-13", title: "联合生公", summary: "辛德瑞拉+念信", sources: 
      [{label:"舞台",url:"https://www.bilibili.com/video/BV1JTYB6ZE2F/?share_source=copy_web&vd_source=641ec61c34a5a985cbfcf46d6d63708b"},{label:"念信", url: "https://www.bilibili.com/video/BV1zuYB64Epz/?share_source=copy_web&vd_source=641ec61c34a5a985cbfcf46d6d63708b"}]},
    { id: "event-2026-09", date: "2026-09-17", title: "260917赫兹2.0", summary: "否定句", source: "https://www.bilibili.com/video/BV1Ebe36QEyq?t=369.3&p=3"},
    { id:"event-2025-07", date:"2025-07-05", title:"龚晨美直播", summary:"希望你以后被很多很多幸运包围", source:"https://www.bilibili.com/video/BV1ffb76oECY?t=0.0"},
    { id:"event-2025-07", date:"2025-07-11", title:"覃柯蒙生日直播", summary:"kiyo米生日直播cut", source:"https://www.bilibili.com/video/BV1Bubp6iEWR?t=0.0"},
    { id:"event-2025-07", date:"2025-07-07", title:"覃柯蒙直播", summary:"提前一起过生日", source:"https://www.bilibili.com/video/BV1i5bp6AEFP?t=0.0"},
    { id:"event-2025-04", date:"2025-04-08", title:"口袋直播", summary:"第一次连麦", source:"https://www.bilibili.com/video/BV1d5bp6AEih?t=0.0"},
    { id:"event-2025-05", date:"2025-05-13", title:"覃柯蒙直播", summary:"外出拍照", source:"https://www.bilibili.com/video/BV1zNbp6uE15?t=0.0"},
    { id:"event-2025-05", date:"2025-05-30", title:"口袋直播", summary:"双人连麦", source:"https://www.bilibili.com/video/BV1FNbp6gErV?t=0.0"},
    { id:"event-2025-05", date:"2025-05-10", title:"龚晨美直播", summary:"换乘直播", source:"https://www.bilibili.com/video/BV1ZtbH6eErH?t=0.0"},
    
    
    
  ],
  timelinePosts: [ {
    platform: "豆瓣",
    title: "提前嗑一下小木筏未来新晋队内cp 龚晨美×覃柯蒙",
    date: "2025-05-31",
    url: "https://www.douban.com/doubanapp/dispatch?uri=%2Fgroup%2Ftopic%2F327384712%3F_spm_id%3DMjAwNTU4NzI0&_i=9017157682dc228"
  },
  {
    platform: "豆瓣",
    title: "kiyo米——八百倍速走完别的cp一生(已复婚ing) ",
    date: "2025-10-31",
    url: "https://www.douban.com/doubanapp/dispatch?uri=%2Fgroup%2Ftopic%2F341239030%3F_spm_id%3DMjc2NjAwMDY5&_i=9017156082dc228"
  },
 ],
  moments: [
    // 图片：{ id: "moment-01", type: "image", date: "2026-01-01", text: "一句文案", thumbnail: "images/thumb.webp", media: "images/original.jpg" }
    // 视频：{ id: "moment-02", type: "video", date: "2026-01-01", text: "一句文案", thumbnail: "images/thumb.webp", link: "https://..." }
  ]
};
