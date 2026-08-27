// rosetta-handout 设计系统（standalone）——字号即 Rosetta 定稿基准，勿下调
// 画布 20×11.25in；白底；近黑标题 + 灰正文；黄 FFD363 每页至多一处强强调；浅蓝 C2DAF1 辅助；
// 三圆点母题（ink/blue/yellow）每页左上角；mono 眉标；大号编号行；终端指令卡。
// 插画素材目录：环境变量 HANDOUT_ASSETS 或 ./assets/infographics（宽高比统一 3:2）
const path = require("path");
const ASSETS = process.env.HANDOUT_ASSETS
  ? path.resolve(process.env.HANDOUT_ASSETS)
  : path.resolve(process.cwd(), "assets", "infographics");

const C = {
  ink: "191919",      // 标题近黑
  deep: "1A120C",     // 封面深棕黑
  gray: "737373",     // 正文灰
  faint: "B3A79E",    // 弱说明（暖灰）
  yellow: "E8590C",   // 橘红：唯一暖色强调
  blue: "FDBA74",     // 浅橘面板
  bluePanel: "FFF3E8",
  hair: "F0E2D6",     // 细线（暖）
  card: "FBF7F2",     // 暖白卡片
  white: "FFFFFF",
  termBg: "2A2018",   // 终端底（暖深棕）
  termGreen: "F0B28C",
};

const F = {
  disp: "Arial Black",        // 大号编号/封面
  title: "Microsoft YaHei",   // 中文标题（粗）
  body: "Microsoft YaHei",    // 中文正文
  mono: "Consolas",           // 命令/眉标
};

const PAGE = { W: 20, H: 11.25, MX: 1.12, CW: 17.76 };

const sh = () => ({ type: "outer", color: "111827", blur: 7, offset: 2, angle: 90, opacity: 0.12 });

// —— 每页固定家具 ——————————————————————————————
function furniture(slide, pres, { page, total, brand = "COURSE-101 · TEAM" } = {}) {
  // 左上角三圆点母题
  const d = 0.13, x = PAGE.MX, y = 1.0;
  slide.addShape(pres.shapes.OVAL, { x: x, y: y + 0.17, w: d, h: d, fill: { color: C.ink } });
  slide.addShape(pres.shapes.OVAL, { x: x + 0.17, y: y + 0.17, w: d, h: d, fill: { color: C.blue } });
  slide.addShape(pres.shapes.OVAL, { x: x + 0.085, y: y, w: d, h: d, fill: { color: C.yellow } });
  // 右上角小方框
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 18.52, y: 1.02, w: 0.18, h: 0.18, fill: { color: C.white, transparency: 100 },
    line: { color: C.ink, width: 1.4 },
  });
  // 顶部居中品牌
  slide.addText(brand, {
    x: 6.5, y: 0.86, w: 7.0, h: 0.4, align: "center", fontFace: F.mono,
    fontSize: 13.5, color: C.gray, charSpacing: 4, margin: 0,
  });
  // 右下角页码
  if (page) {
    slide.addText(`${String(page).padStart(2, "0")} / ${String(total).padStart(2, "0")}`, {
      x: 17.1, y: 10.48, w: 1.4, h: 0.34, align: "right", fontFace: F.mono,
      fontSize: 13, color: C.faint, margin: 0,
    });
    slide.addShape(pres.shapes.OVAL, { x: 18.62, y: 10.58, w: 0.1, h: 0.1, fill: { color: C.yellow } });
  }
}

// —— 眉标 + 标题 ——————————————————————————————
function kicker(slide, text, { x = PAGE.MX, y = 1.64, w = 12 } = {}) {
  slide.addText(text.toUpperCase(), {
    x, y, w, h: 0.36, fontFace: F.mono, fontSize: 15, color: C.gray,
    charSpacing: 3, margin: 0,
  });
}
function title(slide, text, { x = PAGE.MX, y = 2.0, w = 14, size = 40, color = C.ink } = {}) {
  slide.addText(text, {
    x, y, w, h: size / 46, fontFace: F.title, fontSize: size, bold: true,
    color, margin: 0,
  });
}

// —— 大编号行 ——————————————————————————————————
function numberRow(slide, pres, { x, y, num, label, body, w = 10.5, numColor = C.ink }) {
  slide.addText(num, {
    x, y: y - 0.06, w: 1.35, h: 0.9, fontFace: F.disp, fontSize: 42, color: numColor, margin: 0,
  });
  slide.addText(label, {
    x: x + 1.55, y, w: w - 1.55, h: 0.52, fontFace: F.title, fontSize: 23, bold: true, color: C.ink, margin: 0,
  });
  slide.addText(body, {
    x: x + 1.55, y: y + 0.52, w: w - 1.55, h: 1.2, fontFace: F.body, fontSize: 21,
    color: C.gray, margin: 0, lineSpacingMultiple: 1.2, valign: "top",
  });
}

// —— 胶囊标签 ——————————————————————————————————
function textW(text, size) { // 估算文本宽度（in）：CJK 1em，Latin ~0.6em
  let u = 0;
  for (const ch of text) u += /[\u2E80-\u9FFF\uF900-\uFFEF·“”]/.test(ch) ? 1 : 0.6;
  return u * size / 72 * 1.02;
}
function chip(slide, pres, { x, y, text, w, fill = C.blue, color = C.ink, size = 15, bold = true }) {
  const cw = w || Math.max(0.9, textW(text, size) + 0.44);
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w: cw, h: size / 26 + 0.34, rectRadius: (size / 26 + 0.34) / 2, fill: { color: fill },
  });
  slide.addText(text, {
    x, y, w: cw, h: size / 26 + 0.34, align: "center", valign: "middle",
    fontFace: F.title, fontSize: size, bold, color, margin: 0,
  });
  return cw;
}

// —— 终端指令卡 —————————————————————————————————
// lines: [{ p: 'prompt文本', c: '命令', note: '灰色注释' }] 或纯字符串
function termCard(slide, pres, { x, y, w, h = 2.2, name = "terminal", lines = [] }) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.1, fill: { color: C.termBg }, shadow: sh(),
  });
  const dot = (dx, col) => slide.addShape(pres.shapes.OVAL, {
    x: x + dx, y: y + 0.18, w: 0.12, h: 0.12, fill: { color: col },
  });
  dot(0.22, C.blue); dot(0.42, C.yellow); dot(0.62, "5A6472");
  slide.addText(name, {
    x: x + w - 2.4, y: y + 0.1, w: 2.2, h: 0.3, align: "right",
    fontFace: F.mono, fontSize: 13, color: "6B7683", margin: 0,
  });
  slide.addShape(pres.shapes.LINE, {
    x: x + 0.12, y: y + 0.46, w: w - 0.24, h: 0, line: { color: "343B43", width: 0.75 },
  });
  const runs = [];
  lines.forEach((L, i) => {
    const last = i === lines.length - 1;
    if (typeof L === "string") {
      runs.push({ text: L, options: { color: "C9D3DE", breakLine: !last } });
    } else {
      if (L.p) runs.push({ text: "❯ ", options: { color: C.yellow } });
      if (L.c) runs.push({ text: L.c, options: { color: "F2F5F8" } });
      if (L.note) runs.push({ text: "  # " + L.note, options: { color: "8A96A5" } });
      runs.push({ text: "", options: { breakLine: true } });
    }
  });
  slide.addText(runs, {
    x: x + 0.3, y: y + 0.62, w: w - 0.6, h: h - 0.78, fontFace: F.mono,
    fontSize: 18, valign: "top", margin: 0, lineSpacingMultiple: 1.3,
  });
}

// —— 图片卡（白底信息图 + 细线框 + 阴影 + 图注；素材 3:2）——————
function imgCard(slide, pres, { file, x, y, w, caption, ch = 0.42 }) {
  const h = w / 1.5;
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: x - 0.07, y: y - 0.07, w: w + 0.14, h: h + 0.14, rectRadius: 0.08,
    fill: { color: C.white }, line: { color: C.hair, width: 1 }, shadow: sh(),
  });
  slide.addImage({ path: path.join(ASSETS, file), x, y, w, h });
  if (caption) {
    slide.addText(caption, {
      x, y: y + h + 0.16, w, h: ch, fontFace: F.mono, fontSize: 14,
      color: C.faint, margin: 0, lineSpacingMultiple: 1.2,
    });
  }
  return h;
}

// —— 强调面板 / 警示 ————————————————————————————
function noteBar(slide, pres, { x, y, w, h = 0.95, kind = "note", runs }) {
  const fill = kind === "warn" ? C.yellow : kind === "blue" ? C.blue : C.card;
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.08, fill: { color: fill, transparency: kind === "warn" ? 62 : kind === "blue" ? 45 : 25 },
  });
  const lead = kind === "warn" ? "⚠ " : "";
  slide.addText(runs.map((r, i) => (typeof r === "string"
    ? { text: (i === 0 ? lead : "") + r, options: {} }
    : r)), {
    x: x + 0.3, y, w: w - 0.55, h, fontFace: F.body, fontSize: 20,
    color: C.ink, valign: "middle", margin: 0, lineSpacingMultiple: 1.2,
  });
}

// —— 一句话总结页 ———————————————————————————————
function summarySlide(pres, { page, total, statement, sub, chipText, file, brand }) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  furniture(s, pres, { page, total, brand });
  kicker(s, "一句话总结");
  s.addShape(pres.shapes.OVAL, { x: PAGE.MX, y: 2.6, w: 0.6, h: 0.6, fill: { color: C.yellow } });
  s.addText("“", {
    x: PAGE.MX, y: 2.56, w: 0.6, h: 0.6, align: "center", valign: "middle",
    fontFace: F.title, fontSize: 30, bold: true, color: C.ink, margin: 0,
  });
  s.addText(statement, {
    x: PAGE.MX + 0.95, y: 2.42, w: 11.6, h: 2.7, fontFace: F.title, fontSize: 32, bold: true,
    color: C.ink, margin: 0, valign: "top", lineSpacingMultiple: 1.3,
  });
  if (sub) s.addText(sub, {
    x: PAGE.MX + 0.95, y: 5.3, w: 11.2, h: 1.8, fontFace: F.body, fontSize: 21,
    color: C.gray, margin: 0, lineSpacingMultiple: 1.35,
  });
  if (chipText) chip(s, pres, { x: PAGE.MX + 0.95, y: 7.2, text: chipText, fill: C.blue, size: 16 });
  if (file) imgCard(s, pres, { file, x: 13.6, y: 2.7, w: 5.3 });
  return s;
}

// —— 章节封面 ———————————————————————————————————
// 封面配图已放大定稿：x 12.55 / w 6.35（左界让清课程胶囊换行区，图注底与胶囊行留隙）
function chapterCover(pres, { page, total, num, titleCn, titleEn, summary, lessons = [], file, caption, brand }) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  furniture(s, pres, { page, total, brand });
  s.addText(num, {
    x: PAGE.MX - 0.08, y: 1.85, w: 3.6, h: 1.9, fontFace: F.disp, fontSize: 96, color: C.yellow, margin: 0,
  });
  s.addText(`CHAPTER ${num} · ${titleEn}`, {
    x: PAGE.MX, y: 3.85, w: 10, h: 0.38, fontFace: F.mono, fontSize: 14, color: C.gray,
    charSpacing: 3, margin: 0,
  });
  s.addText(titleCn, {
    x: PAGE.MX, y: 4.24, w: 11.4, h: 1.05, fontFace: F.title, fontSize: 46, bold: true,
    color: C.deep, margin: 0,
  });
  s.addText(summary, {
    x: PAGE.MX, y: 5.55, w: 10.6, h: 1.45, fontFace: F.body, fontSize: 21,
    color: C.gray, margin: 0, lineSpacingMultiple: 1.35,
  });
  let cx = PAGE.MX, cy = 7.35;
  lessons.forEach((ls) => {
    const wch = Math.max(1.1, textW(ls, 15) + 0.52);
    if (cx + wch > 12.4) { cx = PAGE.MX; cy += 0.76; }
    chip(s, pres, { x: cx, y: cy, text: ls, w: wch, fill: C.card, size: 15, bold: false });
    cx += wch + 0.28;
  });
  if (file) imgCard(s, pres, { file, x: 12.55, y: 2.4, w: 6.35, caption });
  return s;
}

// —— 干净表格（fontSize ≥18）—————————————————————————
function cleanTable(slide, { x, y, w, rows, colW, fontSize = 18, rowH = 0.62, header = true, align = [] }) {
  const data = rows.map((r, ri) => r.map((cell, ci) => {
    const isH = header && ri === 0;
    const runs = Array.isArray(cell);
    const opt = {
      fontFace: !runs && /`/.test(cell) ? F.mono : F.body,
      fontSize,
      bold: isH,
      color: isH ? C.ink : C.gray,
      fill: { color: isH ? C.blue : ri % 2 === 0 ? C.white : "FBFCFD" },
      valign: "middle",
      margin: 0.09,
    };
    if (align[ci]) opt.align = align[ci];
    return { text: runs ? cell : cell.replace(/`/g, ""), options: opt };
  }));
  slide.addTable(data, {
    x, y, w, colW, rowH, border: { pt: 0.75, color: C.hair }, margin: 0.09,
  });
}

// —— 流程步骤链（横向）——————————————————————————————
// 定稿字号：编号 32、标题按卡宽分档(24/22/20，整行统一)、描述 18、箭头 20
const emW = (text) => { let u = 0; for (const ch of text) u += ch.charCodeAt(0) > 0x2e7f ? 1 : 0.55; return u; };
function flowSteps(slide, pres, { x, y, w, steps, stepH = 1.5, gap = 0.34 }) {
  const n = steps.length;
  const cw = (w - gap * (n - 1)) / n;
  const tw = cw - 0.3;
  const fit = (t) => { for (const s of [24, 22, 20]) if (emW(t) * s / 72 <= tw - 0.05) return s; return 20; };
  const tSize = Math.max(20, Math.min(...steps.map((st) => fit(st.t))));
  steps.forEach((st, i) => {
    const sx = x + i * (cw + gap);
    const hasD = !!st.d;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: sx, y, w: cw, h: stepH, rectRadius: 0.08,
      fill: { color: C.card }, shadow: sh(),
    });
    slide.addText(String(i + 1).padStart(2, "0"), {
      x: sx + 0.16, y: y + 0.1, w: tw, h: 0.52, fontFace: F.disp, fontSize: 32,
      color: i === n - 1 ? C.yellow : "F5B98A", margin: 0,
    });
    const tLines = Math.max(1, Math.ceil((emW(st.t) * tSize / 72) / (tw - 0.05)));
    const tH = hasD ? tLines * tSize / 72 * 1.18 + 0.02 : 0.52;
    slide.addText(st.t, {
      x: sx + 0.16, y: y + (hasD ? 0.66 : 0.68), w: tw, h: tH, fontFace: F.title, fontSize: tSize,
      bold: true, color: C.ink, margin: 0, lineSpacingMultiple: 1.05,
    });
    if (st.d) {
      const dY = Math.max(1.18, 0.66 + tH + 0.06);
      slide.addText(st.d, {
        x: sx + 0.16, y: y + dY, w: tw, h: Math.max(0.3, Math.min(stepH - 1.28, stepH - 0.02 - dY)),
        fontFace: F.body, fontSize: 18, color: C.gray, margin: 0, lineSpacingMultiple: 1.15, valign: "top",
      });
    }
    if (i < n - 1) slide.addText("→", {
      x: sx + cw - 0.06, y: y + stepH / 2 - 0.24, w: gap + 0.16, h: 0.4, align: "center",
      fontFace: F.title, fontSize: 20, bold: true, color: C.faint, margin: 0,
    });
  });
}

// —— 常见困惑 Q&A 行 ——————————————————————————————
// 定稿字号：问 32 粗、答 28；答案框按行数自动加高
function qaRow(slide, pres, { x, y, q, a, w = 17.7, aRuns }) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w: 0.62, h: 0.62, rectRadius: 0.31, fill: { color: C.blue } },
  );
  slide.addText("?", {
    x, y, w: 0.62, h: 0.62, align: "center", valign: "middle",
    fontFace: F.disp, fontSize: 20, color: C.ink, margin: 0,
  });
  slide.addText(q, {
    x: x + 0.95, y: y - 0.02, w: w - 1.05, h: 0.5, fontFace: F.title, fontSize: 32,
    bold: true, color: C.ink, margin: 0,
  });
  const aText = aRuns ? aRuns.map((r) => (typeof r === "string" ? r : r.text)).join("") : a;
  const aLines = Math.max(1, Math.ceil((emW(aText) * 28 / 72) / (w - 1.15)));
  slide.addText(aRuns || a, {
    x: x + 0.95, y: y + 0.5, w: w - 1.05, h: Math.max(1.0, aLines * 28 / 72 * 1.25 + 0.06), fontFace: F.body, fontSize: 28,
    color: C.gray, margin: 0, lineSpacingMultiple: 1.2, valign: "top",
  });
}

// —— 水彩高光笔：关键词浅黄高亮 run ————————————————————
const HL_C = "FFF3B0"; // 柔和浅黄（水彩感）
const hl = (t) => ({ text: t, options: { highlight: HL_C } });
const tx = (t, o) => ({ text: t, options: o || {} });

// —— 图元：盒子 / 菱形 / 箭头 ————————————————————————
function flowBox(slide, pres, { x, y, w, h, title, sub, fill, line, tColor, sColor, tSize = 22, sSize = 18, radius = 0.1, bold = true }) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: radius,
    fill: { color: fill || C.card }, line: line || { color: C.hair, width: 1 }, shadow: sh(),
  });
  if (sub) {
    slide.addText([
      { text: title, options: { fontFace: F.title, fontSize: tSize, bold, color: tColor || C.ink, breakLine: true } },
      { text: sub, options: { fontFace: F.body, fontSize: sSize, color: sColor || C.gray } },
    ], { x: x + 0.14, y, w: w - 0.28, h, valign: "middle", margin: 0, lineSpacingMultiple: 1.12 });
  } else {
    slide.addText(title, {
      x: x + 0.12, y, w: w - 0.24, h, valign: "middle", align: "center",
      fontFace: F.title, fontSize: tSize, bold, color: tColor || C.ink, margin: 0,
    });
  }
}
function flowDiamond(slide, pres, { x, y, w, h, text, fill = C.blue, tSize = 18 }) {
  slide.addShape(pres.shapes.DIAMOND, { x, y, w, h, fill: { color: fill }, line: { color: C.white, width: 1.5 }, shadow: sh() });
  slide.addText(text, {
    x: x + w * 0.13, y, w: w * 0.74, h, align: "center", valign: "middle",
    fontFace: F.title, fontSize: tSize, bold: true, color: C.ink, margin: 0, lineSpacingMultiple: 1.05,
  });
}
function arrow(slide, pres, { x, y, w, h = 0, dir = "r", color, width = 2 }) {
  if (dir === "l") { slide.addShape(pres.shapes.LINE, { x: x + w, y, w, h, line: { color: color || C.yellow, width, beginArrowType: "triangle" } }); return; }
  if (dir === "d") { slide.addShape(pres.shapes.LINE, { x, y, w: 0, h, line: { color: color || C.yellow, width, endArrowType: "triangle" } }); return; }
  slide.addShape(pres.shapes.LINE, { x, y, w, h, line: { color: color || C.yellow, width, endArrowType: "triangle" } });
}

// —— 图元：chevron 流水线（一行 N 段，箭头形拼接）———————————
function chevronRow(slide, pres, { x, y, w, stepH = 1.05, items, gap = 0.1, fill, lastFill, tSize = 20, dSize = 17, descs = true }) {
  const n = items.length;
  const cw = (w - gap * (n - 1)) / n;
  items.forEach((it, i) => {
    const sx = x + i * (cw + gap);
    const shape = i === 0 ? pres.shapes.PENTAGON : pres.shapes.CHEVRON;
    slide.addShape(shape, {
      x: sx, y, w: cw, h: stepH,
      fill: { color: i === n - 1 ? (lastFill || C.yellow) : (fill || C.blue) },
      line: { color: C.white, width: 1.5 },
    });
    const inset = i === 0 ? 0.12 : 0.3; // chevron 左侧咬边让字居中
    slide.addText(`${it.n ? it.n + "  " : ""}${it.t}`, {
      x: sx + inset, y, w: cw - inset - 0.18, h: stepH, align: "center", valign: "middle",
      fontFace: F.title, fontSize: tSize, bold: true, color: C.ink, margin: 0,
    });
    if (descs && it.d) {
      slide.addText(it.d, {
        x: sx + 0.12, y: y + stepH + 0.1, w: cw - 0.24, h: 0.9,
        fontFace: F.body, fontSize: dSize, color: C.gray, margin: 0, lineSpacingMultiple: 1.15, valign: "top",
      });
    }
  });
}

// —— 图元：梯子（分级，顶层最窄）————————————————————
function ladderLevels(slide, pres, { x, y, w, h, levels, gap = 0.14, labelW = 3.6 }) {
  const n = levels.length;
  const rh = (h - gap * (n - 1)) / n;
  const wMin = w * 0.5;
  levels.forEach((lv, i) => {
    const lw = wMin + (w - wMin) * (i / (n - 1));
    const ly = y + i * (rh + gap);
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x + (w - lw) / 2, y: ly, w: lw, h: rh, rectRadius: 0.09,
      fill: { color: lv.color }, line: { color: C.white, width: 1.5 }, shadow: sh(),
    });
    slide.addText(lv.tag, {
      x: x + (w - lw) / 2, y: ly, w: lw, h: rh, align: "center", valign: "middle",
      fontFace: F.title, fontSize: 23, bold: true, color: lv.tColor || C.ink, margin: 0,
    });
    slide.addText(lv.body, {
      x: x + w + 0.35, y: ly, w: labelW, h: rh, valign: "middle",
      fontFace: F.body, fontSize: 18, color: C.gray, margin: 0, lineSpacingMultiple: 1.15,
    });
  });
}

// —— 图元：对比双卡（✓ / ✕）——————————————————————————
function contrastPair(slide, pres, { x, y, w, h = 3.2, gap = 0.5, good, bad }) {
  const cw = (w - gap) / 2;
  const card = (cx, mark, markColor, head, lines) => {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y, w: cw, h, rectRadius: 0.12, fill: { color: C.white }, line: { color: C.hair, width: 1.2 }, shadow: sh(),
    });
    slide.addShape(pres.shapes.OVAL, { x: cx + 0.3, y: y + 0.32, w: 0.56, h: 0.56, fill: { color: markColor } });
    slide.addText(mark, { x: cx + 0.3, y: y + 0.32, w: 0.56, h: 0.56, align: "center", valign: "middle", fontFace: F.disp, fontSize: 22, color: C.white, margin: 0 });
    slide.addText(head, {
      x: cx + 1.05, y: y + 0.36, w: cw - 1.3, h: 0.5, fontFace: F.title, fontSize: 24, bold: true, color: C.ink, margin: 0, valign: "middle",
    });
    slide.addText(lines, {
      x: cx + 0.32, y: y + 1.1, w: cw - 0.64, h: h - 1.4, fontFace: F.body, fontSize: 19,
      color: C.gray, margin: 0, lineSpacingMultiple: 1.3, valign: "top",
    });
  };
  card(x, "✓", "3E9B4F", good.head, good.lines);
  card(x + cw + gap, "✕", "C9421B", bad.head, bad.lines);
}

// —— 图元：角色节点（头像圈 + 频次 + 任务卡）———————————
function roleNode(slide, pres, { x, y, w, who, tasks, headFill = C.blue, freq }) {
  slide.addShape(pres.shapes.OVAL, { x: x + w / 2 - 0.42, y, w: 0.84, h: 0.84, fill: { color: headFill }, shadow: sh() });
  slide.addText(who.glyph, { x: x + w / 2 - 0.42, y, w: 0.84, h: 0.84, align: "center", valign: "middle", fontFace: F.disp, fontSize: 26, color: C.white, margin: 0 });
  slide.addText(who.name, {
    x, y: y + 0.94, w, h: 0.4, align: "center", fontFace: F.title, fontSize: 22, bold: true, color: C.ink, margin: 0,
  });
  if (freq) slide.addText(freq, {
    x, y: y + 1.38, w, h: 0.34, align: "center", fontFace: F.mono, fontSize: 14, color: C.yellow, margin: 0, charSpacing: 1,
  });
  let ty = y + (freq ? 1.85 : 1.5);
  tasks.forEach((t) => {
    const th = 0.62 + (emW(t) * 19 / 72 > w - 0.6 ? 0.55 : 0);
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x + 0.18, y: ty, w: w - 0.36, h: th, rectRadius: 0.08, fill: { color: C.card }, line: { color: C.hair, width: 1 },
    });
    slide.addText(t, {
      x: x + 0.36, y: ty, w: w - 0.72, h: th, valign: "middle", fontFace: F.body, fontSize: 19,
      color: C.gray, margin: 0, lineSpacingMultiple: 1.12,
    });
    ty += th + 0.18;
  });
}

module.exports = { C, F, PAGE, sh, furniture, kicker, title, numberRow, chip, termCard, imgCard, noteBar, summarySlide, chapterCover, cleanTable, flowSteps, qaRow, emW, hl, tx, flowBox, flowDiamond, arrow, chevronRow, ladderLevels, contrastPair, roleNode };
