# kiyo米·Archive 内容维护说明

网站的文字与条目统一维护在 `data/site-data.js`，页面结构通常不需要修改。

## Profile

在 `people` 中修改对应人物：

```js
{
  id: "qkm",
  name: "覃柯蒙",
  color: "blue",
  image: "images/qkm.jpg",
  intro: "个人简介",
  facts: [
    { label: "职业", value: "填写内容" },
    { label: "代表作", value: "填写内容" }
  ],
  links: [
    { label: "相关链接名称", url: "https://完整链接" }
  ]
}
```

## Timeline

每条正式事件必须有日期、标题、简述和原始来源。页面会自动按日期从新到旧排列，并生成年份筛选。

```js
{
  id: "event-2026-01",
  date: "2026-01-01",
  title: "事件标题",
  summary: "事件简述",
  source: "https://原始来源链接"
}
```

`id` 必须唯一。推荐使用 `event-年份-序号`，发布后不要随意更改，否则 Archive 中的定位链接会变化。

## Moments

图片或 GIF：

```js
{
  id: "moment-01",
  type: "image",
  date: "2026-01-01",
  text: "一句情感化文案",
  thumbnail: "images/moments/moment-01-thumb.webp",
  media: "images/moments/moment-01.jpg"
}
```

外部视频：

```js
{
  id: "moment-02",
  type: "video",
  date: "2026-01-01",
  text: "一句情感化文案",
  thumbnail: "images/moments/moment-02-thumb.webp",
  link: "https://外部视频链接"
}
```

缩略图建议使用 WebP、4:5 比例、宽度 720px 左右。原图或 GIF 只会在访客打开弹窗时加载。

## 发布前检查

- `site.contactEmail` 已填写专用公开邮箱。
- 至少 10 条真实 Timeline，且来源链接可以访问。
- 至少 10 个真实 Moments，没有示例文案或占位素材。
- 两份 Profile 的照片、简介、基本资料和链接均已填写。
- 在手机和电脑上检查导航、年份筛选、图片弹窗和外部视频链接。
