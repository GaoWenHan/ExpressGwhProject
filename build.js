const esbuild = require('esbuild')
const { argv } = require('process')

const env = argv[2] || 'development'

const config = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'es2020',
  format: 'cjs',
  outfile: 'dist/index.js',
  external: ['express'],
}

if (env === 'production') {
  config.minify = true
}

esbuild.build(config).catch(() => process.exit(1))
