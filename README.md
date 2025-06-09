# Express TypeScript 项目

这是一个基于 Express 和 TypeScript 的后端服务模板项目。

## 功能特性

- 使用 TypeScript 开发
- Express 5.x 框架
- TypeORM 数据库集成
- 结构化项目架构
- 开发/生产环境配置
- 日志记录和错误处理中间件

## 项目结构

```
express-ts-project/
├── src/
│   ├── config/        # 配置文件
│   ├── controllers/   # 控制器
│   ├── dto/           # 数据传输对象
│   ├── middlewares/   # 中间件
│   ├── models/        # 数据库模型
│   ├── routes/        # 路由
│   ├── services/      # 服务层
│   ├── utils/         # 工具类
│   ├── app.ts         # Express应用配置
│   └── index.ts       # 入口文件
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 快速开始

### 安装依赖

使用npm:
```bash
npm install
```

使用pnpm:
```bash
pnpm install
```

### 开发模式

使用npm:
```bash
npm run dev
```

使用pnpm:
```bash
pnpm run dev
```

### 生产构建

使用npm:
```bash
npm run build
```

使用pnpm:
```bash
pnpm run build
```

### 生产运行

使用npm:
```bash
npm run start
```

使用pnpm:
```bash
pnpm run start
```

## 环境变量

复制 `.env.example` 为 `.env` 并配置你的环境变量。

## 贡献指南

欢迎提交 Pull Request。

## 许可证

MIT
