// 04-维护（图形优先版）
const D = require("./design");
const { hl, tx } = D;
const BRAND = "WECOM-BOT SOP · 维护";

module.exports = function build(pres) {
  let pg = 0; const T = 6;

  D.chapterCover(pres, {
    page: ++pg, total: T, num: "04", titleCn: "维护：自查、量限、交接", titleEn: "MAINTAIN",
    summary: "报“无权限”先按四步自查，大多数情况不用惊动 IT；两条量限提前知道；调岗离职按四步交接。",
    lessons: ["无权限自查", "两条量限", "调岗离职交接"],
    brand: BRAND,
  });

  // 2. 自查决策树
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "4.1 · 自查");
    D.title(s, "报“无权限”先自查：四步排查，别直接报 IT");
    const cx = 5.4, dw = 4.6, dh = 1.5, bw = 3.4, bh = 0.85, step = 1.85;
    // 起点
    D.flowBox(s, pres, { x: D.PAGE.MX, y: 3.5, w: 2.9, h: 1.1, title: "报“无权限”", fill: D.C.card });
    D.arrow(s, pres, { x: D.PAGE.MX + 3.0, y: 4.05, w: 0.5 });
    const dia = [
      "扫码授权做了吗？（第二步 · 本人扫）",
      "文档链接发过了吗？（第三步 · 大企业必做）",
      "权限开关都开了吗？（创建者点“去开通”）",
    ];
    dia.forEach((t, i) => {
      const y = 3.3 + i * step;
      D.flowDiamond(s, pres, { x: cx, y, w: dw, h: dh, text: t, tSize: 17 });
      D.arrow(s, pres, { x: cx + dw / 2, y: y + dh, w: 0, h: step - dh + 0.02, dir: "d" });
      // 否 → 右侧动作
      D.arrow(s, pres, { x: cx + dw, y: y + dh / 2, w: 0.55, color: D.C.faint, width: 1.5 });
      D.flowBox(s, pres, { x: cx + dw + 0.65, y: y + 0.32, w: 3.3, h: 0.85, title: i === 2 ? "找创建者点开通" : "先去做这一步", fill: D.C.blue, tSize: 18 });
      s.addText("没有", { x: cx + dw + 0.02, y: y + dh / 2 - 0.42, w: 0.6, h: 0.3, fontFace: D.F.mono, fontSize: 13, color: D.C.faint, margin: 0 });
      s.addText("做了", { x: cx + dw / 2 + 0.12, y: y + dh + 0.02, w: 0.7, h: 0.3, fontFace: D.F.mono, fontSize: 13, color: D.C.faint, margin: 0 });
    });
    // 四步全对 → 两种可能
    D.flowBox(s, pres, { x: cx, y: 3.3 + 3 * step, w: dw, h: 1.0, title: "四步全对还报错 →", fill: D.C.yellow, tColor: D.C.white });
    D.arrow(s, pres, { x: cx + dw, y: 3.3 + 3 * step + 0.5, w: 0.55 });
    D.flowBox(s, pres, {
      x: cx + dw + 0.65, y: 3.3 + 3 * step - 0.75, w: 7.6, h: 1.1,
      title: "腾讯授权同步故障", sub: "2026-08 下旬出现，已反馈官方 · 重新扫码试“刷”通", fill: D.C.card, tSize: 20, sSize: 17,
    });
    D.flowBox(s, pres, {
      x: cx + dw + 0.65, y: 3.3 + 3 * step + 0.5, w: 7.6, h: 1.1,
      title: "授权可能只有 7 天（待核实）", sub: "官方文档与实测矛盾 · 重新扫码并记录时间反馈", fill: D.C.card, tSize: 20, sSize: 17,
    });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 9.6, w: 17.76, h: 0.75, kind: "blue",
      runs: [tx("都不是你操作错了。仍解决不了再报 IT，附上："), hl("哪台机器人 · 哪张表 · 四步结果")],
    });
  }

  // 3. QA
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "4.2 · 常见困惑");
    D.title(s, "四步全对还报无权限？");
    D.qaRow(s, pres, {
      x: D.PAGE.MX, y: 3.5, w: 16.8,
      q: "管理端显示“已授权”，还是报无权限？",
      aRuns: [hl("腾讯授权同步故障"), tx("（2026-08 下旬，已反馈官方）：先让当事人"), hl("重新扫码一次"), tx("偶尔能“刷”通；受影响的是“搜文档”“查通讯录”，"), hl("读指定文档不受影响"), tx("（发链接即可）。")],
    });
    D.qaRow(s, pres, {
      x: D.PAGE.MX, y: 6.3, w: 16.8,
      q: "用了几天突然报无权限？",
      aRuns: [tx("官方写"), hl("“授权有效期 7 天”"), tx("，与实测矛盾（待核实）。先"), hl("重新扫码授权"), tx("，记录发生时间反馈管理员。")],
    });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 8.7, w: 17.76, h: 0.9, kind: "blue",
      runs: [tx("仍解决不了再报 IT，报时附上："), hl("哪台机器人、哪张表、四步自查的结果"), tx("。")],
    });
  }

  // 4. 量限（大数字卡）
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "4.3 · 量限");
    D.title(s, "日常两条量限：读表有日上限，超大表要拆分");
    const cards = [
      ["每日", "读表总次数上限", [tx("超了当天"), hl("读写全停"), tx("，第二天自动恢复。日常询盘登记远够用；补大量历史数据，"), hl("分几天做"), tx("。")]],
      ["≈5万字", "单张超大表量级", [tx("曾出现"), hl("读到一半中断"), tx("（工具升级后已解决）；历史很久的大台账，仍建议"), hl("按年或季度拆分"), tx("。")]],
    ];
    cards.forEach(([big, name, lines], i) => {
      const cx = D.PAGE.MX + i * 9.13, cw = 8.63, cy = 3.35, chh = 4.2;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: cx, y: cy, w: cw, h: chh, rectRadius: 0.12, fill: { color: D.C.card }, shadow: D.sh(),
      });
      s.addText(big, { x: cx + 0.4, y: cy + 0.35, w: cw - 0.8, h: 1.3, fontFace: D.F.disp, fontSize: 64, color: D.C.yellow, margin: 0 });
      s.addText(name, { x: cx + 0.4, y: cy + 1.85, w: cw - 0.8, h: 0.55, fontFace: D.F.title, fontSize: 24, bold: true, color: D.C.ink, margin: 0 });
      s.addText(lines, { x: cx + 0.4, y: cy + 2.5, w: cw - 0.8, h: 1.5, fontFace: D.F.body, fontSize: 20, color: D.C.gray, margin: 0, lineSpacingMultiple: 1.3 });
    });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 8.0, w: 17.76, h: 0.9, kind: "note",
      runs: [tx("依据："), hl("`wecom-cli` Issue #116"), tx(" 等实测记录（见附录信源）。")],
    });
  }

  // 5. 交接（时间轴）
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "4.4 · 交接");
    D.title(s, "调岗离职交接：先停写、再验证、七天后收权");
    const nodes = [
      ["D0", "停写", "名下机器人、表格、脚本先停写（保留查看）"],
      ["D0+", "双人验证", "机器人能用吗 · 权限对吗 · 任务在跑吗 · 积分 · 仓库"],
      ["D1-6", "重新授权", "换负责人重新扫码 + 重发链接（权限不跟人走）"],
      ["D7", "收权", "台账更新后，收回原负责人权限"],
    ];
    const ty = 5.15, x0 = D.PAGE.MX + 0.4, xw = 17.0;
    s.addShape(pres.shapes.LINE, { x: x0, y: ty, w: xw, h: 0, line: { color: D.C.hair, width: 3 } });
    nodes.forEach(([day, name, desc], i) => {
      const cx = x0 + 0.65 + i * ((xw - 1.3) / 3);
      const above = i % 2 === 0;
      s.addShape(pres.shapes.OVAL, { x: cx - 0.28, y: ty - 0.28, w: 0.56, h: 0.56, fill: { color: i === 3 ? D.C.yellow : D.C.blue }, line: { color: C_white(), width: 2 } });
      s.addText(String(i + 1), { x: cx - 0.28, y: ty - 0.28, w: 0.56, h: 0.56, align: "center", valign: "middle", fontFace: D.F.disp, fontSize: 18, color: i === 3 ? D.C.white : D.C.ink, margin: 0 });
      const boxY = above ? ty - 2.35 : ty + 0.75;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: cx - 2.0, y: boxY, w: 4.0, h: 1.6, rectRadius: 0.1, fill: { color: D.C.card }, line: { color: D.C.hair, width: 1 }, shadow: D.sh(),
      });
      s.addText([tx(day + "  ", { fontFace: D.F.mono, color: D.C.yellow, bold: true }), tx(name, { bold: true, fontSize: 21, color: D.C.ink })], {
        x: cx - 1.8, y: boxY + 0.14, w: 3.6, h: 0.45, fontFace: D.F.title, fontSize: 20, margin: 0,
      });
      s.addText(desc, { x: cx - 1.8, y: boxY + 0.62, w: 3.6, h: 0.9, fontFace: D.F.body, fontSize: 17, color: D.C.gray, margin: 0, lineSpacingMultiple: 1.15 });
    });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 8.4, w: 17.76, h: 1.1, kind: "warn",
      runs: [tx("前提是"), hl("台账登记完整"), tx("。真实教训：DDD 同事调岗，"), hl("没台账就没有交接"), tx("，人一走机器人就成孤儿。")],
    });
  }

  D.summarySlide(pres, {
    page: ++pg, total: T, brand: BRAND,
    statement: "报错先自查四步，交接先停写再收权。",
    sub: [
      tx("大多数“无权限"), hl("不用惊动 IT"), tx("；量限提前知道不误事；\n交接四步 "), hl("停写 → 验证 → 授权 → 收权"), tx(" 保住人走资产不走。"),
    ],
    chipText: "第 4 章 · 维护",
  });
};

function C_white() { return "FFFFFF"; }
