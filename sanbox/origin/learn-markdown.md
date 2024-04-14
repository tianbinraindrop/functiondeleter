# 各种MARKDOWN语言

* pandoc非常棒，是一个转换神器
* [第6期、写作：基于VS Code的Markdown 写作技术栈](https://zhuanlan.zhihu.com/p/496083303)

keypoints:

* ini
* toml
* yaml
* json
* xml
* plist
* HOCON(Human-Optimized Config Object Notation)

## YAML

* [YAML官网](https://yaml.org/)
* [YAML标准](https://yaml.org/spec/1.1/)

## 转换

* [基于 Markdown 的 Docx 生产](https://www.jianshu.com/p/f15142022aca)
* [writage](https://www.writage.com/)
* [开源工具将 Markdown 转为脑图，还支持 VSCode 和 Vim](https://mp.weixin.qq.com/s/k3qITl7PfZhkinkXb_j3DA)
* [docx2md](https://github.com/dogatana/docx2md)，将docx转换为markdown

```shell
# md2docx
pandoc --reference-doc=ref.docx demo.md -o demo.docx
pandoc -f markdown -t html ./test.md | pandoc -f html -t docx -o output.docx 

# docx2md，但效果不太好。
pandoc -s test.docx -t markdown -o test.md
pandoc -f docx -t markdown example.docx -o example.md

# 也可以安装python库,这个转换效果还是强一些的。
pip install docx2md
python -m docx2md [-h] [-m] [-v] [--debug] SRC.docx DST.md
```

## sandbox

### 引用

> 这是我学习的文档，可以使用各种markdown的技巧。

上面是引用的方式。使用“>”开始，真的是方便啊。

### 列表

#### 无序列表

* red
* green
* blue

#### 有序列表

1. meggie
2. sunny
3. tina

#### 任务列表

* [ ] 买茶
* [ ] 买烟
* [x] 买酒

### 代码块

```bash
yum install wget
yum install vim
```

```python
import os
print("hello")
```

### 表格

表格是比较容易的。

| 姓名   | 金融    |
| ---- | ----- |
| 张三   | 20000 |
| 李四   | 80000 |

### 数学公式

使用 LaTex[^ft]句法。方式来写数学公式，并且以“$$”起与始。
[^ft]: Latex是一种通用的标记语言。

$$
\mathbf{V}_1 \times \mathbf{V}_2 =  \begin{vmatrix}
\mathbf{i} & \mathbf{j} & \mathbf{k} \\
\frac{\partial X}{\partial u} &  \frac{\partial Y}{\partial u} & 0 \\
\frac{\partial X}{\partial v} &  \frac{\partial Y}{\partial v} & 0 \\
\end{vmatrix}
$$

---

### 图片

* [插入图片的方法](https://www.jianshu.com/p/280c6a6f2594)

## 图形的练习

### sequence

```sequence
Alice->Bob: Hello Bob, how are you?
Note right of Bob: Bob thinks
Bob-->Alice: I am good thanks!
```

### flowchart

这是一个流程图示意，也很方便。

```flow
st=>start: Start
op=>operation: Your Operation
cond=>condition: Yes or No?
e=>end

st->op->cond
cond(yes)->e
cond(no)->op
```

## vscode plugin

* Markdown Snippets
* Snippets Ranger
* Markdown All in One
* Markdown Preview Enhanced
* markdown Preview Mermaid Support
* Markdown Shortcuts
* markdownlint
* Mermaid editor
