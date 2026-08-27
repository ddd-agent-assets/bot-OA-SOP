// 02-提审（图形优先版）
const D = require("./design");
const { hl, tx } = D;
const BRAND = "WECOM-BOT SOP · 提审";

module.exports = function build(pres) {
  let pg = 0; const T = 9;

  D.chapterCover(pres, {
    page: ++pg, total: T, num: "02", titleCn: "提审：两轮审批 + 授权三步", titleEn: "REVIEW & AUTH",
    summary: "发布自带两轮审批；授权总共三步，走完长期有效。红线诉求别塞进审批——批了也没用。",
    lessons: ["两轮审批", "申请原因", "授权三步", "第一次制", "红线速查", "必须走的流程"],
    brand: BRAND,
  });

  // 2. 两轮审批（横向流程图）
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "2.1 · 发布审批");
    D.title(s, "发布先过两轮审批：上级 + 管理员");
    const bw = 3.6, bh = 1.7, gap = 0.55, y0 = 3.4;
    D.flowBox(s, pres, { x: D.PAGE.MX, y: y0 + 0.2, w: 2.9, h: 1.3, title: "提交发布", fill: D.C.card });
    D.arrow(s, pres, { x: D.PAGE.MX + 3.0, y: y0 + 0.85, w: gap - 0.15 });
    D.flowBox(s, pres, { x: D.PAGE.MX + 3.45, y: y0, w: bw, h: bh, title: "第一轮 · 上级审批", sub: "审批人 = 提交者自己选", fill: D.C.blue });
    D.arrow(s, pres, { x: D.PAGE.MX + 3.45 + bw + 0.08, y: y0 + 0.85, w: gap - 0.15 });
    D.flowBox(s, pres, { x: D.PAGE.MX + 3.45 + bw + gap, y: y0, w: bw, h: bh, title: "第二轮 · 管理员审批", sub: "上级通过后流转", fill: D.C.blue });
    D.arrow(s, pres, { x: D.PAGE.MX + 3.45 + (bw + gap) * 2 + 0.08, y: y0 + 0.85, w: gap - 0.15 });
    D.flowBox(s, pres, { x: D.PAGE.MX + 3.45 + (bw + gap) * 2, y: y0 + 0.2, w: 2.9, h: 1.3, title: "发布成功 ✓", fill: D.C.yellow, tColor: D.C.white });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 5.75, w: 17.76, h: 1.3, kind: "warn",
      runs: [tx("⚠ 审批人要选 "), hl("直属上级"), tx("。系统"), hl("不会自动带出"), tx("直属上级（实测：组织架构配了也没用）。不定规矩就会变成“挑个好说话的批”。")],
    });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 7.35, w: 17.76, h: 0.95, kind: "blue",
      runs: [tx("别混淆：", { bold: true }), tx("发布审批和"), hl("授权三步是两回事"), tx("，发布通过后才走授权。")],
    });
  }

  // 3. 申请原因（三带卡 + 范本）
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "2.2 · 申请原因");
    D.title(s, "申请原因：界面只显示 2 行，一句话三带");
    const cards = [["带", "干什么", "做什么场景"], ["带", "哪张表", "写明新表还是旧表"], ["带", "读还是写", "动作说清楚"]];
    cards.forEach(([tag, big, small], i) => {
      const cx = D.PAGE.MX + i * 6.05, cw = 5.65;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: cx, y: 3.25, w: cw, h: 2.0, rectRadius: 0.1, fill: { color: D.C.card }, shadow: D.sh(),
      });
      s.addShape(pres.shapes.OVAL, { x: cx + 0.35, y: 3.25 + 0.55, w: 0.9, h: 0.9, fill: { color: D.C.yellow } });
      s.addText(tag, { x: cx + 0.35, y: 3.25 + 0.55, w: 0.9, h: 0.9, align: "center", valign: "middle", fontFace: D.F.title, fontSize: 24, bold: true, color: D.C.white, margin: 0 });
      s.addText(big, { x: cx + 1.5, y: 3.25 + 0.5, w: cw - 1.7, h: 0.6, fontFace: D.F.title, fontSize: 26, bold: true, color: D.C.ink, margin: 0, valign: "middle" });
      s.addText(small, { x: cx + 1.5, y: 3.25 + 1.15, w: cw - 1.7, h: 0.5, fontFace: D.F.body, fontSize: 18, color: D.C.gray, margin: 0 });
    });
    D.termCard(s, pres, {
      x: D.PAGE.MX, y: 5.6, w: 17.76, h: 1.8, name: "范本",
      lines: [
        { c: "每周及到港前自动查询船公司ETA变化，写入机器人自建的《船期ETA表》", note: "照这个结构写" },
        { c: "（只写新表不碰旧表），提高客服人效和客户服务体验。", note: "两行以内说完" },
      ],
    });
    s.addText([tx("管理员只扫三点："), hl("表名 · 危险词（写现有表）· 敏感数据词"), tx("   ｜   不要求：背景、技术方案；“工作需要”“测试用”一律打回")], {
      x: D.PAGE.MX, y: 7.85, w: 17.76, h: 0.6, fontFace: D.F.body, fontSize: 19, color: D.C.gray, margin: 0, valign: "middle",
    });
  }

  // 4. 授权三步（角色泳柱）
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "2.3 · 授权");
    D.title(s, "授权三步：建号开权限 → 本人扫码 → 发链接");
    const cols = [
      { who: { glyph: "IT", name: "DIC IT 管理员" }, freq: "每机器人一次", tasks: ["创建机器人（API 模式 · 长连接）", "配可用范围：只开给实际使用的人", "逐项开默认关闭的权限"], headFill: D.C.blue },
      { who: { glyph: "人", name: "搭建者本人" }, freq: "每人一次 · 不能代办", tasks: ["机器人管理 → 编辑 → 可使用权限", "企微扫码，授予「文档」权限"], headFill: D.C.yellow },
      { who: { glyph: "表", name: "数据负责人 / 使用者" }, freq: "每文档一次", tasks: ["把要读的文档链接发给机器人", "大企业必做；小团队不需要"], headFill: D.C.blue },
    ];
    cols.forEach((c, i) => {
      D.roleNode(s, pres, { x: D.PAGE.MX + i * 6.05, y: 3.25, w: 5.65, who: c.who, tasks: c.tasks, headFill: c.headFill, freq: c.freq });
      if (i < 2) D.arrow(s, pres, { x: D.PAGE.MX + i * 6.05 + 5.65 + 0.02, y: 3.67, w: 0.36 });
    });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 7.5, w: 17.76, h: 0.95, kind: "blue",
      runs: [tx("走完三步"), hl("长期有效"), tx("。重走流程只有三种情况："), hl("换表 · 扩权限 · 换负责人"), tx("。")],
    });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 8.75, w: 17.76, h: 0.95, kind: "warn",
      runs: [tx("⚠ 待核实：官方写 "), hl("“授权有效期 7 天”"), tx("，与实测矛盾——突然报无权限先重新扫码并记录反馈。")],
    });
  }

  // 5. QA 第一次制
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "2.4 · 常见困惑");
    D.title(s, "常见困惑：授权");
    D.qaRow(s, pres, {
      x: D.PAGE.MX, y: 3.4, w: 16.8,
      q: "机器人每次改文档都要审批吗？",
      aRuns: [tx("不用，"), hl("“第一次制”不是“每次制”"), tx("——每机器人一次、每人一次、每文档一次。之后日常读写"), hl("静默执行，不弹确认"), tx("。")],
    });
    D.qaRow(s, pres, {
      x: D.PAGE.MX, y: 5.7, w: 16.8,
      q: "管理员能替业务同事扫码授权吗？",
      aRuns: [tx("不能。授权的是"), hl("“读你可见的文档”"), tx("，谁的数据谁本人扫——通常就是搭建者，"), hl("不能代办、不能批量"), tx("。")],
    });
    D.qaRow(s, pres, {
      x: D.PAGE.MX, y: 8.0, w: 16.8,
      q: "小团队也要发文档链接吗？",
      aRuns: [tx("10 人以内不需要；"), hl("大企业必做"), tx("——每个要读的文档，链接都要发给机器人一次。")],
    });
  }

  // 6. 红线速查（表 + 高亮）
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "2.5 · 红线");
    D.title(s, "红线速查：批了也没用，别往审批里塞");
    D.cleanTable(s, {
      x: D.PAGE.MX, y: 3.15, w: 17.76, colW: [9.2, 8.56], rowH: 0.62, fontSize: 18,
      rows: [
        ["红线（平台固定行为）", "怎么绕"],
        [[tx("① 写不了别人建的表"), hl("（共享也不行）")], [hl("建新表"), tx("记新数据，旧表挂索引")]],
        ["② 读别人的表要授权 + 发链接", [tx("提前做好授权三步的 "), hl("第二、三步")]],
        ["③ 智能表格最多单独授权 20 人", [hl("按群/全员设置"), tx("，或拆表")]],
        ["④ 智能表格权限只有三档（看/改/管理）", [hl("敏感数据拆表")]],
        ["⑤ 机器人只有建它的人能用", [hl("一人一个机器人"), tx("，各自申请")]],
        ["⑥ “下载-上传”改表会覆盖别人刚改的", [tx("多人共用表禁用；"), hl("改动格子加底色")]],
        ["⑦ 自建表没有“设管理者”入口", [tx("编辑走"), hl("“企业内自助加入”"), tx("；管理兜底找超管")]],
      ],
    });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 8.25, w: 17.76, h: 0.95, kind: "warn",
      runs: [tx("前车之鉴（DDD）：把“写旧表”当审批问题，批完依然写不进。"), hl("审批只解决“读”；“写”直接转新表方案"), tx("。")],
    });
  }

  // 7. 必须四步（chevron）
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "2.6 · 地板");
    D.title(s, "必须走的流程：企微自带四步，没有商量");
    D.chevronRow(s, pres, {
      x: D.PAGE.MX, y: 3.4, w: 17.76, stepH: 1.1, tSize: 20,
      items: [
        { n: "①", t: "管理员创建", d: "业务同事建不了，没有第二条路" },
        { n: "②", t: "两轮发布审批", d: "上级 + 管理员；上级要选对人" },
        { n: "③", t: "本人扫码授权", d: "读谁的文档谁扫，不代办不批量" },
        { n: "④", t: "发文档链接", d: "大企业每个文档发一次" },
      ],
    });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 6.2, w: 17.76, h: 1.05, kind: "note",
      runs: [tx("不走完会怎样：机器人用不了；"), hl("少走一步 = “批了权限还是用不了”"), tx("。")],
    });
    D.flowSteps(s, pres, {
      x: D.PAGE.MX, y: 7.6, w: 17.76, stepH: 1.7,
      steps: [
        { t: "红线逼出的必然做法", d: "新增数据进新表 · 旧表挂索引" },
        { t: "谁用谁建", d: "一人一个机器人，权限不跟人走" },
        { t: "换负责人", d: "重新扫码 + 重发链接" },
      ],
    });
  }

  // 8. 必然做法（表）
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "2.7 · 必然做法");
    D.title(s, "红线逼出来的六个必然做法");
    D.cleanTable(s, {
      x: D.PAGE.MX, y: 3.15, w: 17.76, colW: [8.2, 9.56], rowH: 0.68, fontSize: 18,
      rows: [
        ["平台红线", "引申出的必然做法"],
        ["写不了员工建的旧表", [hl("新增数据必须进机器人自建新表")]],
        ["新旧表并存会出“两个真相”", [hl("旧表挂索引"), tx(" + 白纸黑字定哪个表算数、何时切换")]],
        ["机器人只有创建者本人能用", [hl("谁用谁建、一人一个"), tx("，团队共用行不通")]],
        ["权限不跟人走", [hl("换负责人重新扫码 + 重发链接")]],
        ["“下载-上传”会覆盖别人的修改", [tx("多人共用表"), hl("禁用此方式"), tx("；改动格子加底色")]],
        ["自建表没有“设管理者”入口", [tx("管理员=机器人+搭建者；编辑走"), hl("自助加入"), tx("，管理兜底找超管")]],
      ],
    });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 7.9, w: 17.76, h: 1.05, kind: "blue",
      runs: [tx("一句话记住：", { bold: true }), tx("四步 + 六做法是"), hl("地板不是天花板"), tx("——地板之上的管理设计是我们自己的提议（第 5 章）。")],
    });
  }

  D.summarySlide(pres, {
    page: ++pg, total: T, brand: BRAND,
    statement: "审批只解决“读”的授权；“写”的诉求直接转新表方案。",
    sub: [
      tx("两轮审批"), hl("选对直属上级"), tx("，申请原因"), hl("一句话三带"), tx("；授权三步走完"), hl("长期有效"), tx("。\n红线是平台固定行为，"), hl("审批无法解锁"), tx("——对照红线表，别在审批里空转。"),
    ],
    chipText: "第 2 章 · 提审",
  });
};
