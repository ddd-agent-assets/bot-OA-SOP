// 05-组织SOP提议（图形优先版）
const D = require("./design");
const { hl, tx } = D;
const BRAND = "WECOM-BOT SOP · 提议";

module.exports = function build(pres) {
  let pg = 0; const T = 9;

  D.chapterCover(pres, {
    page: ++pg, total: T, num: "05", titleCn: "组织SOP提议：地板之上我们定什么", titleEn: "PROPOSAL",
    summary: "状态：提议，待讨论。企微强制的必要流程是地板；本篇是地板之上我们自己设计的管理动作——是否采纳，由管理层拍板。",
    lessons: ["总原则", "数据分级", "七步流程", "审批防瓶颈", "职责分工", "业务侧bot管理员"],
    brand: BRAND,
  });

  // 2. 总原则（三卡）
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "5.1 · 总原则");
    D.title(s, "三条总原则：谁用谁申请，审批只走一次");
    const cards = [
      ["①", "谁要用谁申请\n谁申请谁搭建", [tx("提需求的人就是搭机器人的人（"), hl("业务自助"), tx("，DDD 客服已跑通）。")]],
      ["②", "审批只走一次", [tx("上线前审一次，日常使用"), hl("不逐次审批"), tx("（配合“第一次制”）。")]],
      ["③", "管理不拦路", [hl("高频场景模板化免审"), tx("、"), hl("审批限时"), tx("，管理动作服务业务不卡业务。")]],
    ];
    cards.forEach(([num, name, lines], i) => {
      const cx = D.PAGE.MX + i * 6.05, cw = 5.65, cy = 3.4, chh = 3.9;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: cx, y: cy, w: cw, h: chh, rectRadius: 0.12, fill: { color: D.C.card }, shadow: D.sh(),
      });
      s.addText(num, { x: cx + 0.35, y: cy + 0.25, w: 1.4, h: 1.0, fontFace: D.F.disp, fontSize: 54, color: D.C.yellow, margin: 0 });
      s.addText(name, { x: cx + 0.35, y: cy + 1.45, w: cw - 0.7, h: 1.05, fontFace: D.F.title, fontSize: 24, bold: true, color: D.C.ink, margin: 0, lineSpacingMultiple: 1.15 });
      s.addText(lines, { x: cx + 0.35, y: cy + 2.6, w: cw - 0.7, h: 1.1, fontFace: D.F.body, fontSize: 19, color: D.C.gray, margin: 0, lineSpacingMultiple: 1.3 });
    });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 7.9, w: 17.76, h: 0.95, kind: "note",
      runs: [tx("本篇是"), hl("提议，待讨论"), tx("——地板（企微强制流程）见第 2 章；采纳与否由"), hl("管理层拍板"), tx("。")],
    });
  }

  // 3. 数据分级（梯子图）
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "5.2 · 数据分级");
    D.title(s, "什么数据机器人可以碰：四级分级");
    D.ladderLevels(s, pres, {
      x: D.PAGE.MX + 0.3, y: 3.35, w: 11.2, h: 5.3, labelW: 5.4,
      levels: [
        { tag: "绝 密", color: "9A3412", tColor: "FFFFFF", body: [tx("人事薪酬 · 涉密与两用物项\n"), hl("一律禁止"), tx(" · 例外需高层批")] },
        { tag: "敏 感", color: "E8590C", tColor: "FFFFFF", body: [tx("客户资料 · 账单 · 风控\n读："), hl("逐个场景评估"), tx(" 写：不能 · OD+数据负责人双批")] },
        { tag: "日常业务", color: "FDBA74", body: [tx("询盘 · 异常台账 · 船期表\n读："), hl("授权+发链接"), tx(" 写：新数据进新表 · 场景单审批")] },
        { tag: "公 开", color: "FFE9D2", body: [tx("群公告 · 日历 · 通知类表格\n读：授权后能 写："), hl("只写自建表"), tx(" · 不用专门批")] },
      ],
    });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 9.0, w: 17.76, h: 0.85, kind: "note",
      runs: [tx("分级是"), hl("业务判断"), tx("：“这个场景能不能用这份数据”归业务，IT 只做技术操作。")],
    });
  }

  // 4. 七步流程（两行 chevron）
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "5.3 · 七步");
    D.title(s, "场景从申请到上线，七步");
    D.chevronRow(s, pres, {
      x: D.PAGE.MX, y: 3.3, w: 17.76, stepH: 1.0, tSize: 19, descs: false,
      items: [
        { n: "1", t: "填场景申请单" }, { n: "2", t: "分流" }, { n: "3", t: "建号发布" }, { n: "4", t: "扫码授权" },
      ],
    });
    D.chevronRow(s, pres, {
      x: D.PAGE.MX + 2.2, y: 4.55, w: 15.56, stepH: 1.0, tSize: 19, descs: false,
      items: [
        { n: "5", t: "定数据放哪" }, { n: "6", t: "上线检查" }, { n: "7", t: "登记台账" },
      ],
    });
    const notes = [
      ["1 申请单", [tx("做什么 · 在哪个群用 · "), hl("动哪些表 · 读还是写")]],
      ["2 分流", [hl("平台红线 → 技术方案"), tx("；内部规则 → 审批")]],
      ["3 建号发布", [tx("IT 管理员创建或复用；发布自带"), hl("两轮审批")]],
      ["4 扫码授权", [tx("本人扫码；企业模式"), hl("补发一次文档链接")]],
      ["5 定数据", [hl("新数据进新表"), tx("，旧表只读挂索引")]],
      ["6 上线检查", [hl("清单逐项打勾"), tx("（见第 3 章）")]],
      ["7 登记台账", [tx("负责人 · 机器人 · 授权人 · "), hl("表清单 · 交接人")]],
    ];
    notes.forEach(([name, runs], i) => {
      const cx = D.PAGE.MX + (i % 4) * 4.51, cy = 5.95 + Math.floor(i / 4) * 1.35, cw = 4.21;
      D.chip(s, pres, { x: cx, y: cy, text: name, w: 1.9, fill: D.C.blue, size: 14 });
      s.addText(runs, {
        x: cx + 2.0, y: cy - 0.04, w: cw - 2.0, h: 1.25, fontFace: D.F.body, fontSize: 16.5, color: D.C.gray, margin: 0, lineSpacingMultiple: 1.12, valign: "top",
      });
    });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 8.85, w: 17.76, h: 0.95, kind: "blue",
      runs: [tx("发布审批两规矩："), hl("审批人选直属上级"), tx("（系统不带出）；申请原因"), hl("三要素"), tx("（场景 · 表 · 读/写）。")],
    });
  }

  // 5. 防瓶颈（三卡 + 漏斗示意）
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "5.4 · 防瓶颈");
    D.title(s, "别让审批变瓶颈：三个办法");
    const cards = [
      ["模板化", [hl("高频场景预审成模板"), tx("：信息搬运、定时汇总、群内问答——"), hl("模板内免逐个审"), tx("，只审特殊的。")]],
      ["限时", [tx("审批限时 "), hl("2 个工作日"), tx("，超时视为同意（限"), hl("公开信息、日常业务"), tx("两类低风险场景）。")]],
      ["业务侧bot管理员", [tx("日常开权限交给"), hl("专人"), tx("，不都堵在 IT——"), hl("正式提议见 5.6"), tx("。")]],
    ];
    cards.forEach(([name, lines], i) => {
      const cx = D.PAGE.MX + i * 6.05, cw = 5.65, cy = 3.4, chh = 3.3;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: cx, y: cy, w: cw, h: chh, rectRadius: 0.12, fill: { color: D.C.white }, line: { color: D.C.hair, width: 1.2 }, shadow: D.sh(),
      });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx + 0.35, y: cy + 0.35, w: 2.6, h: 0.62, rectRadius: 0.31, fill: { color: D.C.blue } });
      s.addText(name, { x: cx + 0.35, y: cy + 0.35, w: 2.6, h: 0.62, align: "center", valign: "middle", fontFace: D.F.title, fontSize: 20, bold: true, color: D.C.ink, margin: 0 });
      s.addText(lines, { x: cx + 0.38, y: cy + 1.25, w: cw - 0.76, h: 1.9, fontFace: D.F.body, fontSize: 19, color: D.C.gray, margin: 0, lineSpacingMultiple: 1.3 });
    });
    // 三重瓶颈漏斗示意
    const fy = 7.3;
    ["人人都想搭机器人", "平台权限集中少数管理员", "组织审批叠加"].forEach((t, i) => {
      s.addText(t, {
        x: D.PAGE.MX + 0.2 + i * 0.55, y: fy + i * 0.62, w: 8.2 - i * 0.55, h: 0.5, fontFace: D.F.body, fontSize: 18, color: D.C.gray, margin: 0, align: "center",
      });
      if (i < 2) D.arrow(s, pres, { x: D.PAGE.MX + 4.3, y: fy + i * 0.62 + 0.5, w: 0, h: 0.12, dir: "d", color: D.C.faint, width: 1.5 });
    });
    s.addText([tx("三重瓶颈"), tx("  →  ", { color: D.C.yellow, bold: true }), tx("三个办法拆掉它")], {
      x: D.PAGE.MX + 9.6, y: fy + 0.55, w: 8.0, h: 0.9, fontFace: D.F.title, fontSize: 22, bold: true, color: D.C.ink, margin: 0, valign: "middle",
    });
  }

  // 6. 职责表
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "5.5 · 分工");
    D.title(s, "谁负责什么：职责分工表");
    D.cleanTable(s, {
      x: D.PAGE.MX, y: 3.15, w: 17.76, colW: [5.4, 4.2, 3.0, 5.16], rowH: 0.6, fontSize: 18,
      rows: [
        ["事项", "业务同事", "IT / OD", "数据负责人"],
        [[hl("提需求、搭机器人")], "牵头", "知悉", "配合"],
        ["建机器人、开权限", "知悉", [hl("IT 牵头")], "—"],
        [[hl("扫码授权、发链接")], [hl("本人做")], "—", "配合"],
        ["定数据能不能给机器人", "配合", [hl("OD 牵头")], [hl("把关")]],
        ["场景审批", "—", [hl("OD 牵头")], "配合"],
        ["台账登记与交接", [hl("做")], "OD 督促", "—"],
        ["额度申请与充值", "申请", [hl("OD 管额度池")], "—"],
      ],
    });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 8.15, w: 17.76, h: 0.95, kind: "note",
      runs: [tx("人走了怎么办：交接四步 "), hl("停写 → 验证 → 授权 → 收权"), tx(" 见第 4 章；"), hl("没台账就没有交接"), tx("。")],
    });
  }

  // 7. bot管理员（组织对比图）
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "5.6 · 核心提议");
    D.title(s, "核心提议：设立业务侧bot管理员");
    // 左：现状（漏斗）
    const lx = D.PAGE.MX, lw = 8.1;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: lx, y: 3.25, w: lw, h: 3.4, rectRadius: 0.12, fill: { color: D.C.card }, shadow: D.sh() });
    s.addText("现状：都堵在 IT", { x: lx + 0.3, y: 3.4, w: lw - 0.6, h: 0.5, fontFace: D.F.title, fontSize: 22, bold: true, color: D.C.gray, margin: 0 });
    ["业务 A", "业务 B", "业务 C"].forEach((t, i) => {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: lx + 0.4, y: 4.05 + i * 0.78, w: 2.4, h: 0.6, rectRadius: 0.08, fill: { color: D.C.white }, line: { color: D.C.hair, width: 1 } });
      s.addText(t, { x: lx + 0.4, y: 4.05 + i * 0.78, w: 2.4, h: 0.6, align: "center", valign: "middle", fontFace: D.F.body, fontSize: 18, color: D.C.gray, margin: 0 });
      D.arrow(s, pres, { x: lx + 2.9, y: 4.35 + i * 0.78, w: 1.7, color: D.C.faint, width: 1.5 });
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: lx + 4.7, y: 4.45, w: 3.0, h: 1.55, rectRadius: 0.1, fill: { color: "F5C6AA" } });
    s.addText([tx("DIC IT\n", { bold: true, fontSize: 20 }), tx("超级管理员就几个人", { fontSize: 16 })], {
      x: lx + 4.7, y: 4.45, w: 3.0, h: 1.55, align: "center", valign: "middle", fontFace: D.F.title, color: D.C.ink, margin: 0,
    });
    s.addText([tx("审批需求正从偶发工单 → "), hl("常态业务流程")], {
      x: lx + 0.35, y: 5.95, w: lw - 0.7, h: 0.55, fontFace: D.F.body, fontSize: 18, color: D.C.gray, margin: 0,
    });
    // 右：提议（分流）
    const rx = D.PAGE.MX + 8.6, rw = 9.16;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx, y: 3.25, w: rw, h: 3.4, rectRadius: 0.12, fill: { color: D.C.bluePanel }, line: { color: D.C.yellow, width: 1.5 }, shadow: D.sh() });
    s.addText("提议：业务侧分流", { x: rx + 0.3, y: 3.4, w: rw - 0.6, h: 0.5, fontFace: D.F.title, fontSize: 22, bold: true, color: D.C.ink, margin: 0 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx + 0.4, y: 4.15, w: 3.9, h: 1.5, rectRadius: 0.1, fill: { color: D.C.yellow } });
    s.addText([tx("业务侧 bot 管理员\n", { bold: true, fontSize: 19, color: D.C.white }), tx("1-2 人 · 专用超管账号", { fontSize: 16, color: D.C.white })], {
      x: rx + 0.4, y: 4.15, w: 3.9, h: 1.5, align: "center", valign: "middle", fontFace: D.F.title, margin: 0,
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx + 4.8, y: 4.15, w: 3.9, h: 1.5, rectRadius: 0.1, fill: { color: D.C.white }, line: { color: D.C.hair, width: 1 } });
    s.addText([tx("DIC IT\n", { bold: true, fontSize: 19 }), tx("保留系统级变更", { fontSize: 16 })], {
      x: rx + 4.8, y: 4.15, w: 3.9, h: 1.5, align: "center", valign: "middle", fontFace: D.F.title, color: D.C.gray, margin: 0,
    });
    D.arrow(s, pres, { x: rx + 4.35, y: 4.9, w: 0.4, color: D.C.faint, width: 1.5 });
    s.addText([tx("职责：创建审批 · 权限开启 · 范围设置 · "), hl("操作留痕")], {
      x: rx + 0.35, y: 5.95, w: rw - 0.7, h: 0.55, fontFace: D.F.body, fontSize: 18, color: D.C.gray, margin: 0,
    });
    const whys = [["时效", "不排 IT 工单队"], ["专业", "业务判断归业务"], ["留痕", "专人专号可审计"], ["减负", "IT 回归运维本职"]];
    whys.forEach(([w, d], i) => {
      const cx = D.PAGE.MX + i * 4.51;
      D.chip(s, pres, { x: cx, y: 7.05, text: w, w: 1.5, fill: D.C.blue, size: 16 });
      s.addText(d, { x: cx + 1.62, y: 7.05, w: 2.7, h: 0.5, fontFace: D.F.body, fontSize: 17, color: D.C.gray, margin: 0, valign: "middle" });
    });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 7.95, w: 17.76, h: 1.35, kind: "warn",
      runs: [tx("⚠ 风险与对策：", { bold: true }), hl("超管权限下放"), tx(" → 专用账号、审批单留痕、定期审计；"), hl("不懂技术边界"), tx(" → 授权三步 + 红线清单当审批手册，IT 带教；"), hl("权责不清"), tx(" → 与 DIC IT 书面划分。")],
    });
  }

  // 8. 待拍板
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "5.7 · 待拍板");
    D.title(s, "需要管理层拍板的决策点");
    const items = [
      ["与 DIC IT 的边界书面化", "结论写回第五节职责表"],
      ["数据分级表是否采纳", "四级分级 · 谁批谁把关"],
      ["业务侧bot管理员人选", "1-2 人 · 专用超管账号"],
    ];
    items.forEach(([t, d], i) => {
      const y = 3.35 + i * 1.25;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: D.PAGE.MX, y, w: 17.76, h: 1.0, rectRadius: 0.1, fill: { color: D.C.card }, line: { color: D.C.yellow, width: 1.2 },
      });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: D.PAGE.MX + 0.25, y: y + 0.28, w: 0.44, h: 0.44, rectRadius: 0.06, fill: { color: D.C.white }, line: { color: D.C.yellow, width: 1.4 } });
      s.addText([hl(t)], { x: D.PAGE.MX + 1.0, y, w: 10.5, h: 1.0, fontFace: D.F.title, fontSize: 22, bold: true, color: D.C.ink, margin: 0, valign: "middle" });
      s.addText(d, { x: D.PAGE.MX + 11.6, y, w: 5.9, h: 1.0, fontFace: D.F.body, fontSize: 17, color: D.C.gray, margin: 0, valign: "middle", align: "right" });
    });
    D.qaRow(s, pres, {
      x: D.PAGE.MX, y: 7.5, w: 16.8,
      q: "这套提议和平台规矩是什么关系？",
      aRuns: [tx("平台四步 + 六做法是"), hl("地板，没有商量"), tx("；本篇是"), hl("地板之上的管理设计"), tx("——数据分级、审批限时、业务侧bot管理员，均可调整或否决。")],
    });
  }

  D.summarySlide(pres, {
    page: ++pg, total: T, brand: BRAND,
    statement: "地板（平台强制）照办，天花板（管理设计）我们定。",
    sub: [
      hl("谁用谁申请 · 审批只走一次 · 管理不拦路"), tx("；\n数据四级分级决定机器人能碰什么；七步流程走完上线登记；"), hl("业务侧bot管理员"), tx("让审批回归业务。"),
    ],
    chipText: "第 5 章 · 提议（待管理层拍板）",
  });
};
