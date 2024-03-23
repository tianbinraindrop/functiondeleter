# functiondeleter

[English](./README.md) | 简体中文

[functiondeleter github](https://github.com/tianbinraindrop/functiondeleter)

本插件是基于dt-python-parser开发的一个针对python代码中随意删除函数或者类的工具。虽然大量优秀的插件支撑了python开发，但奇怪的是居然没有一个工具能够随意的删除函数或者一个类。当自己入手解决这个问题时，发现最难的其实是如何解析python。

python不同于其它语言，使用缩进来分隔，导致使用正则表达式来提取函数或者类是特别困难的，也容易出错。因此我借用于dt-python-parser对于代码先生成ast，从而准确获得函数或者类的完整表达。

支持Python3的语法

![extensiondemo](extension.gif)

## 使用

* 在code中将要删除的函数名称高亮选择，按下ctl+f5就可以删除整个函数
* 在code中将要删除的类名高亮选择，按下ctl+f5就可以删除整个类

## todo

* 复制指定的函数与类

## 许可证

[MIT](./LICENSE)
