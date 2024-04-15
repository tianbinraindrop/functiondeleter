# functiondeleter

[English](./README.md) | 简体中文

[functiondeleter github](https://github.com/tianbinraindrop/functiondeleter)

本插件是基于dt-python-parser开发的一个针对python代码中随意删除函数或者类的工具。虽然大量优秀的插件支撑了python开发，但奇怪的是居然没有一个工具能够随意的删除函数或者一个类。当自己入手解决这个问题时，发现最难的其实是如何解析python。

python不同于其它语言，使用缩进来分隔，导致使用正则表达式来提取函数或者类是特别困难的，也容易出错。因此我借用于dt-python-parser对于代码先生成ast，从而准确获得函数或者类的完整表达。

在实际工作中，也有大量编辑makrdown文档的需求，因此本插件提供对不同层次的标题进行删除/剪切的功能，以及在打开的两个编辑器中，将左侧编辑器当前行移到右侧编辑器当前行的功能。markdown的解析使用了[@textlint/markdown-to-ast](https://www.npmjs.com/package/@textlint/markdown-to-ast?activeTab=readme),由于只能够解析出顺序的结构，并且标题只解析到所在的当前行，而不是标题所包括的子标题与内容，因此使用[ts-tree-structure](https://github.com/gentamura/ts-tree-structure)，先构建树，然后再计算节点与相邻节点，以判断标题的作用范围。

支持Python3的语法

![extensiondemo](extension.gif)

## 使用

* 在code中将要删除的函数名称高亮选择，按下ctl+f5就可以删除整个函数
* 在code中将要删除的类名高亮选择，按下ctl+f5就可以删除整个类
* 在code中将要复制的函数名称/类名高亮选择，按下ctl+f6就可以复制函数或者类
* 在code中打开markdown文档，高亮选择某标题，选择命令"remove markdown heading",即可删除此标题下所有内容。此行为视同cut
* 打开两个编辑器，然后按下ctl+f7能够将左边编辑器当前行内容移到右边编辑器的当前行。按下”->"图标也能够达到同样的效果

## 许可证

[MIT](./LICENSE)
