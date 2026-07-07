# 三国杀手牌花色排序

一个用于网页版三国杀的 Tampermonkey / Violentmonkey 用户脚本。

脚本会在游戏页面显示一个可拖拽的悬浮按钮。点击按钮后，会把自己的手牌显示顺序按游戏内部花色编号重新排序。

## 功能

- 在 `https://web.sanguosha.com/*` 页面自动启用。
- 显示一个可拖拽悬浮按钮。
- 点击按钮后按花色整理自己的手牌显示顺序。
- 只调整本地页面里的手牌显示顺序，不会自动出牌。
- 不上传数据，不请求外部网络接口。

## 安装

1. 安装浏览器扩展：
   - Tampermonkey
   - Violentmonkey

2. 打开本仓库里的 `sanguosha_sorted-by-suit.user.js`。

3. 如果已经上传到 GitHub，可以打开 Raw 原始文件地址安装，例如：

```text
https://raw.githubusercontent.com/doctrine5431/sanguosha_sorted-by-suit/main/sanguosha_sorted-by-suit.user.js
```

4. 进入网页版三国杀：

```text
https://web.sanguosha.com/
```

5. 进入游戏后，点击右下方悬浮按钮即可排序手牌。

## 使用说明

- 拖动悬浮按钮可以调整位置。
- 单击悬浮按钮会执行手牌花色排序。
- 如果按钮没有出现，通常是页面里的 Laya 游戏场景还没加载完成，可以稍等几秒或刷新页面。
- 如果点击无反应，可能是游戏页面更新导致内部节点名变化，需要更新脚本。

## 注意

本脚本依赖网页版三国杀当前的前端结构，包括 `Laya.stage`、`SelfSeatUi`、`cardContainer`、`cardUis` 等内部对象。网页端更新后，这些字段可能变化，脚本也可能失效。

本项目仅用于整理本地显示效果，请遵守游戏平台规则。

## 文件说明

- `sanguosha_sorted-by-suit.user.js`：用户脚本本体。
- `README.md`：项目说明。
- `CHANGELOG.md`：版本记录。
- `LICENSE`：MIT 许可证。

## License

MIT
