# WLOC Worker

独立的 Cloudflare Worker / Pages 项目，来源于 [lfzk550/wloc-new](https://github.com/lfzk550/wloc-new) 的 `worker` 目录。

## 安装与测试

需要 Node.js 22 或更高版本：

```bash
npm install
npm test
```

## 本地运行

```bash
npm run dev
```

## 部署 Cloudflare Worker

```bash
npx wrangler login
npm run deploy
```

## 部署 Cloudflare Pages

```bash
npm run pages:build
npm run pages:deploy
```

许可证：AGPL-3.0。
