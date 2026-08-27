// 03-登记（图形优先版）
const D = require("./design");
const { hl, tx } = D;
const BRAND = "WECOM-BOT SOP · 登记";

module.exports = function build(pres) {
  let pg = 0; const T = 6;

  D.chapterCover(pres, {
    page: ++pg, total: T, num: "03", titleCn: "登记：打勾、进台账、存私仓", titleEn: "REGISTER",
    summary: "上线前拿清单逐项打勾，任何一项打不上勾就不予上线；每个机器人登记台账；代码存公司 GitHub 私有仓库。",
    lessons: ["上线检查清单", "登记台账", "GitHub 私有仓库"],
    brand: BRAND,
  });

  // 2. 上线检查清单（checkbox 列表）
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "3.1 · 上线门槛");
    D.title(s, "上线检查清单：逐项打勾才可上线");
    const items = [
      [tx("要动的表都定过级，"), hl("没有敏感、绝密数据违规")],
      [tx("机器人"), hl("只往自己建的表写"), tx("，不碰员工旧表")],
      [tx("多人共用的表没有用 "), hl("“下载-上传”"), tx(" 方式改")],
      [hl("新旧表哪个算数、何时切换"), tx("，白纸黑字定了")],
      [tx("机器人只对"), hl("实际使用的群和同事"), tx("开放")],
      [tx("文档管理员只有"), hl("机器人和搭建者本人"), tx("，没有再授权给别人")],
      [hl("台账登记完成"), tx("（含负责人与交接人），代码已存 "), hl("GitHub 私有仓库")],
    ];
    items.forEach((runs, i) => {
      const y = 3.25 + i * 0.82;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: D.PAGE.MX, y: y + 0.08, w: 0.44, h: 0.44, rectRadius: 0.06,
        fill: { color: D.C.card }, line: { color: D.C.yellow, width: 1.4 },
      });
      s.addText("✓", { x: D.PAGE.MX, y: y + 0.08, w: 0.44, h: 0.44, align: "center", valign: "middle", fontFace: D.F.disp, fontSize: 15, color: D.C.yellow, margin: 0 });
      s.addText(runs, {
        x: D.PAGE.MX + 0.72, y, w: 16.9, h: 0.6, fontFace: D.F.body, fontSize: 21, color: D.C.gray, margin: 0, valign: "middle",
      });
    });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 9.25, w: 17.76, h: 0.8, kind: "warn",
      runs: [hl("任何一项打不上勾，就不予上线"), tx("。勾完再走台账登记。")],
    });
  }

  // 3. 台账（字段瓦片 + 教训）
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "3.2 · 台账");
    D.title(s, "登记台账：没台账就没有交接");
    const fields = [
      ["负责人", "谁搭的、谁在用"], ["机器人", "名称 + Bot ID"], ["授权人", "谁扫码授权的"], ["表清单", "读写哪些表 + 新旧关系"],
      ["额度", "积分/账号情况"], ["交接人", "不在时谁接手"], ["代码仓库", "GitHub 私仓地址"],
    ];
    fields.forEach(([name, note], i) => {
      const row = i < 4 ? 0 : 1, col = i < 4 ? i : i - 4;
      const cx = D.PAGE.MX + col * 4.51 + (row === 1 ? 2.25 : 0), cy = 3.25 + row * 1.75, cw = 4.21, chh = 1.5;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: cx, y: cy, w: cw, h: chh, rectRadius: 0.09, fill: { color: D.C.card }, line: { color: D.C.hair, width: 1 }, shadow: D.sh(),
      });
      s.addText(name, { x: cx + 0.24, y: cy + 0.18, w: cw - 0.48, h: 0.45, fontFace: D.F.title, fontSize: 21, bold: true, color: D.C.ink, margin: 0 });
      s.addText(note, { x: cx + 0.24, y: cy + 0.72, w: cw - 0.48, h: 0.6, fontFace: D.F.body, fontSize: 18, color: D.C.gray, margin: 0 });
    });
    D.qaRow(s, pres, {
      x: D.PAGE.MX, y: 7.15, w: 16.8,
      q: "为什么要登记？",
      aRuns: [tx("真实教训：DDD 一位自己搭了机器人的同事调岗——“她搓的东西怎么交给要使用它的人？”"), hl("没台账就没有交接"), tx("，人一走机器人就成"), hl("孤儿"), tx("。")],
    });
    D.noteBar(s, pres, {
      x: D.PAGE.MX, y: 9.35, w: 17.76, h: 0.8, kind: "note",
      runs: [tx("暂行：企微在线表格（"), hl("目前仅客服部"), tx("）。上线前登记、变更时同步、交接时更新。")],
    });
  }

  // 4. GitHub（对比 + 三步）
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "3.3 · 代码资产");
    D.title(s, "代码存公司 GitHub：公司邮箱 + 私有仓库");
    D.contrastPair(s, pres, {
      x: D.PAGE.MX, y: 3.2, w: 17.76, h: 2.9,
      good: {
        head: "两条硬规矩 ✓",
        lines: [tx("账号必须用 "), hl("公司邮箱注册"), tx("\n仓库一律 "), hl("Private（禁止公开）"), tx("\n组织：github.com/ddd-agent-assets")],
      },
      bad: {
        head: "为什么管这么严 ✕",
        lines: [hl("公开仓库 = 公司内部摊开给全网"), tx("\n脚本提示词带业务数据、表名、内部逻辑\n散在个人电脑 = "), hl("人走资产丢")],
      },
    });
    D.chevronRow(s, pres, {
      x: D.PAGE.MX, y: 6.7, w: 17.76, stepH: 1.0, tSize: 20,
      items: [
        { n: "①", t: "公司邮箱注册", d: "GitHub 账号" },
        { n: "②", t: "报给 Rosetta / Yomi", d: "拉进组织" },
        { n: "③", t: "建 Private 仓库", d: "默认可能是 Public，建完立刻查" },
        { n: "④", t: "地址登记进台账", d: "脚本 · 配置 · 提示词 · README" },
      ],
    });
  }

  // 5. QA
  {
    const s = pres.addSlide();
    s.background = { color: D.C.white };
    D.furniture(s, pres, { page: ++pg, total: T, brand: BRAND });
    D.kicker(s, "3.4 · 常见困惑");
    D.title(s, "常见困惑：登记");
    D.qaRow(s, pres, {
      x: D.PAGE.MX, y: 3.5, w: 16.8,
      q: "什么时候登记、什么时候更新？",
      aRuns: [hl("上线前"), tx("：七步流程最后一步就是登记，"), hl("不登记不上线"), tx("；"), hl("变更时"), tx("（换表、扩权限、换负责人）同步改；"), hl("交接时"), tx("走完 SOP、台账更新才算完成。")],
    });
    D.qaRow(s, pres, {
      x: D.PAGE.MX, y: 6.2, w: 16.8,
      q: "建仓库时默认是 Public 怎么办？",
      aRuns: [tx("建完"), hl("立刻检查设置改为 Private"), tx("。同时确认是"), hl("公司邮箱注册的账号"), tx("——个人邮箱不允许。")],
    });
  }

  D.summarySlide(pres, {
    page: ++pg, total: T, brand: BRAND,
    statement: "打勾才上线，进台账可交接，代码进私仓不外泄。",
    sub: [
      hl("七项上线检查"), tx("一项不能少；"), hl("台账七字段"), tx("让机器人有主可查、有人可交；\n公司 GitHub 组织 "), hl("ddd-agent-assets"), tx(" 统一收口——公司邮箱、仓库 Private。"),
    ],
    chipText: "第 3 章 · 登记",
  });
};
