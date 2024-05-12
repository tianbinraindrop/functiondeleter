# functiondeleter

[简体中文](./README-zh_CN.md) | 英文

[functiondeleter github](https://github.com/tianbinraindrop/functiondeleter)

This plugin is based on dt-python-parser to develop a tool for arbitrarily removing functions or classes in python code. Although there are a lot of excellent plugins to support Python development, it is strange that there is no tool that can delete a function or a class at will. When I started to solve this problem myself, I found that the hardest part was actually how to parse Python.

Unlike other languages, Python uses indentation for separation, which makes it particularly difficult and error-prone to use regular expressions to extract functions or class. So I used the dt-python-parser to make an ast for the code, so as to get the full expression of the function or class accurately.

In practical work scenarios, there is often a significant need to edit Markdown documents. Consequently, this plugin offers the functionality to delete and cut different levels of headings, as well as to move the current line from the left editor to the right editor when two editors are opened. For the parsing of Markdown, the [@textlint/markdown-to-ast](https://www.npmjs.com/package/@textlint/markdown-to-ast?activeTab=readme) npm package is utilized. Since it can only parse sequential structures and only identifies headings as the lines on which they appear, rather than including the subheadings and content, the [ts-tree-structure](https://github.com/gentamura/ts-tree-structure) is employed. It first constructs a tree and then calculates the relationships between nodes to determine the scope of the headings' effects.

Python 3 syntax is supported.

![extensiondemo](extension.gif)

## usage

* Highlight the name of the function you want to delete in code, and press CTL+F5 to delete the entire function
* Highlight the name of the class you want to delete in code, and press CTL+F5 to delete the entire class
* Highlight the name of the function/class you want to dumplicate in code, and press CTL+F6 to duplicate the entire function/class
* In the code editor, open a Markdown document, highlight a specific heading, and select the command "remove markdown heading." This action will delete all content under that heading. This behavior is equivalent to a cut operation
* In the code editor, open a Markdown document, and select the command "translate onetab link to markdown format",This action will translate current line text to markdown hyperlink format
* Open both editors and press Ctrl+F7 to move the current line from the left editor to the current line of the right editor. Pressing the "->" icon will also do the same thing

## license

[MIT](./LICENSE)
