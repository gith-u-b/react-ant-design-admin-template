const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  // disableEsLint(),
  // useEslintRc(path.resolve(__dirname, './.eslintrc.json')),
  // antd 主题样式
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    // modifyVars: { "@primary-color": "red" },
  }),
  
  // 配置路径别名
  addWebpackAlias({
    ["@"]: path.resolve(__dirname, "src")
  }),
);