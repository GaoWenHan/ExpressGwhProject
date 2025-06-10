import chalk from 'chalk'

export const showBanner = () => {
  console.log(chalk.green.bold(`
   _____                      ______                      
  / ____|                    |  ____|                     
 | (___  _ __ _____      _   | |__ _ __ _____      ___ __ 
  \\___ \\| '__/ _ \\ \\ /\\ / /  |  __| '__/ _ \\ \\ /\\ / / '_ \\
  ____) | | | (_) \\ V  V /   | |  | | | (_) \\ V  V /| | | |
 |_____/|_|  \\___/ \\_/\\_/    |_|  |_|  \\___/ \\_/\\_/ |_| |_|
  `))
  console.log(chalk.blue(`
  ============================================
   Express + TypeScript Application
   Version: 1.0.0
   Environment: ${process.env.NODE_ENV}
   Started at: ${new Date().toLocaleString()}
  ============================================
  `))
}
