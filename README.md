## 安装

```
yarn add vuepress-plugin-vssue-global
```

## 使用方法

配置与 [@vssue/vuepress-plugin-vssue](https://vssue.js.org/zh/guide/vuepress.html) 基本一致，多增加一项 title 配置，支持 ejs 模板。

```js
module.exports = {
  plugins: [
    [
      "vuepress-plugin-vssue-global",
      {
        platform: "github",
        title: "「Comment」<%- frontmatter.title %>",
        // 其他的 Vssue 配置
        clientId: "",
        clientSecret: "",
        owner: "",
        repo: "",
      },
    ],
  ],
};
```
