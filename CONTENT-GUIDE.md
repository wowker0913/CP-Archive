# kiyo米·Archive 网站修改说明书

这份说明对应 `D:\CP-Archive` 当前的网站文件。大部分**列表内容**在 `data/site-data.js` 中；首页文案、Profile 总览卡片和各内页的开头文字则直接写在对应 `.html` 中。保存本地文件不会自动更新线上网站；你说过要等你明确同意才推送，所以可以放心先在本地修改、预览。

## 一眼找到该改的文件

| 想修改什么 | 文件与位置 |
| --- | --- |
| 网站名称、页脚纠错邮箱 | `data/site-data.js` 的 `site` |
| 首页标题、引言、按钮、合影 | `index.html` 的 `.hero-copy`、`.hero-stage`；合影文件是 `images/couple.jpg` |
| Profile 总览标题、两张入口卡片 | `profile.html` 的 `.page-intro`、`.profile-choices` |
| 两个个人页的简介、资料、相关链接、安利帖 | `data/site-data.js` 的 `people`，分别找 `id: "qkm"` 和 `id: "gcm"` |
| Timeline 有链接的事件 | `data/site-data.js` 的 `timelineLinks` |
| Timeline 截图事件 | `data/site-data.js` 的 `timelineImages` |
| 同人二创与延伸阅读 | `data/site-data.js` 的 `fanWorks`，用 `type` 区分类别，页面为 `fanworks.html` |
| Moments 图片、GIF、视频 | `moments.html` 和 `data/site-data.js` 的 `moments`；当前尚无正式素材 |
| Archive 统计与目录 | 从上述数据自动生成，通常不手动修改 |
| 内页大标题与引导句 | `profile.html`、`timeline.html`、`fanworks.html`、`moments.html`、`archive.html` 各自的 `.page-intro` |
| 全站配色、字号、相框 | `style.css`；先看开头的 `:root` |
| 顶部导航、页脚模板 | `script.js` 的 `navItems`、`renderChrome()`；仅改资料通常不用碰 |

`qkm.html` 与 `gcm.html` 是个人页外壳；个人正文由 `script.js` 从数据文件生成。各个 `.html` 文件的 `<title>` 和 `<meta name="description">` 则控制浏览器标签标题与页面摘要，可分别修改。

## 修改数据时的基本格式

`data/site-data.js` 是 JavaScript。文字用英文双引号包起来，字段和相邻条目之间用英文逗号 `,` 分隔，括号与引号要配对。新增条目时复制同类的一整组 `{ ... }`，再改内容；没有条目时写空数组 `[]`。保存文件建议保持 UTF-8 编码。

链接填完整的实际网址（一般以 `https://` 开头），不要留下 `https://帖子完整链接` 这类示例占位符，也不要在网址前后加空格。资料内容由你人工核实筛选；公开可访问不等于获得图片转载授权。

## HOME：首页怎么改

打开 `index.html`：

- 左侧小字是 `.archive-name`：「kiyo米 · Archive」。它是杂志式站名。
- 最大的一行在 `<h1 id="home-title">`：「覃柯蒙 × 龚晨美」。覃柯蒙用 `.name-blue`（深海蓝），龚晨美用 `.name-green`（深蕨绿），乘号用 `.pair-cross`；字号随文字栏宽度缩放，在手机和电脑上都保持一行。
- 名字下面是一条约 120px 的蓝绿细线 `.hero-line`，引言和“进入档案”按钮依次排在下方。
- 引言在 `<blockquote>` 中，目前是「你在身边，在你身边。」。首页不再放「一处关于共同经历与被珍藏瞬间的档案。」。
- “进入档案”是带蓝绿底边的 `.primary-link` 按钮，目标仍是 `archive.html`；文字和目标地址在 `index.html` 修改。
- 右侧合影在 `.couple-frame`，文件是 `images/couple.jpg`。浅纸相框四边留白等宽，外圈和照片内侧各有一条从绿到蓝的细线；手机上移到文字下方。不要裁切或替换图片文件。
- 合影边缘的「龚晨美」和「覃柯蒙」分别用 `.corner-gcm`、`.corner-qkm` 标记。单人照片 `images/qkm.jpg`、`images/gcm.jpg` 仍用于 Profile。

注意：数据文件里的 `site.tagline` **目前没有被首页调用**；要换首页那句引言，请直接改 `index.html`。如果只是换个人页或总览照片，保持原文件名，替换 `images/qkm.jpg` 或 `images/gcm.jpg` 即可。合影单独更换时，替换 `images/couple.jpg`，或同步改 `index.html` 里的路径。

## PROFILE：总览入口怎么改

打开 `profile.html`，`.profile-intro` 里是居中的“关于她们”，PROFILE 在标题下方。`.profile-choices` 是上一版的两张并排入口卡片：桌面上每张卡片的照片在左、姓名与“查看个人档案”在右；窄屏时卡片内改为照片在上、文字在下，手机上两张卡片依次排列。链接仍为 `href="qkm.html"`／`href="gcm.html"`。改数据文件中个人姓名并不会自动修改首页和总览卡片，记得同步检查。

若只想调这两张照片的浅相纸边框，在 `style.css` 找 `.profile-choice`、`.choice-image`、`.choice-copy`；更换资料或照片不需要碰 CSS。

悬停或点击总览卡片时，照片不要放大。反馈只出现在“查看个人档案”这几个字上：字色变成对应人物色，并出现下划线。整张卡片仍然可以点进个人页。

个人页大图在 `.person-image`，有细纸边和人物色角标。覃柯蒙页照片在左、资料在右；龚晨美页资料在左、照片在右。文字本身左对齐。手机上两页都把照片放在上方，资料放在下方。改简介和资料仍在数据文件。

龚晨美个人页照片目前往右收了一点，只改显示位置，不要裁切、压缩或替换 `images/gcm.jpg`。位置在 `style.css` 的 `.person-layout.green .person-image img`，现在是 `object-position: 80% center`。数字越大，画面越靠右，左侧外套越少；再往右不要超过大约 86%，否则会切到手指。覃柯蒙个人页没有单独偏移。首页已改成一张合影，不再使用单人裁切；总览卡片的照片裁切在 `.choice-image img`，调个人页时不要一起改。

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

页脚纠错邮箱在同一文件的 `site.contactEmail`。当前已填写公开邮箱，页脚会显示它；若要更换，只改这一处。

## Timeline

有链接的事件写在 `timelineLinks`，带截图的事件写在 `timelineImages`，不要再混写进同一个数组。两段各自按日期从早到晚排列；页面会合并后默认从新到旧显示。有链接的事件要有日期、标题、简述和原始来源。带截图的事件要有日期、标题、简述和 `images`，原博链接可以写在该条的 `source`，没有单独链接时可以不填。左侧用年份下拉框筛选，右侧可以切换倒序或正序，两者在同一行。页面顶部的“一起走过的时光”左对齐，桌面上 TIMELINE 位于同一行右侧，手机上移到标题下方；标题和引导句在 `timeline.html` 的 `.timeline-intro` 修改。Archive 的“档案总览”也是同样排法；Profile 总览已恢复为居中标题。

```js
{
  id: "event-01",
  date: "2026-01-01",
  title: "事件标题",
  summary: "事件简述",
  source: "https://原始来源链接"
}
```

同一事件需要记录多个来源时，使用 `sources` 数组。每个来源可以设置显示名称：

```js
{
  id: "event-02",
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

`date` 填开始日期，格式仍是 `YYYY-MM-DD`。单日事件只填 `date`。排序按开始日期。请填真实、可说明精度的日期；不确定具体哪一天时先核实或暂不录入，不要为了排序编造日期。

某条是连续几天的汇总时，再加一个 `endDate`，填写最后一天。页面会显示成一段时间，例如 `2026.01.01 — 01.07`；跨年则写成 `2025.12.28 — 2026.01.03`。筛选年份时，开始年和结束年都能看到这条。不填 `endDate`，或结束日期不晚于开始日期时，仍按原来的单日显示。不要把现有单日事件改成区间，除非这条本来就是多日汇总。

```js
{
  id: "event-03",
  date: "2026-01-01",
  endDate: "2026-01-07",
  title: "多日汇总标题",
  summary: "这几天里已确认的简述",
  source: "https://原始来源链接"
}
```

同一天里有好几件事时，每件事仍然单独写一条，`date` 填同一天。页面会把这一天合并成一条时间线：日期和圆点只出现一次，几件事紧挨在这条里面，不再各占一条。同一天里，有链接的事件排在图片事件前面；每一段内部按文件中的先后排列。切换倒序或正序时，这一天内部的顺序不变。

这几条的 `id` 必须各不相同，否则档案目录会跳到同一条。新加的事件请使用全站不重复的编号，不要再和别的日期共用。已经存在、而且日期不同的重复编号先不要批量改；只有会跳错时再单独改。短编号一旦用在同一天的几条上，就不要再改。2025-07-05 的直播是 `event-250705-live`，2025-07-11 的直播是 `event-250711-live`；这两天的口袋截图仍是 `event-250705-pocket`、`event-250711-pocket`。

```js
{ id: "event-260101-day", date: "2026-01-01", title: "白天的事件", summary: "简述", source: "https://原始来源链接" },
{ id: "event-260101-night", date: "2026-01-01", title: "晚上的事件", summary: "简述", source: "https://另一条来源链接" }
```

### 互动截图

口袋、房间、互动、互评只放截图，不摘抄龚晨美和覃柯蒙的聊天原文。这些条目写进 `timelineImages`。口袋图片放进 `images/timeline/kd/`，文件名用 `kd` 开头；微博和抖音图片放进 `images/timeline/wb-dy/`，文件名用 `wb` 或 `dy` 开头。文件夹名不能包含斜杠，所以没有做成 `wb/dy`。再写进对应事件的 `images`。缩略图统一成同样的小尺寸，画面可以被裁切；长图主要露出上方，横图主要露出左侧，点击后看完整原图。时间线上先显示小图；点击后直接弹出原图，图片本身不加底色卡片。关闭按钮叠在图片右上角，点击旁边的暗色空白也会关闭。原图比屏幕高时，可以在弹窗里上下滑动看完整内容，不会被裁切。原博链接写在这张图的 `source` 里，会出现在原图下面。带图片的事件和下一条之间仍留出与其他事件相近的空隙。没有截图的事件仍只显示文字和原来的来源链接。

```js
{
  id: "event-01",
  date: "2026-01-01",
  title: "事件标题",
  summary: "一句已确认的简述",
  source: "https://原始来源链接",
  images: [
    { src: "images/timeline/kd/room-01.jpg", alt: "房间互动截图", source: "https://原博链接" }
  ]
}
```

同一条可以放多张图，每张都能单独点开。`alt` 是图片说明，`source` 可以不填；不填就不会出现空链接。不要把聊天原文写进 `summary`。

## 同人二创（FANWORKS）

**所有分类都在 `data/site-data.js` 的同一个 `fanWorks` 数组中编辑。** 原来 `timelinePosts` 的 6 条帖子已完整移入，并标记为 `type: "延伸阅读"`；无需再维护另一份数组。个人页安利帖仍在 `people` 中相应人物的 `fanPosts`。

### 怎样新增或修改

1. 在 `data/site-data.js` 搜索 `fanWorks:`，找到已有的内容列表。
2. 修改内容时，直接改对应条目的字段；新增时，在数组的最后一个条目后添加一个对象，用英文逗号隔开。
3. 填写唯一 `id`、标题 `title` 和完整原作链接 `url`。`id` 不要与其他内容重复，也不要因为修改标题而改动已有 `id`。
4. 用 `type` 选择分类：`同人文`、`同人图`、`剪辑`、`延伸阅读`、`未分类`。不填写或填写其他文字，会显示为未分类。无需填写“全部”，它是网页上的筛选按钮。
5. `creator`（作者）、`platform`（平台）、`date`（YYYY-MM-DD）可省略；不知道日期时不要编造。保存文件并刷新本地预览。

下面是**新增条目格式说明**，不要直接录入为正式资料，也不要替换整个现有数组：

```js
{
  id: "fanwork-01",                 // 必填：新条目的唯一编号
  title: "作品标题",                 // 必填：页面显示的标题
  url: "https://原作完整链接",        // 必填：http:// 或 https:// 开头
  type: "同人文",                   // 分类：五种固定分类之一
  creator: "作者",                   // 可选
  platform: "微博",                  // 可选，仅作条目信息，不作为筛选
  date: "2026-10-05"                // 可选，填写真实日期
},
```

豆瓣或微博整理帖同样添加到 `fanWorks`，将 `type` 填为 `"延伸阅读"` 即可。事件的原始来源仍填在对应 `timelineLinks` 或 `timelineImages` 条目里。

列表按日期从新到旧排列，没有日期的排在最后；所有外链在新标签页打开。分类顺序固定为：全部、同人文、同人图、剪辑、延伸阅读、未分类。只有所选分类没有内容时才显示空状态。`fanworks.html#reading` 会选中延伸阅读并定位到分类列表；切换到其他分类会清除该锚点。旧的 `timeline.html#timeline-posts` 入口继续跳转到这里，Timeline 不再重复展示帖子。Archive 的延伸阅读入口也从 `fanWorks` 自动生成。

## Moments

Moments 目前暂时隐藏：`script.js` 中的顶部导航和 Archive 目录入口已注释，页面、组件、资料和图片均保留，仍可通过原地址直接预览。恢复时取消两处入口注释，并将 Archive 导航编号改回 06。栏目用于两人的照片、GIF 与原始短片；粉丝创作链接放同人二创页。`data/site-data.js` 的 `moments` 数组目前为空，页面会显示正式空状态。Archive 统计仍只显示 EVENTS 与 YEARS，不因空栏目增加零值。

Moments 使用独立的相册版式：顶部为小标题，主体按年份展示纯色相册封面，封面只显示年份。点击封面以短淡入打开内页，768px 及以上显示双页，手机显示单页；照片保留原比例，居中留白。可拖动四个页角，纸页随手势折叠，松手后完成翻页或回弹；翻页按钮、左右方向键和横滑也可浏览。点击图片查看原图，关闭后焦点返回照片；视频仍在新标签页打开。单张照片相册、系统设置减少动态效果或翻页组件不可用时，使用静态内页直接切换，浏览功能不受影响。

纸页效果使用本地固定版本 StPageFlip 2.0.7（`assets/vendor/page-flip/page-flip-2.0.7.browser.js`，44,058 字节），无需 CDN 或运行时依赖。MIT 许可证保存在同目录的 `LICENSE`，分发组件时须一起保留。按钮翻页时长设为 650ms，手势松手动画由组件按剩余距离决定；翻动期间不会接收重复翻页。组件内页使用数据属性标识照片，隐藏页和临时副本不参与键盘焦点；窗口尺寸变化时保留阅读位置。

正式素材继续放在 `moments` 数组，每条 `id` 唯一。完整 `date`（YYYY-MM-DD）优先确定年份和顺序，同一年内从新到旧；只知道年份时填写 `year`（如 2025），可用 `order`（从 1 开始）指定无日期素材的顺序。不要为了分组编造日期。`text` 可省略，没有文案时只显示页码。没有日期也没有有效年份的条目不会进入相册。

本地预览入口为 `moments.html?preview=1`，读取独立的 `data/moments-preview.js`，不会写入正式 `moments`。当前 8 张 `images/moments/2501.jpg` 至 `2508.jpg` 暂作 2025 年预览，按文件编号排列，不将编号解释成月份。正式页面 `moments.html` 仍显示空状态。之后确认正式收录时，再把核实后的素材写入 `moments`。

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

先把素材放进项目的 `images/moments/` 文件夹，再填写实际相对路径。缩略图建议使用 WebP、宽度 720px 左右，保留照片构图；相册内页完整展示图片，不强制裁成固定比例。`thumbnail` 是内页先加载的小图；`media` 是原图或 GIF，只会在访客打开弹窗时加载。GIF 的 `media` 指向 `.gif`，缩略图仍尽量使用轻量静态图。视频也要本地缩略图，但 `link` 应指向外部原视频平台，点击后在新标签页打开；不要把视频放进 `media`。

## Archive

`archive.html` 的 `.page-intro` 可以修改左对齐的“档案总览”标题及说明，桌面上 ARCHIVE 位于同一行右侧。目前只统计 EVENTS 与 YEARS；目录包含 PROFILE、TIMELINE、FANWORKS；MOMENTS 入口暂时注释隐藏。TIMELINE 目录只显示最近 3 条，下面一行左边是「更多」，右边是「查看全部」，与上面的条目标题和日期对齐。延伸阅读入口在 FANWORKS 分组中，指向 `fanworks.html#reading`。新增资料后刷新页面即可看到变化，不用手动改统计数或目录 HTML。

## 全站视觉变量

统一视觉变量在 `style.css` 文件开头的 `:root` 中，并附有中文用途注释。常用调整点：

- `--color-qkm` / `--color-qkm-deep` / `--color-qkm-soft`：覃柯蒙的海蓝、深色文字、浅色装饰。
- `--color-gcm` / `--color-gcm-deep` / `--color-gcm-soft`：龚晨美的蕨绿、深色文字、浅色装饰。
- `--color-paper` / `--color-paper-deep`：暖纸背景与次级表面。
- `--font-display` / `--font-body`：标题衬线体与中文正文系统字体。
- `--text-title` / `--text-hero`：内页大标题和首页双人姓名的字号。首页站名「kiyo米 · Archive」是小字，不使用这两个字号。
- `--space-1` 至 `--space-7`：统一页面留白。

中文字体优先使用访客设备上的系统字体，不依赖 Google Fonts；这样在大陆网络环境下也能稳定加载。只改 Profile 总览照片边框可搜索 `.choice-image`；个人页大图要改 `.person-image` 和 `.person-copy`。龚晨美个人页再往右或往左，只改 `.person-layout.green .person-image img` 里的 `80%`，不要动原图。手机布局的规则主要在文件末尾的 `@media (max-width: 900px)` 和 `@media (max-width: 700px)` 中；改颜色、字号、间距后同时检查手机与电脑。

## 发布前检查

- **先本地预览，不会推送：**在 PowerShell 中运行 `cd D:\CP-Archive`，再运行 `py -m http.server 8000`（如无 `py` 命令，试 `python -m http.server 8000`）。浏览器打开 `http://localhost:8000/`，修改保存后刷新；预览结束按 `Ctrl+C`。这一步不会上传 GitHub，也不会更新 GitHub Pages。
- `site.contactEmail` 已填写公开邮箱，页脚会显示。
- 至少 10 条真实 Timeline，且来源链接可以访问。
- FANWORKS 已公开入口，MOMENTS 入口暂时隐藏；没有真实素材时显示空状态，不要放示例作品或占位图片。
- 两份 Profile 的照片、简介、基本资料和链接均已填写。
- 在手机和电脑上检查四个栏目、年份筛选，以及正序和倒序。

常见排查：

- 修改数据后页面空白或列表不出现：检查 `data/site-data.js` 最近编辑的英文逗号、引号、花括号和方括号；浏览器开发者工具的 Console 通常会显示语法错误。
- 图片不显示：检查文件确实位于填写的路径，文件名及后缀大小写一致。线上路径区分大小写，例如 `QKM.jpg` 与 `qkm.jpg` 不同。
- 个人资料改了但首页或 Profile 总览没变：它们的部分姓名、文案与图片路径直接写在对应 HTML 中，见上面的 HOME／PROFILE 小节。
- Archive 的事件目录跳错位置：先看是不是同一天有多条事件，而且它们的编号相同。如果两天各自都有多条事件，却共用了同一个编号，也会跳到先出现的那条。新加事件请用全站不重复的编号。只有当天唯一一条时，页面用日期当跳转位置，这时不同日期共用旧编号暂时不影响跳转。
- 帖子或来源链接打不开：检查是否仍是占位符，或者网址前后是否有多余空格。

等你确认本地内容和页面效果后，再明确告诉我“可以推送”；仅仅修改或本地预览都不会发布。
