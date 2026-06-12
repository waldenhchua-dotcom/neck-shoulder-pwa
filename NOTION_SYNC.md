# Notion 同步设计

Notion 数据库已创建：

```text
https://app.notion.com/p/c79b7aef791e4ce48daaab92a4d86d19
```

Data Source ID：

```text
0a393a08-0089-4258-8b14-27d00c118b1d
```

## 已建视图

- `训练日历`：按完成时间查看训练频率
- `按训练计划`：按每日版、5 分钟版、自定义分组
- `最近记录`：按完成时间倒序查看明细

## 安全原则

PWA 不应该直接调用 Notion API，因为 Notion integration token 不能放在浏览器代码或 GitHub Pages 里。正确做法是：

1. PWA 完成训练后生成一条训练记录
2. PWA 把记录发到一个私有后端接口
3. 后端接口持有 Notion token
4. 后端写入 Notion 数据库

适合的后端：

- Cloudflare Workers
- Vercel Serverless Function
- Netlify Function
- 自己的轻量 Node 服务

## PWA 本地记录字段

当前 PWA 完成训练时已经保存这些字段，后续可直接同步：

- `completedAt`
- `recordTitle`
- `programId`
- `programTitle`
- `plannedDuration`
- `plannedSeconds`
- `actualSeconds`
- `actionSegmentCount`
- `restCount`
- `restSeconds`
- `source`

## Notion 字段映射

| PWA 字段 | Notion 字段 |
| --- | --- |
| `recordTitle` | `记录` |
| `completedAt` | `完成时间` |
| `programTitle` | `训练计划` |
| `source` | `来源` |
| `plannedSeconds` | `计划时长秒` |
| `actualSeconds` | `实际时长秒` |
| `actionSegmentCount` | `动作段数` |
| `restCount` | `放松次数` |
| `restSeconds` | `放松总秒数` |

## 下一步

给 PWA 增加一个可配置的同步接口，例如：

```js
const NOTION_SYNC_ENDPOINT = "https://your-worker.example.workers.dev/session";
```

完成训练时，除了写入本地 `localStorage`，再向这个接口发送一份 JSON。接口验证一个简单密钥后写入 Notion。
