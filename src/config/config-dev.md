# dev setup

* [LOGOMASTER](https://logomaster.ai)
* Extension Test Runner（vscode插件）

```shell
yo code

npm i @types/node -d
npm i dt-python-parser -d
npm install -d @textlint/markdown-to-ast
npm install -d ts-tree-structure

npm list

npm install -g vsce
vsce package
```

## compile and run

```shell
npm run compile
```

## test

```shell
npm install --save-dev @vscode/test-cli @vscode/test-electron
npm run test
```
