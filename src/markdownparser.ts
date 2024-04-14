import * as fs from "fs";
import Tree from "ts-tree-structure";
import type { Node } from "ts-tree-structure";
import { MarkdownString } from '../.vscode-test/vscode-win32-x64-archive-1.88.1/resources/app/out/vscode-dts/vscode';

type NodeType = { id: number; deep: number; line: number; name: string };
const eofid = 1000;
const rootid = -1;

const nameEq = (name: string) => (node: Node<NodeType>) => {
  return node.model.name === name;
};

function findNode(root: Node<NodeType>, name: string) {
  return root.first(nameEq(name));
}

function getsibling(node: Node<NodeType>) {
  let parent = node.parent;
  if (parent) {
    let index = parent.children.indexOf(node);
    if (index >= 0) {
      if (index + 1 < parent.children.length) {
        return parent.children[index + 1];
      }
      //递归查找父节点的兄弟节点
      return getsibling(parent);
    }
  }
  return null;
}

function createTree(markdownstr: string | any) {
  let parse = require("@textlint/markdown-to-ast").parse;
  let AST = parse(markdownstr);
  let element = AST.children;
  let pos = AST.position;

  // 创建一个树，用于保存
  const tree = new Tree();
  const root = tree.parse({ id: rootid, deep: 0, line: 0, name: "root" });
  const eof = tree.parse({
    id: eofid,
    deep: 1,
    line: pos.end.line,
    name: "eof",
  });

  let current_depth = 0;
  let current_parent = root;

  for (let index = 0; index < element.length; index++) {
    let subelement = element[index];
    if (subelement.type == "Header") {
      let name = subelement.children[0].value;
      let line = subelement.loc.start.line;
      let deep = subelement.depth;
      let id = index;
      let node = tree.parse({ id, deep, line, name });
      if (deep > current_depth) {
        current_parent.addChild(node);
        current_parent = node;
        current_depth = deep;
        continue;
      }
      if (deep == current_depth) {
        current_parent.parent?.addChild(node);
        current_parent = node;
        continue;
      }
      if (deep < current_depth) {
        let parent = current_parent.parent;
        while (parent && parent.model.deep >= deep) {
          parent = parent.parent;
        }
        parent?.addChild(node);
        current_parent = node;
        current_depth = deep;
        continue;
      }
    }
  }
  //一定要在最后加入，否则会出现错误
  root.addChild(eof);
  return root;
}

export function getRange(MarkdownString: string, keyword:string){
    const root = createTree(MarkdownString);
    const node = findNode(root, keyword);
    if (node) {
        let start = node.model.line;
        let end = getsibling(node)?.model.line || -1;
        return { start, end };
    };
    return { start: -1, end: -1 };
}
