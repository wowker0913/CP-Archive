/*
 * 网站内容集中在这个文件中维护。
 * Timeline 正式条目必须填写 date、title、summary、source。
 * 单日只填 date。多日汇总再加 endDate，date 是第一天，endDate 是最后一天。
 * Moment 图片条目填写 type: "image"；视频条目填写 type: "video" 和外部 link。
 * 口袋、房间、互动、互评只放截图，不摘抄两人原文。
 * 有链接的事件写在 timelineLinks；带截图的事件写在 timelineImages。两段都按日期从早到晚。
 * 口袋图片放 images/timeline/kd/，微博和抖音图片放 images/timeline/wb-dy/。
 * images: [{ src: "images/timeline/kd/文件名.jpg", alt: "截图说明", source: "https://原博链接" }]
 */
window.SITE_DATA = {
  site: {
    title: "kiyo米·Archive",
    tagline: "你在身边，在你身边。",
    contactEmail: "smmn608166@diannao147.com"
  },
  people: [
    {
      id: "qkm",
      name: "覃柯蒙",
      color: "blue",
      image: "images/qkm.jpg",
      intro: "2002.7.12 山西人 SNH48teamHII",
      facts: [ 
        { label: "昵称", value: "Yuki、覃妤千、可萌" },
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
        { label: "微博｜个人安利贴", url: "https://weibo.com/7820825360/5333428364904171" }]
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
        { label: "豆瓣｜安利帖2", url: "https://www.douban.com/group/topic/500007944/?_spm_id=Mjg3ODM2NjIw&_i=02252369MFMgZ3" },
        //{ label: "微博｜图文整理标题", url: "https://帖子完整链接" }
        ]
    }
  ],
  // 有链接、没有截图的事件。按日期从早到晚排列。
  timelineLinks: [
    {
      id: "event-2025-03",
      date: "2025-03-19",
      title: "官博报道",
      summary: "二十二期预备生 龚晨美&覃柯蒙（覃妤千）打卡报道",
      source: "https://weibo.com/2689280541/PjfJLjpcR"
    },
    {
      id: "event-2025-03",
      date: "2025-03-29",
      title: "头号新闻出道",
      summary: "mc提及",
      sources: [
        { label: "提及1", url: "https://weibo.com/8012533864/5345400670126837" },
        { label: "提及2", url: "https://weibo.com/8012533864/5345401667584501" }
      ]
    },
    {
      id: "event-2025-04",
      date: "2025-04-08",
      title: "口袋直播",
      summary: "第一次连麦",
      source: "https://www.bilibili.com/video/BV1d5bp6AEih?t=0.0"
    },
    {
      id: "event-2025-05",
      date: "2025-05-01",
      title: "抖音合拍",
      summary: "共创",
      source: "https://v.douyin.com/W8EoimJl1og/"
    },
    {
      id: "event-2025-05",
      date: "2025-05-05",
      title: "覃柯蒙直播",
      summary: "练舞的两人",
      source: "https://www.bilibili.com/video/BV1wgEgzwErX?t=3858.7&p=3"
    },
    {
      id: "event-2025-05",
      date: "2025-05-10",
      title: "龚晨美直播",
      summary: "换乘直播",
      source: "https://www.bilibili.com/video/BV1ZtbH6eErH?t=0.0"
    },
    {
      id: "event-2025-05",
      date: "2025-05-13",
      title: "覃柯蒙直播",
      summary: "外出拍照",
      source: "https://www.bilibili.com/video/BV1zNbp6uE15?t=0.0"
    },
    {
      id: "event-250530-pocket",
      date: "2025-05-30",
      title: "口袋直播",
      summary: "双人连麦",
      source: "https://www.bilibili.com/video/BV1FNbp6gErV?t=0.0"
    },
    {
      id: "event-250530-news",
      date: "2025-05-30",
      title: "250530头号新闻",
      summary: "夏之回忆",
      source: "https://www.bilibili.com/video/BV1jL7pzpEs6?t=280.9&p=6"
    },
    {
      id: "event-2025-07",
      date: "2025-07-03",
      title: "覃柯蒙直播",
      summary: "口袋甜蜜双播",
      source: "https://www.bilibili.com/video/BV1XybjztEQ6?t=1810.4&p=2"
    },
    {
      id: "event-2025-07",
      date: "2025-07-05",
      title: "龚晨美直播",
      summary: "希望你以后被很多很多幸运包围",
      source: "https://www.bilibili.com/video/BV1ffb76oECY?t=0.0"
    },
    {
      id: "event-2025-07",
      date: "2025-07-07",
      title: "覃柯蒙直播",
      summary: "提前一起过生日",
      source: "https://www.bilibili.com/video/BV1i5bp6AEFP?t=0.0"
    },
    {
      id: "event-2025-07",
      date: "2025-07-11",
      title: "覃柯蒙生日直播",
      summary: "kiyo米生日直播cut",
      source: "https://www.bilibili.com/video/BV1Bubp6iEWR?t=0.0"
    },
    {
      id: "event-2025-07",
      date: "2025-07-22",
      title: "龚晨美直播",
      summary: "生日礼物危机",
      source: "https://www.bilibili.com/video/BV12ZgHzJEFd?t=0.8"
    },
    {
      id: "event-2025-07",
      date: "2025-07-31",
      title: "龚晨美抖音",
      summary: "想我想你",
      source: "https://v.douyin.com/CRYDJo-bNZY/"
    },
    {
      id: "event-2025-08",
      date: "2025-08-16",
      title: "口袋直播",
      summary: "一点都不前凸后翘毫无欲望",
      source: "https://www.bilibili.com/video/BV17WYvz8EGv?t=22.7"
    },
    {
      id: "event-2025-08",
      date: "2025-08-30",
      title: "250830赫兹",
      summary: "故意不小心的",
      source: "https://www.bilibili.com/video/BV18thzzxE4n?t=1102.3&p=4"
    },
    {
      id: "event-2025-09",
      date: "2025-09-11",
      title: "250911头号新闻",
      summary: "找手机",
      source: "https://www.bilibili.com/video/BV1gAHvz9E41?t=133.8&p=4"
    },
    {
      id: "event-2025-09",
      date: "2025-09-25",
      title: "250925头号新闻",
      summary: "只有你懂我",
      source: "https://www.bilibili.com/video/BV15knhzmENT?t=616.6&p=7"
    },
    {
      id: "event-2025-10",
      date: "2025-10-01",
      title: "251001赫兹",
      summary: "闹别扭中",
      source: "https://www.bilibili.com/video/BV1nbHtzXEy3?t=600.1&p=5"
    },
    {
      id: "event-2025-12",
      date: "2025-12-11",
      title: "251211赫兹",
      summary: "站一起了！",
      source: "https://www.bilibili.com/video/BV1nsm3BQERz?t=478.5&p=5"
    },
    {
      id: "event-2026-01",
      date: "2026-01-02",
      title: "260102赫兹",
      summary: "情绪卡牌",
      source: "https://www.bilibili.com/video/BV1BqiFB9E2i?t=62.5&p=5"
    },
    {
      id: "event-2026-01",
      date: "2026-01-24",
      title: "260124赫兹",
      summary: "破冰期大mc盯盯",
      source: "https://www.bilibili.com/video/BV1sDzyBeEya?t=885.9&p=2"
    },
    {
      id: "event-2026-03",
      date: "2026-03-08",
      title: "口袋直播",
      summary: "龚晨美、覃柯蒙 KTV直播双视角",
      source: "https://www.bilibili.com/video/BV1ufPXztErS?t=0.0"
    },
    {
      id: "event-2026-03",
      date: "2026-03-26",
      title: "260326赫兹",
      summary: "大mc+反向猜词",
      sources: [
        { label: "大mc", url: "https://www.bilibili.com/video/BV15kXWB4E3z?t=1017.9&p=2" },
        { label: "反向猜词", url: "https://www.bilibili.com/video/BV15kXWB4E3z?t=777.7&p=5" }
      ]
    },
    {
      id: "event-2026-04",
      date: "2026-04-04",
      title: "260404赫兹",
      summary: "yes or no",
      source: "https://www.bilibili.com/video/BV11RDTBxEho?t=419.4&p=4"
    },
    {
      id: "event-2026-04",
      date: "2026-04-09",
      title: "260409赫兹",
      summary: "复婚后最甜蜜的人/最爱冷战的人",
      source: "https://www.bilibili.com/video/BV1PdDtBjELQ?t=541.1&p=5"
    },
    {
      id: "event-2026-04",
      date: "2026-04-18",
      title: "260418赫兹",
      summary: "动作找茬",
      source: "https://www.bilibili.com/video/BV1zndsB3EPL?t=702.5&p=5"
    },
    {
      id: "event-2026-05",
      date: "2026-05-17",
      title: "热恋专属抖音",
      summary: "共创",
      source: " https://v.douyin.com/o_YcMW5qndk/"
    },
    {
      id: "event-2026-05",
      date: "2026-05-21",
      title: "260521赫兹",
      summary: "给Yuki做大背头",
      source: "https://www.bilibili.com/video/BV1jELh6xEfc?t=718.5&p=2"
    },
    {
      id: "event-2026-06",
      date: "2026-06-04",
      title: "260604赫兹",
      summary: "monster",
      source: "https://www.bilibili.com/video/BV1vjEP6XEoW?t=416.8&p=5"
    },
    {
      id: "event-2026-06",
      date: "2026-06-19",
      title: "260619赫兹",
      summary: "Poison candy",
      source: "https://www.bilibili.com/video/BV1oyjB6yEn6?t=0.0"
    },
    {
      id: "event-2026-07",
      date: "2026-07-18",
      title: "龚晨美生日公演",
      summary: "大mc+舞台+念信",
      source: "https://www.bilibili.com/video/BV12iKN6yEZv/?spm_id_from=333.337.search-card.all.click&vd_source=19d238feaafcdbe60c35dbed23f125b4"
    },
    {
      id: "event-2026-07",
      date: "2026-07-20",
      title: "24/7 • 整蛊之夜",
      summary: "互动cut",
      source: "https://www.bilibili.com/video/BV1J5hj6dEW5?t=0.0"
    },
    {
      id: "event-2026-08",
      date: "2026-08-02",
      title: "覃柯蒙直播",
      summary: "覃柯蒙re康楚翊re kiyo米视频",
      source: "https://www.bilibili.com/video/BV1uM3Z6VEZ9?t=0.0"
    },
    {
      id: "event-2026-08",
      date: "2026-08-09",
      title: "龚晨美直播",
      summary: "我腿好痛我背你",
      source: "https://www.bilibili.com/video/BV1WkuG6vEsn?t=2.3"
    },
    {
      id: "event-2026-08",
      date: "2026-08-20",
      title: "260820赫兹2.0",
      summary: "气球左轮",
      source: "https://www.bilibili.com/video/BV18z8A6MEAw?t=34.5&p=5"
    },
    {
      id: "event-2026-08",
      date: "2026-08-22",
      title: "260822赫兹2.0",
      summary: "谁是卧底",
      source: "https://www.bilibili.com/video/BV1t68264EmS?t=46.7&p=5"
    },
    {
      id: "event-2026-08",
      date: "2026-08-28",
      title: "260828赫兹2.0",
      summary: "她打她自己",
      source: "https://www.bilibili.com/video/BV1dGtN62EHK?t=605.6&p=5"
    },
    {
      id: "event-2026-09",
      date: "2026-09-11",
      title: "260911赫兹2.0",
      summary: "你在身边在你身边",
      source: "https://www.bilibili.com/video/BV1qYYU6DEwH?t=715.1"
    },
    {
      id: "event-2026-09",
      date: "2026-09-13",
      title: "联合生公",
      summary: "辛德瑞拉+念信",
      sources: [
        { label: "舞台", url: "https://www.bilibili.com/video/BV1JTYB6ZE2F/?share_source=copy_web&vd_source=641ec61c34a5a985cbfcf46d6d63708b" },
        { label: "念信", url: "https://www.bilibili.com/video/BV1zuYB64Epz/?share_source=copy_web&vd_source=641ec61c34a5a985cbfcf46d6d63708b" }
      ]
    },
    {
      id: "event-2026-09",
      date: "2026-09-17",
      title: "260917赫兹2.0",
      summary: "大mc+否定句",
      sources: [
        { label: "拖延症", url: "https://www.bilibili.com/video/BV1Ebe36QEyq?t=592.6&p=2" },
        { label: "否定句", url: "https://www.bilibili.com/video/BV1Ebe36QEyq?t=369.3&p=3" }
      ]
    },
    {
      id: "event-2026-09",
      date: "2026-09-24",
      title: "260924赫兹2.0",
      summary: "我猜覃柯蒙",
      source: "https://www.bilibili.com/video/BV1kXaP6NEUv?t=1004.1&p=5"
    }
  ],

  // 带截图的事件，含同时有原博链接的微博／抖音。按日期从早到晚排列。
  // 口袋图片在 images/timeline/kd/，微博和抖音图片在 images/timeline/wb-dy/。
  timelineImages: [
    {
      id: "event-2025-03",
      date: "2025-03-23",
      title: "微博小号互动",
      summary: "晚安",
      source: "https://weibo.com/7596287858/5147179120067389",
      images: [
        { src: "images/timeline/wb-dy/wbxh01.jpg", alt: "微博互动截图" }
      ]
    },
    {
      id: "event-2025-03",
      date: "2025-03-31",
      title: "庆祝出道",
      summary: "龚晨美覃妤千❤",
      source: "https://v.douyin.com/ROYYKTHIkHE/",
      images: [
        { src: "images/timeline/wb-dy/dy01.jpg", alt: "抖音图片" }
      ]
    },
    {
      id: "event-2025-04",
      date: "2025-04-03",
      title: "微博小号互动",
      summary: "get it 溪绿色",
      source: "https://weibo.com/7596287858/5151343031357502",
      images: [
        { src: "images/timeline/wb-dy/wbxh02.jpg", alt: "微博互动截图" }
      ]
    },
    {
      id: "event-2025-04",
      date: "2025-04-11",
      title: "口袋房间互动",
      summary: "期待发型~",
      images: [
        { src: "images/timeline/kd/kd250411.jpg", alt: "口袋图片" }
      ]
    },
    {
      id: "event-2025-04",
      date: "2025-04-12",
      title: "口袋房间提及",
      summary: "一起吃饭练舞",
      images: [
        { src: "images/timeline/kd/kd250412.jpg", alt: "口袋图片" },
        { src: "images/timeline/kd/kd250412(2).jpg", alt: "口袋图片" },
        { src: "images/timeline/kd/kd250412(3).jpg", alt: "口袋图片" }
      ]
    },
    {
      id: "event-2025-04",
      date: "2025-04-16",
      title: "口袋房间提及",
      summary: "一起扒舞",
      images: [
        { src: "images/timeline/kd/kd250416.jpg", alt: "口袋图片" }
      ]
    },
    {
      id: "event-2025-05",
      date: "2025-05-02",
      title: "口袋房间提及",
      summary: "一起吃饭",
      images: [
        { src: "images/timeline/kd/kd250502.jpg", alt: "口袋图片" },
        { src: "images/timeline/kd/kd250502(2).jpg", alt: "口袋图片" }
      ]
    },
    {
      id: "event-2025-05",
      date: "2025-05-03",
      title: "口袋房间提及",
      summary: "Yuki的好看",
      images: [
        { src: "images/timeline/kd/kd250503.jpg", alt: "口袋图片" }
      ]
    },
    {
      id: "event-2025-05",
      date: "2025-05-07",
      title: "口袋房间提及",
      summary: "没带手机的美美",
      images: [
        { src: "images/timeline/kd/kd250503.jpg", alt: "口袋图片" }
      ]
    },
    {
      id: "event-2025-05",
      date: "2025-05-08",
      title: "口袋房间提及",
      summary: "一起吃饭，陪着录音",
      images: [
        { src: "images/timeline/kd/kd250508.jpg", alt: "口袋图片" }
      ]
    },
    {
      id: "event-2025-05",
      date: "2025-05-11",
      title: "口袋房间提及",
      summary: "一起拍pv",
      images: [
        { src: "images/timeline/kd/kd250511.jpg", alt: "口袋图片" }
      ]
    },
    {
      id: "event-2025-05",
      date: "2025-05-30",
      title: "口袋房间提及",
      summary: "吃饭了",
      images: [
        { src: "images/timeline/kd/kd250530.jpg", alt: "口袋图片" }
      ]
    },
    {
      id: "event-2025-06",
      date: "2025-06-10",
      title: "口袋房间提及",
      summary: "我手机美美在用",
      images: [
        { src: "images/timeline/kd/kd250610.jpg", alt: "口袋图片" }
      ]
    },
    {
      id: "event-2025-06",
      date: "2025-06-19",
      title: "口袋房间提及",
      summary: "推荐美食",
      images: [
        { src: "images/timeline/kd/kd250619.jpg", alt: "口袋图片" }
      ]
    },
    {
      id: "event-250705-pocket",
      date: "2025-07-05",
      title: "口袋房间提及",
      summary: "录完音一起去吃烤肉",
      images: [
        { src: "images/timeline/kd/kd250705.jpg", alt: "口袋图片" }
      ]
    },
    {
      id: "event-250711-pocket",
      date: "2025-07-11",
      title: "口袋房间提及",
      summary: "等Yuki|睡觉评价",
      images: [
        { src: "images/timeline/kd/kd250711.jpg", alt: "口袋图片" },
        { src: "images/timeline/kd/kd250711(2).jpg", alt: "口袋图片" }
      ]
    },
    {
      id: "event-2025-07",
      date: "2025-07-18",
      title: "口袋房间提及",
      summary: "carry王者的两人|一起逛街",
      images: [
        { src: "images/timeline/kd/kd250718.jpg", alt: "口袋图片" },
        { src: "images/timeline/kd/kd250718(2).jpg", alt: "口袋图片" }
      ]
    },
    {
      id: "event-2025-07",
      date: "2025-07-26",
      title: "口袋房间提及",
      summary: "街拍二人组",
      images: [
        { src: "images/timeline/kd/kd250726.jpg", alt: "口袋图片" },
        { src: "images/timeline/kd/kd250726(2).jpg", alt: "口袋图片" }
      ]
    },
    {
      id: "event-2025-08",
      date: "2025-08-21",
      title: "口袋房间提及",
      summary: "我讨厌你",
      images: [
        { src: "images/timeline/kd/kd250821.jpg", alt: "口袋图片" }
      ]
    },
    {
      id: "event-2025-08",
      date: "2025-08-24",
      title: "口袋房间提及",
      summary: "掉发色了以及吃海底捞",
      images: [
        { src: "images/timeline/kd/kd250824(2).jpg", alt: "口袋图片" },
        { src: "images/timeline/kd/kd250824.jpg", alt: "口袋图片" }
      ]
    },
    {
      id: "event-2026-05",
      date: "2026-05-09",
      title: "口袋房间提及",
      summary: "gcm我宣你",
      images: [
        { src: "images/timeline/kd/kd260509.jpg", alt: "口袋图片" }
      ]
    },
    {
      id: "event-2026-05",
      date: "2026-05-11",
      title: "口袋房间提及",
      summary: "生日快乐Yuki爸爸",
      images: [
        { src: "images/timeline/kd/kd260511.jpg", alt: "口袋图片" }
      ]
    },
    {
      id: "event-2026-06",
      date: "2026-06-26",
      title: "口袋房间互动",
      summary: "逗你的",
      images: [
        { src: "images/timeline/kd/kd260626.jpg", alt: "口袋图片" }
      ]
    }
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
  {
    platform: "豆瓣",
    title: "我们的相识比流言更早，我们的感情比永远更牢——kiyo米糖点合集（持续更新中） ",
    date: "2026-08-04",
    url: "https://www.douban.com/group/topic/496003278/?_spm_id=MjY1Nzc1OTA1&_i=02295789MFMgZ3"
  },
  {
    platform: "豆瓣",
    title: "kiyo米念信文字版 ",
    date: "2026-09-13",
    url: "https://www.douban.com/group/topic/499798367/?_spm_id=MjQ2NjUwMTQ2&_i=02273559MFMgZ3"
  },
   {
    platform: "豆瓣",
    title: "龚晨美生日公演——覃柯蒙信文字版",
    date: "2026-07-19",
    url: "https://www.douban.com/group/topic/494410080/?_spm_id=MjU2ODg1MDQ0&_i=02332399MFMgZ3"
  },
 ],
  moments: [
    // 图片：{ id: "moment-01", type: "image", date: "2026-01-01", text: "一句文案", thumbnail: "images/thumb.webp", media: "images/original.jpg" }
    // 视频：{ id: "moment-02", type: "video", date: "2026-01-01", text: "一句文案", thumbnail: "images/thumb.webp", link: "https://..." }
  ]
};
