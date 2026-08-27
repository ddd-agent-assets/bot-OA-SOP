// 0-总览：README 内容（图形优先版）
const D = require("./design");
const { hl, tx } = D;
const BRAND = "WECOM-BOT SOP · 总览";

module.exports = function build(pres) {
  let pg = 0; const T = 6;

  // 1. 封面
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { brand: BRAND });
    s.addText("企微智能机器人 SOP", {
      x: D.PAGE.MX, y: 3.0, w: 17.76, h: 1.6, fontFace: D.F.title, fontSize: 60, bold: true, color: D.C.deep, margin: 0,
    });
    s.addText("创建 → 提审 → 登记 → 维护", {
      x: D.PAGE.MX, y: 4.75, w: 17.76, h: 0.7, fontFace: D.F.title, fontSize: 32, bold: true, color: D.C.yellow, margin: 0,
    });
    s.addText([
      tx("给全公司看的，不是给 IT 看的——"), hl("没有技术背景也能照着走"),
      tx("。客服、业务、行政、管理层都适用。"),
    ], {
      x: D.PAGE.MX, y: 5.75, w: 14.5, h: 1.1, fontFace: D.F.body, fontSize: 21, color: D.C.gray, margin: 0, lineSpacingMultiple: 1.35,
    });
    ["用 Workbuddy 等工具", "2026-08 全面开放", "不限企业规模"].forEach((t, i) => {
      D.chip(s, pres, { x: D.PAGE.MX + i * 3.6, y: 7.3, text: t, w: 3.3, fill: D.C.blue, size: 15, bold: false });
    });
  }

  // 2. 背景三句话
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "背景 · WHY NOW");
    D.title(s, "背景三句话：机器人不再是 IT 的专利");
    const rows = [
      ["01", "业务同事自己就能搭", [tx("2026-08-18 企微全面开放，用 "), hl("Workbuddy 等工具自己搭"), tx("，不再走 IT 立项。")]],
      ["02", "但有硬性边界", [tx("文档："), hl("读要本人授权，写只能写自建表"), tx("——很多人卡在“申请了权限还是用不了”。")]],
      ["03", "两种规矩分开讲", [hl("腾讯定的规矩"), tx("只能照办；"), hl("我们自己定的规矩"), tx("内部协商、管理层拍板。")]],
    ];
    rows.forEach(([num, label, body], i) => {
      D.numberRow(s, pres, { x: D.PAGE.MX, y: 3.3 + i * 1.7, num, label, body, w: 16.8 });
    });
  }

  // 3. 全流程地图（chevron 流水线）
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "文档地图 · MAP");
    D.title(s, "四个阶段：创建 → 提审 → 登记 → 维护");
    D.chevronRow(s, pres, {
      x: D.PAGE.MX, y: 3.5, w: 17.76, stepH: 1.15, tSize: 22,
      items: [
        { n: "01", t: "创建", d: "想清楚能做什么；找管理员建号开权限" },
        { n: "02", t: "提审", d: "两轮审批 · 授权三步 · 红线速查" },
        { n: "03", t: "登记", d: "清单打勾 · 进台账 · 代码进私仓" },
        { n: "04", t: "维护", d: "自查四步 · 量限 · 交接" },
      ],
    });
    const lanes = [
      ["业务 / 管理层", "创建01 → 提审全部 → 组织SOP提议"],
      ["IT / 管理员", "创建02 → 提审 → 维护全部"],
      ["要申请的同事", "创建 → 提审 → 登记，按顺序走"],
    ];
    lanes.forEach(([who, path], i) => {
      const y = 6.35 + i * 1.05;
      D.chip(s, pres, { x: D.PAGE.MX, y: y + 0.04, text: who, w: 3.3, fill: D.C.card, size: 16, bold: true });
      s.addText(path, {
        x: D.PAGE.MX + 3.7, y, w: 13.5, h: 0.62, fontFace: D.F.body, fontSize: 20,
        color: D.C.gray, margin: 0, valign: "middle",
      });
      D.arrow(s, pres, { x: D.PAGE.MX + 3.42, y: y + 0.31, w: 0.2, color: D.C.faint, width: 1.5 });
    });
  }

  // 4. 三句话总结
  D.summarySlide(pres, {
    page: ++pg, total: T, brand: BRAND,
    statement: "能做很多事，但文档有边界：读要授权，写只写自建。",
    sub: [
      tx("① 机器人已能操作企微的"), hl("消息 · 邮件 · 文档 · 表格 · 日程 · 会议"), tx("；\n② 员工建的旧表机器人永远改不了——"), hl("这不是权限没配好"), tx("；\n③ 授权和审批都是"), hl("第一次走流程"), tx("，之后日常使用不用每次审批。"),
    ],
    chipText: "授权三步 + 两轮审批，走完长期有效",
  });

  // 5. 附赠 Skill
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "附赠 · AI SKILL");
    D.title(s, "附赠 Skill：让 AI 带你走提审流程");
    const rows = [
      ["01", "装给 AI 就能用", [tx("wecom-bot-approval 装进 "), hl("Codex / Workbuddy"), tx("，AI 指导任何人走通提审。")]],
      ["02", "帮你写“提审一句话”", [tx("审批界面只显示 2 行——AI 一句话带清 "), hl("干什么 · 哪张表（新/旧）· 读还是写"), tx("。")]],
      ["03", "答疑 + 提醒", [tx("红线、自查、交接答疑；提醒 "), hl("台账登记、私有仓库、管理员审批"), tx("。")]],
    ];
    rows.forEach(([num, label, body], i) => {
      D.numberRow(s, pres, { x: D.PAGE.MX, y: 3.3 + i * 1.7, num, label, body, w: 16.8 });
    });
    D.termCard(s, pres, {
      x: D.PAGE.MX, y: 8.55, w: 17.76, h: 1.7, name: "install",
      lines: [{ c: "把本仓库链接发给 AI，安装 wecom-bot-approval", note: "管理员信息可配置" }],
    });
  }

  // 6. 配套资产与信源
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "资产与信源 · ASSETS");
    D.title(s, "配套资产入口与信源");
    D.cleanTable(s, {
      x: D.PAGE.MX, y: 3.3, w: 17.76, colW: [4.6, 13.16], rowH: 0.78, fontSize: 18,
      rows: [
        ["资产", "入口与说明"],
        ["公司 GitHub 组织", [tx("`github.com/ddd-agent-assets` — 存代码；"), hl("公司邮箱注册 · 仓库 Private")]],
        ["登记台账", [tx("企微在线表格（暂行，仅客服部）——"), hl("上线前必须登记")]],
        ["官方文档", [tx("开发者文档 101468 / 99935 / 97392 — "), hl("边界原文"), tx("与权限上限出处")]],
        ["实测记录", [tx("`WecomTeam/wecom-cli` Issue #64/#111/#116 — "), hl("权限差异 · 同步故障 · 超大表量限")]],
      ],
    });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 7.6, w: 17.76, h: 0.95, kind: "note",
      runs: [{ text: "经验源头：", options: { bold: true } }, hl("《已知的坑》"), { text: " 一线实测持续记录；平台规矩以官方文档当日版本为准。" }],
    });
  }
};
