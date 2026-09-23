# kiyo米·Archive 网站修改说明书

这份说明对应 `D:\CP-Archive` 当前的网站文件。大部分**列表内容**在 `data/site-data.js` 中；首页文案、Profile 总览卡片和各内页的开头文字则直接写在对应 `.html` 中。保存本地文件不会自动更新线上网站；你说过要等你明确同意才推送，所以可以放心先在本地修改、预览。

## 一眼找到该改的文件

| 想修改什么 | 文件与位置 |
| --- | --- |
| 网站名称、页脚纠错邮箱 | `data/site-data.js` 的 `site` |
| 首页姓名、引言、按钮、双人照片 | `index.html` 的 `.hero-copy`、`.hero-portrait`；照片文件在 `images/` |
| Profile 总览标题、两张入口卡片 | `profile.html` 的 `.page-intro`、`.profile-choices` |
| 两个个人页的简介、资料、相关链接、安利帖 | `data/site-data.js` 的 `people`，分别找 `id: "qkm"` 和 `id: "gcm"` |
| Timeline 正式事件、多个原始来源 | `data/site-data.js` 的 `timeline` |
| Timeline 豆瓣／微博帖子 | `data/site-data.js` 的 `timelinePosts` |
| Moments 图片、GIF、视频 | 目前已从导航和 Archive 隐藏。页面仍是 `moments.html`，数据仍在 `data/site-data.js` 的 `moments` |
| Archive 统计与目录 | 从上述数据自动生成，通常不手动修改 |
| 内页大标题与引导句 | `profile.html`、`timeline.html`、`moments.html`、`archive.html` 各自的 `.page-intro` |
| 全站配色、字号、相框 | `style.css`；先看开头的 `:root` |
| 顶部导航、页脚模板 | `script.js` 的 `navItems`、`renderChrome()`；仅改资料通常不用碰 |

`qkm.html` 与 `gcm.html` 是个人页外壳；个人正文由 `script.js` 从数据文件生成。各个 `.html` 文件的 `<title>` 和 `<meta name="description">` 则控制浏览器标签标题与页面摘要，可分别修改。

## 修改数据时的基本格式

`data/site-data.js` 是 JavaScript。文字用英文双引号包起来，字段和相邻条目之间用英文逗号 `,` 分隔，括号与引号要配对。新增条目时复制同类的一整组 `{ ... }`，再改内容；没有条目时写空数组 `[]`。保存文件建议保持 UTF-8 编码。

链接填完整的实际网址（一般以 `https://` 开头），不要留下 `https://帖子完整链接` 这类示例占位符，也不要在网址前后加空格。资料内容由你人工核实筛选；公开可访问不等于获得图片转载授权。

## HOME：首页怎么改

打开 `index.html`：

- 首页两个大名字在 `<h1 id="home-title">` 中；引言在 `<blockquote>` 中；下方一句简介在 `.home-note` 中。
- “进入档案”按钮是 `.primary-link`，目前 `href="archive.html"`，即点击后进入 Archive。修改按钮文字或目标地址就在这一行。
- 首页照片分别是 `.portrait-blue` 和 `.portrait-green` 里的 `<img>`，目前指向 `images/qkm.jpg`、`images/gcm.jpg`。

注意：数据文件里的 `site.tagline` **目前没有被首页调用**；要换首页那句引言，请直接改 `index.html`。如果只是换照片并希望首页、Profile 总览和个人页一起换，保持原文件名，替换 `images/qkm.jpg` 或 `images/gcm.jpg` 即可。如果使用新文件名，须同步改 `index.html`、`profile.html` 与 `data/site-data.js` 的对应图片路径。

## PROFILE：总览入口怎么改

打开 `profile.html`，`.page-intro` 里是“关于她们”及说明文字；`.profile-choices` 里有两张入口卡片，含姓名、照片路径、“查看个人档案”和 `href="qkm.html"`／`href="gcm.html"` 跳转。改数据文件中个人姓名并不会自动修改首页和总览卡片，记得同步检查。

若只想调这两张照片的浅相纸边框，在 `style.css` 找 `.profile-choice`、`.choice-image`、`.choice-copy`；更换资料或照片不需要碰 CSS。

悬停或点击总览卡片时，照片不要放大。反馈只出现在“查看个人档案”这几个字上：字色变成对应人物色，并出现下划线。整张卡片仍然可以点进个人页。

个人页照片是另一套框，不要和总览卡片做成一样。`qkm.html`、`gcm.html` 的大图在 `.person-image`：宽留白相纸边，只有左上角和右下角两处人物色角标，照片边缘另有一圈同色细线。旁边的姓名、简介和链接在 `.person-copy`，与照片隔开，整组放在右侧空白的中间；文字本身仍左对齐。手机上照片在上、文字在下，文字块居中，并与照片留出一段距离。改简介和资料仍在数据文件，不用改这些样式。

## Profile

在 `data/site-data.js` 的 `people` 中修改对应人物。`id: "qkm"` 对应 `qkm.html`，`id: "gcm"` 对应 `gcm.html`；`color` 分别保持 `blue`、`green`，不要因为更换简介而改动这些标识：

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
  ],
  fanPosts: [
    { label: "豆瓣｜安利帖标题", url: "https://豆瓣帖子链接" },
    { label: "微博｜安利帖标题", url: "https://微博帖子链接" }
  ]
}
```

`image` 是个人页主照片，`intro` 是简短介绍；`facts` 中每组 `label`／`value` 是一行“字段名／内容”，两人的资料项可以不同。`links` 放本人账号等相关链接；`fanPosts` 放豆瓣、微博等**个人向**粉丝安利帖。每条填写展示标题 `label` 和完整网址 `url`，访客点击后会在新标签页打开。暂时没有选好的帖子时保持 `fanPosts: []`，页面不会显示空栏目。帖子属于粉丝整理内容，不作为官方资料。

页脚纠错邮箱在同一文件的 `site.contactEmail`，例如 `contactEmail: "你的公开邮箱@example.com"`。当前值是空字符串，所以页脚显示“联系邮箱将在发布前补充”；请只填写愿意公开的邮箱。

## Timeline

每条正式事件必须有日期、标题、简述和原始来源。页面会自动按日期从新到旧排列，并生成年份筛选。页面顶部的“一起走过的时间”及引导句则在 `timeline.html` 的 `.page-intro` 修改。

```js
{
  id: "event-2026-01",
  date: "2026-01-01",
  title: "事件标题",
  summary: "事件简述",
  source: "https://原始来源链接"
}
```

同一事件需要记录多个来源时，使用 `sources` 数组。每个来源可以设置显示名称：

```js
{
  id: "event-2026-01-01",
  date: "2026-01-01",
  title: "事件标题",
  summary: "事件简述",
  sources: [
    { label: "微博原文", url: "https://微博链接" },
    { label: "B站视频", url: "https://哔哩哔哩链接" },
    { label: "现场照片", url: "https://其他来源链接" }
  ]
}
```

旧的 `source: "单个链接"` 写法仍然可以继续使用；同一条事件优先使用 `sources`，不要同时填写两种字段。

`date` 目前按 `YYYY-MM-DD` 文本排序，也用于年份筛选和日期显示。请填真实、可说明精度的日期；不确定具体哪一天时先核实或暂不录入，不要为了排序编造日期。

`id` 必须唯一。推荐使用 `event-年份-月份-序号`，发布后不要随意更改，否则 Archive 中的定位链接会变化。**当前数据里有数条事件都使用了 `event-2026-09`**，复制或继续添加前请为它们分别改成不同的 id（例如再加 `-stage`、`-mc` 等后缀）。这份说明书没有替你改动现有事件内容。

### Timeline 的延伸阅读

豆瓣或微博的粉丝帖子放在 `timelinePosts` 中，不要混进 `timeline` 的正式事件。它们会在 Timeline 页面的独立“延伸阅读”栏显示，不受事件年份筛选影响；没有帖子时该栏自动隐藏。每条填写标题和完整网址，平台、发帖日期可选：

```js
timelinePosts: [
  { platform: "豆瓣", title: "两人共同经历的整理帖", date: "2026-09-01", url: "https://帖子完整链接" },
  { platform: "微博", title: "互动片段安利帖", url: "https://另一篇帖子的完整链接" }
],
```

`platform`、`date` 可省略。有 `date` 的帖子按发帖日期从新到旧排列；没有日期的帖子排在后面。这里只记录帖子本身，事件的原始来源仍填在对应 `timeline` 条目里。个人介绍类安利帖继续放在相应 Profile 的 `fanPosts`。清空成 `timelinePosts: []` 后，“延伸阅读”整栏会隐藏。

## Moments

Moments 目前先隐藏，不出现在顶部导航和 Archive 目录里。`moments.html`、样式和 `data/site-data.js` 里的 `moments` 数组都还在，直接打开 `moments.html` 仍能看到页面；现在数组里只有注释，没有正式内容。

若以后要重新显示：在 `script.js` 的 `navItems` 里，于 TIMELINE 和 ARCHIVE 之间加回 `["moments", "MOMENTS", "moments.html"]`；在 `renderArchive()` 里恢复 MOMENTS、VIDEOS 统计，以及目录中的 MOMENTS 分组。统计区样式在 `style.css` 的 `.archive-stats`，目录列数在 `.directory-groups`，现在都按两栏排，恢复四项统计和三组目录时要一起改回。

页面大标题与引导句在 `moments.html`，卡片内容在 `moments` 数组。每条 `id` 都要唯一；卡片按日期从新到旧排列。

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

先把素材放进项目的 `images/moments/` 文件夹（目前尚无此文件夹，添加素材时创建），再填写实际相对路径。缩略图建议使用 WebP、4:5 比例、宽度 720px 左右。`thumbnail` 是卡片先加载的小图；`media` 是原图或 GIF，只会在访客打开弹窗时加载。GIF 的 `media` 指向 `.gif`，缩略图仍尽量使用轻量静态图。视频也要本地缩略图，但 `link` 应指向外部原视频平台，点击后在新标签页打开；不要把视频放进 `media`。

## Archive

`archive.html` 的 `.page-intro` 可以修改“档案总览”标题及说明。目前只统计 EVENTS 与 YEARS，目录只有 PROFILE 和 TIMELINE，由 `script.js` 根据 `people`、`timeline` 自动生成；有 Timeline 延伸阅读帖时还会多一个目录入口。Moments 已暂时隐藏，不计入统计，也不出现在目录里。新增资料后刷新页面即可看到变化，不用手动改统计数或目录 HTML。

## 全站视觉变量

统一视觉变量在 `style.css` 文件开头的 `:root` 中，并附有中文用途注释。常用调整点：

- `--color-qkm` / `--color-qkm-deep` / `--color-qkm-soft`：覃柯蒙的清透青蓝、深色标题、浅色装饰。
- `--color-gcm` / `--color-gcm-deep` / `--color-gcm-soft`：龚晨美的溪绿色、深色标题、浅色装饰。
- `--color-paper` / `--color-paper-deep`：米灰背景与次级表面。
- `--font-display` / `--font-body`：标题衬线体与中文正文系统字体。
- `--text-title` / `--text-hero`：使用 `clamp()` 自动适配不同屏幕的内页标题与首页大名字。
- `--space-1` 至 `--space-7`：统一页面留白。

中文字体优先使用访客设备上的系统字体，不依赖 Google Fonts；这样在大陆网络环境下也能稳定加载。只改 Profile 总览照片边框可搜索 `.choice-image`；个人页大图要改 `.person-image` 和 `.person-copy`。都不要改全站变量。手机布局的规则主要在文件末尾的 `@media (max-width: 900px)` 和 `@media (max-width: 700px)` 中；改颜色、字号、间距后同时检查手机与电脑。

## 发布前检查

- **先本地预览，不会推送：**在 PowerShell 中运行 `cd D:\CP-Archive`，再运行 `py -m http.server 8000`（如无 `py` 命令，试 `python -m http.server 8000`）。浏览器打开 `http://localhost:8000/`，修改保存后刷新；预览结束按 `Ctrl+C`。这一步不会上传 GitHub，也不会更新 GitHub Pages。
- `site.contactEmail` 仍为空，发布前再填写专用公开邮箱。
- 至少 10 条真实 Timeline，且来源链接可以访问。
- Moments 目前隐藏，不作为发布条件；若重新打开，再补真实内容，不要留示例文案或占位素材。
- 两份 Profile 的照片、简介、基本资料和链接均已填写。
- 在手机和电脑上检查导航与年份筛选。

常见排查：

- 修改数据后页面空白或列表不出现：检查 `data/site-data.js` 最近编辑的英文逗号、引号、花括号和方括号；浏览器开发者工具的 Console 通常会显示语法错误。
- 图片不显示：检查文件确实位于填写的路径，文件名及后缀大小写一致。线上路径区分大小写，例如 `QKM.jpg` 与 `qkm.jpg` 不同。
- 个人资料改了但首页或 Profile 总览没变：它们的部分姓名、文案与图片路径直接写在对应 HTML 中，见上面的 HOME／PROFILE 小节。
- Archive 的事件目录跳错位置：检查 Timeline 中是否有重复的 `id`。
- 帖子或来源链接打不开：检查是否仍是占位符，或者网址前后是否有多余空格。

等你确认本地内容和页面效果后，再明确告诉我“可以推送”；仅仅修改或本地预览都不会发布。
