const Python3Parser = require("dt-python-parser").Python3Parser;
const Python3Visitor = require("dt-python-parser").Python3Visitor;

class FunVisitor extends Python3Visitor {
  // 重写 visitFuncdef 方法
  visitFuncdef(ctx) {
    let functionname = ctx.getText().match(/(?<=def).+/)?.[0];
    if (
      functionname.includes(this.name) &&
      Math.abs(ctx.start.line - this.start) <= 2
    ) {
      this.end = ctx.stop.line;
    }
  }

  findname(str, startline) {
    this.name = str;
    this.start = startline;
    this.end = -1;
  }
}

class ClassVisitor extends Python3Visitor {
  // 重写 visitClassdef 方法
  visitClassdef(ctx) {
    let classname = ctx.getText().match(/(?<=class).+/)?.[0];
    if (
      classname.includes(this.name) &&
      Math.abs(ctx.start.line - this.start) <= 2
    ) {
      this.end = ctx.stop.line;
    }
  }

  findname(str, startline) {
    this.name = str;
    this.start = startline;
    this.end = -1;
  }
}

function findDef(code, name, startline) {
  const parser = new Python3Parser();
  const funvisitor = new FunVisitor();
  const classvisitor = new ClassVisitor();
  
  try {
    const treeFun = parser.parse(code);
    funvisitor.findname(name, startline);
    funvisitor.visit(treeFun);
    let result = { start: funvisitor.start, end: funvisitor.end };
    if (result.end != -1) {
      return result;
    }
    
    const treeClass = parser.parse(code);
    classvisitor.findname(name, startline);
    classvisitor.visit(treeClass);
    let result_class = { start: classvisitor.start, end: classvisitor.end };
    if (result_class.end != -1) {
      return result_class;
    }
    return { start: -1, end: -1 };
  } catch (err) {
    console.error(err);
  }
}
exports.findDef = findDef;
