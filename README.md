# functiondeleter

[简体中文](./README-zh_CN.md) | 英文

[functiondeleter github](https://github.com/tianbinraindrop/functiondeleter)

This plugin is based on dt-python-parser to develop a tool for arbitrarily removing functions or classes in python code. Although there are a lot of excellent plugins to support Python development, it is strange that there is no tool that can delete a function or a class at will. When I started to solve this problem myself, I found that the hardest part was actually how to parse Python.

Unlike other languages, Python uses indentation for separation, which makes it particularly difficult and error-prone to use regular expressions to extract functions or class. So I used the dt-python-parser to make an ast for the code, so as to get the full expression of the function or class accurately.

Python 3 syntax is supported.

![extensiondemo](extension.gif)

## usage

* Highlight the name of the function you want to delete in code, and press CTL+F5 to delete the entire function
* Highlight the name of the class you want to delete in code, and press CTL+F5 to delete the entire class

## license

[MIT](./LICENSE)
