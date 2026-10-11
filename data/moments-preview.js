// 仅由 moments.html?preview=1 使用，不写入正式 SITE_DATA.moments。
// 2501 至 2508 是预览顺序；没有已核实的拍摄日期，不补造月份或文案。
window.MOMENTS_PREVIEW = Array.from({ length: 8 }, (_, index) => ({
  id: `preview-2025-${index + 1}`,
  type: "image",
  year: 2025,
  order: index + 1,
  thumbnail: `images/moments/25${String(index + 1).padStart(2, "0")}.jpg`,
  media: `images/moments/25${String(index + 1).padStart(2, "0")}.jpg`
}));
