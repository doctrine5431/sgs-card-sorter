# 三国杀手牌花色排序

一个用于网页版三国杀的 Tampermonkey / Violentmonkey 用户脚本。

脚本会在游戏页面显示一个可拖拽的悬浮按钮。点击按钮后，会把自己的手牌显示顺序按游戏内部花色编号重新排序。

## 一键安装

请先安装 Tampermonkey 或 Violentmonkey，然后点击下面链接安装脚本：

[安装 三国杀手牌花色排序](https://raw.githubusercontent.com/doctrine5431/sgs-card-sorter/main/sgs-card-sorter.user.js)

如果浏览器没有自动打开安装页面，请确认已经安装并启用了油猴扩展。

## 适用页面

```text
https://web.sanguosha.com/*
```

## 功能

- 显示一个可拖拽悬浮按钮。
- 点击按钮后按花色整理自己的手牌显示顺序。
- 只调整本地页面里的手牌显示顺序，不会自动出牌。
- 不上传数据，不请求外部网络接口。

## 使用说明

1. 安装脚本后打开网页版三国杀。
2. 进入游戏页面，等待右下方出现悬浮按钮。
3. 拖动悬浮按钮可以调整位置。
4. 单击悬浮按钮会执行手牌花色排序。

如果按钮没有出现，通常是页面里的 Laya 游戏场景还没加载完成，可以稍等几秒或刷新页面。

## 注意

本脚本依赖网页版三国杀当前的前端结构，包括 `Laya.stage`、`SelfSeatUi`、`cardContainer`、`cardUis` 等内部对象。网页端更新后，这些字段可能变化，脚本也可能失效。

本项目仅用于整理本地显示效果，请遵守游戏平台规则。

## 文件说明

- `sgs-card-sorter.user.js`：用户脚本本体。
- `README.md`：项目说明。
- `CHANGELOG.md`：版本记录。
- `LICENSE`：MIT 许可证。

## License

MIT
