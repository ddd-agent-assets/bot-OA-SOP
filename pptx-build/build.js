// 构建入口模板：登记内容模块 → node build.js 输出 pptx 到 ../slides（或 SLIDES_OUT 指定目录）
// 同步验证：SLIDES_OUT=/tmp/out node build.js 重建到临时目录，与手改成品逐 run 比对字号/几何
const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

const OUT = process.env.SLIDES_OUT
  ? path.resolve(process.env.SLIDES_OUT)
  : path.resolve(__dirname, "..", "slides");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// TODO: 每个课件一个内容模块（参照 example.js 的写法）
const decks = [
  { file: "0-总览.pptx", title: "企微智能机器人 SOP · 总览", build: require("./d0") },
  { file: "1-创建.pptx", title: "企微智能机器人 SOP · 创建", build: require("./d1") },
  { file: "2-提审.pptx", title: "企微智能机器人 SOP · 提审", build: require("./d2") },
  { file: "3-登记.pptx", title: "企微智能机器人 SOP · 登记", build: require("./d3") },
  { file: "4-维护.pptx", title: "企微智能机器人 SOP · 维护", build: require("./d4") },
  { file: "5-组织SOP提议.pptx", title: "企微智能机器人 SOP · 提议", build: require("./d5") },
];

(async () => {
  for (const d of decks) {
    const pres = new pptxgen();
    pres.defineLayout({ name: "W20", width: 20, height: 11.25 });
    pres.layout = "W20";
    pres.author = "Rosetta";
    pres.title = d.title;
    d.build(pres);
    await pres.writeFile({ fileName: path.join(OUT, d.file) });
    console.log("built:", d.file);
  }
  if (!decks.length) console.log("(no decks registered — see example.js)");
})();
