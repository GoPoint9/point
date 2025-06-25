# 站点名：印度-55club
该站点wingo 是30秒，1分钟，3分钟，5分钟
## 版型: 红1首页 — 红色内页

### 构建指令sit:
BRANCH_NAM=$V NODE_ENV=ar021 npx vite build --mode sit

### 构建指令prd:
BRANCH_NAM=$V NODE_ENV=ar021 npx vite build

### 启动指令sit:
BRANCH_NAM=$V NODE_ENV=ar021 npx vite --mode sit

### 启动指令prd:
BRANCH_NAM=$V NODE_ENV=ar021 npx vite

### Jenkins 需要依照站點分別下shell指令，npx cross-env BRANCH_NAM=xxx NODE_ENV=xxx npx vite build