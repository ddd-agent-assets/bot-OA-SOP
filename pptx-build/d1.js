// 01-创建（图形优先版）
const D = require("./design");
const { hl, tx } = D;
const BRAND = "WECOM-BOT SOP · 创建";

module.exports = function build(pres) {
  let pg = 0; const T = 9;

  D.chapterCover(pres, {
    page: ++pg, total: T, num: "01", titleCn: "创建：想清楚，再找管理员", titleEn: "CREATE",
    summary: "机器人能做什么、不能做什么；建号只有管理员能操作——第一步永远是找管理员。",
    lessons: ["能力全景", "三条硬边界", "旧表怎么办", "Workbuddy", "部门速查", "怎么建号", "12 类权限"],
    brand: BRAND,
  });

  // 2. 能力全景：6 组能力卡
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "1.1 · 能力");
    D.title(s, "能力全景：机器人现在就能做这些");
    const tiles = [
      ["💬", "消息 · 待办", "群推送告警日报 · 任务提醒"],
      ["📧", "邮件", "收发检索 · 读正文 · 来信汇总"],
      ["📅", "日程 · 会议", "订会议室 · 自动出纪要转写"],
      ["📄", "文档", "新建 · 读取 · 追加 · 覆盖写"],
      ["📊", "表格", "导入读改 · 智能表格当数据库台账"],
      ["🗂", "微盘 · 通讯录", "搜同事 · 传文件 · 资料归档"],
    ];
    tiles.forEach(([g, name, desc], i) => {
      const cx = D.PAGE.MX + (i % 3) * 6.05, cy = 3.3 + Math.floor(i / 3) * 2.45, cw = 5.65, chh = 2.15;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: cx, y: cy, w: cw, h: chh, rectRadius: 0.1, fill: { color: D.C.card }, shadow: D.sh(),
      });
      s.addShape(pres.shapes.OVAL, { x: cx + 0.3, y: cy + 0.55, w: 0.95, h: 0.95, fill: { color: D.C.blue } });
      s.addText(g, { x: cx + 0.3, y: cy + 0.55, w: 0.95, h: 0.95, align: "center", valign: "middle", fontSize: 30, margin: 0 });
      s.addText(name, { x: cx + 1.5, y: cy + 0.42, w: cw - 1.7, h: 0.5, fontFace: D.F.title, fontSize: 23, bold: true, color: D.C.ink, margin: 0 });
      s.addText(desc, { x: cx + 1.5, y: cy + 1.0, w: cw - 1.7, h: 0.9, fontFace: D.F.body, fontSize: 18, color: D.C.gray, margin: 0, lineSpacingMultiple: 1.2 });
    });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 8.35, w: 17.76, h: 0.9, kind: "note",
      runs: [tx("给 IT：", { bold: true }), tx("接入走 "), hl("`@wecom/cli` 或 MCP 通道"), tx("，不需要公网服务器，内网也能部署。")],
    });
  }

  // 3. 三条边界（图标卡）
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "1.2 · 边界");
    D.title(s, "三条硬边界：写限自建 · 读要授权 · 不冒充");
    const cards = [
      ["✎", "写：只能写自己建的", [hl("员工旧表永远改不了"), tx("；不是权限没配好，"), hl("找谁审批都没用"), tx("；共享给机器人也不行（实测）。")]],
      ["👁", "读：要本人扫码授权", [tx("扫码授权后才能读"), hl("其可见文档"), tx("；大企业还要"), hl("发一次文档链接"), tx("。授权永远只给“读”。")]],
      ["👤", "机器人就是机器人", [hl("不能以员工名义发消息"), tx("；只有"), hl("创建者本人"), tx("能跟它对话，防止权限外借。")]],
    ];
    cards.forEach(([g, name, lines], i) => {
      const cx = D.PAGE.MX + i * 6.05, cy = 3.3, cw = 5.65, chh = 4.3;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: cx, y: cy, w: cw, h: chh, rectRadius: 0.12, fill: { color: D.C.white }, line: { color: D.C.hair, width: 1.2 }, shadow: D.sh(),
      });
      s.addShape(pres.shapes.OVAL, { x: cx + cw / 2 - 0.55, y: cy + 0.4, w: 1.1, h: 1.1, fill: { color: i === 0 ? D.C.yellow : D.C.blue } });
      s.addText(g, { x: cx + cw / 2 - 0.55, y: cy + 0.4, w: 1.1, h: 1.1, align: "center", valign: "middle", fontSize: 32, color: i === 0 ? D.C.white : D.C.ink, margin: 0 });
      s.addText(name, { x: cx + 0.25, y: cy + 1.65, w: cw - 0.5, h: 0.5, align: "center", fontFace: D.F.title, fontSize: 22, bold: true, color: D.C.ink, margin: 0 });
      s.addText(lines, { x: cx + 0.4, y: cy + 2.3, w: cw - 0.8, h: 1.8, fontFace: D.F.body, fontSize: 19, color: D.C.gray, margin: 0, lineSpacingMultiple: 1.3, valign: "top" });
    });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 8.15, w: 17.76, h: 0.9, kind: "warn",
      runs: [tx("三条边界是 "), hl("企微统一规则"), tx("，选任何工具都绕不开（Workbuddy 也一样）。")],
    });
  }

  // 4. 旧表怎么办（对比卡 + 索引衔接图）
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "1.3 · 解法");
    D.title(s, "旧表写不进：新表承接 + 挂索引");
    D.contrastPair(s, pres, {
      x: D.PAGE.MX, y: 3.2, w: 17.76, h: 3.1,
      good: {
        head: "机器人自建新表 ✓",
        lines: [tx("新增数据都进新表，随便写\n建表时开 "), hl("“企业内成员自助加入”"), tx("\n同事打开表即得编辑权，不用逐个加人")],
      },
      bad: {
        head: "员工建的旧表 ✕",
        lines: [hl("永远改不了，别再试共享\n"), tx("不是权限没配好，是企微硬性设计\n"), hl("找谁审批都没用")],
      },
    });
    D.flowBox(s, pres, { x: D.PAGE.MX + 0.6, y: 7.0, w: 6.6, h: 1.0, title: "旧表 · 保留历史", fill: D.C.card, tColor: D.C.gray });
    D.arrow(s, pres, { x: D.PAGE.MX + 7.4, y: 7.5, w: 2.6, color: D.C.yellow, width: 2.5 });
    s.addText("挂索引指向", {
      x: D.PAGE.MX + 7.2, y: 7.02, w: 3.0, h: 0.4, align: "center", fontFace: D.F.mono, fontSize: 15, color: D.C.yellow, margin: 0,
    });
    D.flowBox(s, pres, { x: D.PAGE.MX + 10.2, y: 7.0, w: 6.6, h: 1.0, title: "机器人新表 · 记新增数据", fill: D.C.blue });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 8.55, w: 17.76, h: 0.95, kind: "note",
      runs: [tx("为什么必须挂索引：避免 "), hl("“两个真相”"), tx("——白纸黑字定哪个表算数、何时切换。")],
    });
  }

  // 5. Workbuddy
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "1.4 · 工具");
    D.title(s, "Workbuddy 能直接接入，但绕不开边界");
    const rows = [
      ["01", "官方点名的适配工具", [tx("同批还有 "), hl("Codex · Kimi Work"), tx("。企微连接器是"), hl("一键包装，不是独占通道"), tx("。")]],
      ["02", "搭好的机器人内嵌企微", [tx("群里 "), hl("@机器人 即可调用"), tx("。DDD 客服“补料机器人”：原来手机电脑同时在线，现在"), hl("随时响应"), tx("。")]],
      ["03", "同样受三条边界约束", [hl("读要授权 · 写只写自建 · 不冒充员工"), tx("，选型别指望任何工具绕开。")]],
    ];
    rows.forEach(([num, label, body], i) => {
      D.numberRow(s, pres, { x: D.PAGE.MX, y: 3.3 + i * 1.75, num, label, body, w: 16.8 });
    });
  }

  // 6. 各部门速查（表格 + 高亮）
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "1.5 · 速查");
    D.title(s, "各部门速查：现在就能受益的事");
    D.cleanTable(s, {
      x: D.PAGE.MX, y: 3.2, w: 17.76, colW: [2.6, 8.2, 6.96], rowH: 0.95, fontSize: 18,
      rows: [
        ["部门", "现在就能受益", "要注意"],
        ["客服", [hl("群内问答"), tx(" · 异常通知 · 知识库回复")], [tx("旧表写不进，"), hl("新数据走新表")]],
        ["业务/销售", [hl("询盘自动登记"), tx(" · 船期汇总 · 邮件整理")], [hl("扫码授权 + 发链接"), tx(" 才能读业务表")]],
        ["行政", [hl("会议纪要自动生成"), tx(" · 通知搬运 · 订会议室")], "—"],
        ["IT/管理员", [tx("统一创建与配可用范围，"), hl("无公网服务器要求")], [hl("权限最小化"), tx("，逐项开启")]],
      ],
    });
  }

  // 7. 建号流水线
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "1.6 · 建号");
    D.title(s, "创建机器人：只有管理员能建");
    D.chevronRow(s, pres, {
      x: D.PAGE.MX, y: 3.35, w: 17.76, stepH: 1.1, tSize: 20,
      items: [
        { n: "①", t: "找 DIC IT", d: "业务同事后台没有创建入口" },
        { n: "②", t: "后台创建", d: "工作台 → 智能机器人 → API 模式 → 长连接" },
        { n: "③", t: "拿密钥", d: "Bot ID + Secret 妥善保存，泄露=冒充" },
        { n: "④", t: "配范围", d: "只开给实际使用的群和同事" },
        { n: "⑤", t: "开权限", d: "默认最小化，用到哪项开哪项" },
      ],
    });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 6.1, w: 17.76, h: 1.15, kind: "warn",
      runs: [hl("不需要公网服务器"), tx("，内网也能跑。给 IT：前提是 "), tx("Node.js 环境", { bold: true }), tx(" + 长连接机器人的 "), tx("Bot ID 和 Secret", { bold: true }), tx("。")],
    });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 7.6, w: 17.76, h: 0.95, kind: "blue",
      runs: [tx("建好只是“出生”：", { bold: true }), tx("接下来走 "), hl("发布审批 + 授权"), tx("（第 2 章）才能用。")],
    });
  }

  // 8. 12 类权限（开关瓦片墙）
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "1.7 · 权限");
    D.title(s, "12 类权限：默认全关，用到哪项开哪项");
    const perms = [
      ["消息", "异常告警 · 日报"], ["文档", "新建读改写"], ["文档管理", "搜索 · 重命名 · 权限"],
      ["在线表格", "导入读改 · 追加行"], ["智能表格", "数据库型台账"], ["智能文档", "带数据表的文档"],
      ["微盘", "上传下载归档"], ["邮件", "来信汇总"], ["待办", "任务提醒"],
      ["日程", "增删改查 · 订房"], ["会议", "纪要 · 转写"], ["通讯录", "搜同事 · 查信息"],
    ];
    perms.forEach(([name, scen], i) => {
      const cx = D.PAGE.MX + (i % 4) * 4.51, cy = 3.2 + Math.floor(i / 4) * 1.62, cw = 4.21, chh = 1.42;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: cx, y: cy, w: cw, h: chh, rectRadius: 0.09, fill: { color: D.C.card }, line: { color: D.C.hair, width: 1 },
      });
      s.addShape(pres.shapes.OVAL, { x: cx + 0.22, y: cy + chh / 2 - 0.14, w: 0.28, h: 0.28, fill: { color: i % 4 === 3 ? D.C.yellow : D.C.blue } });
      s.addText(name, { x: cx + 0.62, y: cy + 0.16, w: cw - 0.78, h: 0.42, fontFace: D.F.title, fontSize: 20, bold: true, color: D.C.ink, margin: 0 });
      s.addText(scen, { x: cx + 0.62, y: cy + 0.68, w: cw - 0.78, h: 0.5, fontFace: D.F.body, fontSize: 17, color: D.C.gray, margin: 0 });
    });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 8.35, w: 17.76, h: 0.95, kind: "note",
      runs: [tx("独立开关：", { bold: true }), hl("“能读文档”≠“能查通讯录”"), tx("；报错自带“去开通”链接，要 "), hl("创建机器人的那个人"), tx(" 点才有效。")],
    });
  }

  D.summarySlide(pres, {
    page: ++pg, total: T, brand: BRAND,
    statement: "建号找管理员，权限逐项开；写只写自建，读要本人授权。",
    sub: [
      tx("能力覆盖 "), hl("消息 · 邮件 · 文档 · 表格 · 日程 · 会议"), tx("，但三条边界是平台统一的。\n建好之后，下一步是 "), hl("发布审批与授权"), tx("（第 2 章）。"),
    ],
    chipText: "第 1 章 · 创建",
  });
};
