# 肩颈舒展 PWA

这是一个可放到 iPhone 主屏幕的肩颈训练 PWA。它不需要 Apple Developer 账号，不需要上架，也不需要每次扫码。

## 数据安全

- GitHub 只保存代码、动作说明和静态资源。
- 训练完成记录保存在手机浏览器本地 `localStorage`。
- 当前版本没有登录、没有后端、没有云同步。
- 清除 Safari 网站数据或换手机后，本地记录会消失。
- Notion 同步需要安全后端，不能把 Notion token 放进前端代码。

Notion 数据库和同步设计见 [NOTION_SYNC.md](./NOTION_SYNC.md)。

## 本地运行

任选一种静态服务器即可：

```powershell
cd K:\ssh\neck-shoulder-pwa
python -m http.server 4173
```

然后打开：

```text
http://localhost:4173
```

## 发布到 GitHub Pages

推荐这个阶段使用 public 仓库，因为 GitHub Free 支持 public repository 的 GitHub Pages。

1. 新建仓库，例如 `neck-shoulder-pwa`
2. 勾选 `Add a README file`，让仓库先有 `main` 分支
3. 运行部署构建：

```powershell
node scripts/build-deploy.mjs
```

4. 把 `.github/workflows/pages.yml` 和 `dist` 目录推到仓库
5. GitHub Actions 会自动发布 `dist` 到 GitHub Pages

生成的网址通常类似：

```text
https://你的用户名.github.io/neck-shoulder-pwa/
```

## 放到 iPhone 主屏幕

部署到 GitHub Pages 后，用 iPhone Safari 打开网址，然后点分享按钮，选择“添加到主屏幕”。

## 功能

- 12 分钟每日版
- 5 分钟精简版
- 自动倒计时
- 自动左右换边，左右两侧都做完后再进入下一个动作
- 左右换侧自动加入 5 秒放松时间
- 换到下一个动作前自动加入 15 秒准备时间
- 下巴内收这类保持次数动作，每次保持之间自动加入 5 秒微放松
- 每个动作都有黑白人物剪影图片
- 次数型动作手动计数
- 下巴内收保持计时
- 离线缓存
- 本地打卡记录

## 医疗提醒

这个工具只用于日常舒展提示，不替代医疗诊断。出现头晕、手麻、刺痛或疼痛加重时立即停止。
