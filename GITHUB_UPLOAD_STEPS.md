# GitHub 上传步骤

下面按网页操作来写，适合第一次上传。

## 方式一：网页直接上传

1. 打开 GitHub。
2. 点击右上角 `+`。
3. 选择 `New repository`。
4. 仓库名填写：

```text
sgs-card-sorter
```

5. 描述可以填写：

```text
网页版三国杀手牌花色排序油猴脚本
```

6. 选择 `Public` 或 `Private`。
7. 不要勾选 `Add a README file`，因为这里已经准备好了 README。
8. 点击 `Create repository`。
9. 进入新仓库后，点击 `uploading an existing file`。
10. 把这个文件夹里的所有文件拖进去：

```text
sgs-card-sorter.user.js
README.md
CHANGELOG.md
LICENSE
.gitignore
GITHUB_UPLOAD_STEPS.md
```

11. 页面底部的提交说明可以写：

```text
Initial release
```

12. 点击 `Commit changes`。

## 安装地址

上传完成后，脚本的安装地址一般是：

```text
https://raw.githubusercontent.com/doctrine5431/sgs-card-sorter/main/sgs-card-sorter.user.js
```

这个地址里的用户名和仓库名已经按 `doctrine5431/sgs-card-sorter` 填好。

如果你的默认分支不是 `main`，而是 `master`，就把地址里的 `main` 改成 `master`。
