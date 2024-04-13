export function parseMarkdownToAST(markdown: string): any {
  let parse = require("@textlint/markdown-to-ast").parse;
  let AST = parse(markdown);
  return AST['type']
}
