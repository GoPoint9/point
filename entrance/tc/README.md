# 站点名：印度-tc

## 版型: 黄色首页 — 红色内页

### 构建指令sit:
BRANCH_NAM=$V NODE_ENV=tc npx vite build --mode sit

### 构建指令prd:
BRANCH_NAM=$V NODE_ENV=tc npx vite build

### 启动指令sit:
BRANCH_NAM=$V NODE_ENV=tc npx vite --mode sit

### 启动指令prd:
BRANCH_NAM=$V NODE_ENV=tc npx vite
