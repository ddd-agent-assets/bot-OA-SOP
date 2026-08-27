// 组件用法速览 / 冒烟测试：node example.js → 输出 example.pptx
// 覆盖全部组件各一次，字号几何均为定稿基准；写新课件照此模式调用 design.js
const pptxgen = require("pptxgenjs");
const path = require("path");
const D = require("./design");

const pres = new pptxgen();
pres.defineLayout({ name: "W20", width: 20, height: 11.25 });
pres.layout = "W20";
pres.author = "Rosetta";
pres.title = "rosetta-handout 组件示例";
let pg = 0;
const T = 6;

// —— 章节封面（配图可选；无素材也能跑）——
D.chapterCover(pres, {
  page: ++pg, total: T, num: "01", titleCn: "第一章 · 示例", titleEn: "EXAMPLE",
  summary: "一段两三行的章节导语：说场景、说人话，不堆术语。",
  lessons: ["是什么", "怎么准备", "怎么用", "常见困惑"],
});

// —— numberRow + 终端卡 ——
{
  const s = pres.addSlide();
  s.background = { color: D.C.white };
  D.furniture(s, pres, { page: ++pg, total: T });
  D.kicker(s, "1.1 · NUMBER ROW + TERM");
  D.title(s, "大编号行与终端指令卡");
  D.numberRow(s, pres, { x: D.PAGE.MX, y: 3.3, num: "01", label: "概念标题 23pt", body: "正文 21pt：一句话说清这个概念，读者是非工程师。", w: 16.8 });
  D.numberRow(s, pres, { x: D.PAGE.MX, y: 4.85, num: "02", label: "第二个要点", body: "每页一个重点，字号宁大勿小。", w: 16.8 });
  D.termCard(s, pres, {
    x: D.PAGE.MX, y: 6.6, w: 17.76, h: 1.9, name: "one-liner",
    lines: [{ c: "帮我做一件事", note: "命令由 AI 代劳" }],
  });
}

// —— 步骤链（标题按卡宽自动分档）+ 蓝色提示条 ——
{
  const s = pres.addSlide();
  s.background = { color: D.C.white };
  D.furniture(s, pres, { page: ++pg, total: T });
  D.kicker(s, "1.2 · FLOW STEPS");
  D.title(s, "流程步骤链");
  D.flowSteps(s, pres, {
    x: D.PAGE.MX, y: 3.7, w: 17.76, stepH: 2.2,
    steps: [
      { t: "第一步", d: "描述 18pt" },
      { t: "第二步", d: "同排标题统一字号" },
      { t: "第三步", d: "放不下自动折行" },
    ],
  });
  D.noteBar(s, pres, {
    x: D.PAGE.MX, y: 6.55, w: 17.76, h: 1.15, kind: "blue",
    runs: [{ text: "提示条：", options: { bold: true } }, { text: "正文 20pt，每页至多一处黄色强调。" }],
  });
}

// —— 表格 + 胶囊 ——
{
  const s = pres.addSlide();
  s.background = { color: D.C.white };
  D.furniture(s, pres, { page: ++pg, total: T });
  D.kicker(s, "1.3 · TABLE + CHIP");
  D.title(s, "干净表格与胶囊标签");
  D.cleanTable(s, {
    x: D.PAGE.MX, y: 3.3, w: 17.76, colW: [4, 13.76], rowH: 0.86, fontSize: 18,
    rows: [["列头", "说明"], ["`git 术语`", "表格 ≥18pt，含反引号的单元格自动用等宽体"]],
  });
  D.chip(s, pres, { x: D.PAGE.MX, y: 6.6, text: "胶囊 15pt", fill: D.C.blue });
}

// —— QA 行（问 32 / 答 28）——
{
  const s = pres.addSlide();
  s.background = { color: D.C.white };
  D.furniture(s, pres, { page: ++pg, total: T });
  D.kicker(s, "1.4 · Q&A");
  D.title(s, "常见困惑");
  D.qaRow(s, pres, {
    x: D.PAGE.MX, y: 3.5, w: 16.8,
    q: "问句 32pt 粗，一行说完整？",
    a: "答 28pt：正文灰，按行数自动加高答案框；一问一答，收尾节奏固定。",
  });
  D.qaRow(s, pres, {
    x: D.PAGE.MX, y: 5.15, w: 16.8,
    q: "第二问",
    a: "每篇教材以「常见困惑 + 一句话总结」收尾。",
  });
}

// —— 一句话总结页 ——
D.summarySlide(pres, {
  page: ++pg, total: T,
  statement: "一句话总结 32pt 粗：图先抓注意力，字补细节，重复即校验。",
  sub: "副文 21pt：给非工程师的课件，字要大、图要大、一页一个重点。",
  chipText: "定稿后转 png 进教材",
});

pres.writeFile({ fileName: path.join(__dirname, "example.pptx") }).then(() => console.log("built: example.pptx"));
