#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const chalk = require('chalk')
const inquirer = require('inquirer').default

console.log(chalk.blue.bold('🚀 Express + TypeScript 项目创建工具'))

// 获取项目名称
const projectName = process.argv[2]
if (!projectName) {
  console.error(chalk.red('❌ 错误：请指定项目名称'))
  console.log(`示例: npx express-ts-template-gwh ${chalk.green('<project-name>')}`)
  process.exit(1)
}

const templateDir = path.join(__dirname, '../template')
const projectDir = path.resolve(process.cwd(), projectName)

// 检查目录是否存在
if (fs.existsSync(projectDir)) {
  console.error(chalk.red(`❌ 目录 ${projectName} 已存在`))
  process.exit(1)
}

// 创建项目目录
fs.mkdirSync(projectDir)
console.log(chalk.green(`✅ 创建项目目录: ${projectName}`))

// 复制模板文件
function copyTemplate(src, dest) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true })
    fs.readdirSync(src, { withFileTypes: true }).forEach(entry => {
      if (entry.name === 'node_modules') return
      copyTemplate(path.join(src, entry.name), path.join(dest, entry.name))
    })
  } else {
    // 统一转换为LF行尾
    const content = fs.readFileSync(src, 'utf8')
    fs.writeFileSync(dest, content.replace(/\r\n/g, '\n'), 'utf8')
    fs.chmodSync(dest, stat.mode)
  }
}

// 生成.gitignore
function createGitIgnore() {
  const content = `
# Node.js
node_modules/
dist/
.env
.env.local

# Logs
logs/
*.log
npm-debug.log*

# IDE
.idea/
.vscode/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`
  fs.writeFileSync(path.join(projectDir, '.gitignore'), content.trim())
}

// 执行复制
try {
  console.log(chalk.cyan('📁 正在复制模板文件...'))
  copyTemplate(templateDir, projectDir)
  createGitIgnore()
  console.log(chalk.green('✅ 模板文件复制完成'))
} catch (err) {
  console.error(chalk.red(`❌ 模板复制失败: ${err.message}`))
  process.exit(1)
}

// 询问是否安装依赖
inquirer.prompt([
  {
    type: 'confirm',
    name: 'install',
    message: '是否要自动安装依赖?',
    default: true
  }
]).then(answers => {
  if (answers.install) {
    try {
      process.chdir(projectDir)
      console.log(chalk.cyan('📦 正在安装依赖...'))
      execSync('npm install', { stdio: 'inherit' })
      console.log(chalk.green('✅ 依赖安装完成'))
    } catch (err) {
      console.error(chalk.red('❌ 依赖安装失败'))
    }
  }

  console.log(chalk.greenBright('\n🎉 项目创建成功！\n'))
  console.log(`🔗 进入项目目录: ${chalk.blue(`cd ${projectName}`)}`)
  console.log(`🔥 启动开发服务器: ${chalk.blue('npm run dev')}\n`)
})
