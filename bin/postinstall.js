#!/usr/bin/env node
const chalk = require('chalk')

console.log(chalk.green.bold(`
  Express TypeScript模板安装成功!

  快速开始:
  1. 复制.env.example为.env并配置环境变量
  2. 运行开发服务器: ${chalk.yellow('npm run dev')}
  3. 构建生产版本: ${chalk.yellow('npm run build')}

  项目结构说明:
  - src/            # 源代码目录
  - config/         # 配置文件
  - controllers/    # 控制器
  - services/       # 服务层
  - models/         # 数据模型
  - middlewares/    # 中间件

  更多文档请参考: https://github.com/yourusername/express-ts-template
`))
