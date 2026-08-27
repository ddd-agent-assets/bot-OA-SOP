# pptx 后处理：CJK 字体修复 + 重压缩（pptxgenjs 输出的两个必修坑）
# 用法: python postprocess.py [目录或pptx路径...]  （默认处理 ./slides/*.pptx）
#
# 坑1：pptxgenjs 每个 <a:latin> 后已自带 <a:ea typeface="同latin字体"/>，
#       中文会掉到主题默认（等线）。必须【替换】ea 为 Microsoft YaHei，
#       绝不能在 latin 后再【注入】一个 ea——重复 ea 元素违反 schema，
#       python-pptx 能打开但 PowerPoint 报「文件损坏」拒绝打开。
# 坑2：pptxgenjs 写未压缩 zip（体积虚胖）；重压缩时 [Content_Types].xml
#       必须是 zip 首个条目（PowerPoint 对此挑剔）。
import os, re, sys, zipfile, shutil, tempfile

def process(pptx_path):
    tmp = tempfile.mkdtemp()
    with zipfile.ZipFile(pptx_path) as z:
        z.extractall(tmp)
    slides_dir = os.path.join(tmp, "ppt", "slides")
    n = 0
    for fn in os.listdir(slides_dir):
        if not fn.endswith(".xml"):
            continue
        p = os.path.join(slides_dir, fn)
        xml = open(p, encoding="utf-8").read()
        new = re.sub(r'<a:ea typeface="[^"]*"[^/>]*/>', '<a:ea typeface="Microsoft YaHei"/>', xml)
        if new != xml:
            open(p, "w", encoding="utf-8").write(new)
            n += 1
    entries = []
    for root, _, files in os.walk(tmp):
        for f in files:
            fp = os.path.join(root, f)
            entries.append(os.path.relpath(fp, tmp).replace("\\", "/"))
    entries.sort(key=lambda r: (r != "[Content_Types].xml",))
    out = pptx_path + ".tmp"
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as z:
        for rel in entries:
            z.write(os.path.join(tmp, rel), rel)
    shutil.move(out, pptx_path)
    shutil.rmtree(tmp)
    print(f"{os.path.basename(pptx_path)}: ea->YaHei in {n} slides, recompressed")

if __name__ == "__main__":
    args = sys.argv[1:] or [os.path.join("slides", "*.pptx")]
    targets = []
    for a in args:
        if a.endswith(".pptx"):
            targets.append(a)
        else:
            import glob
            targets += glob.glob(os.path.join(a, "*.pptx"))
    for t in targets:
        process(t)
