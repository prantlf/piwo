const { importStylesheet } = require('rollup-plugin-import-stylesheet')
const sourcemaps = require('rollup-plugin-sourcemaps2')
const { minify } = require('rollup-plugin-swc-minify')
const { createPathTransform } = require('rollup-sourcemap-path-transform')
const serve = require('rollup-plugin-serve')
const liveReload = require('rollup-plugin-livereload')

let build

if (process.env.ROLLUP_SERVE) {
  build = {
    input: 'src/index.js',
    output: [
      { file: 'dist/index.mjs', format: 'es', sourcemap: true },
    ],
    plugins: [
      sourcemaps(),
      importStylesheet(),
      serve({
        open: false,
        port: 8080,
        contentBase: './',
        serveIndex: true
      }),
      liveReload({
        watch: ['examples', 'src']
      })
    ]
  }
} else {
  const sourcemapPathTransform = createPathTransform({
    prefixes: { '*src/': '/piwo/' },
    requirePrefix: true
  })
  const plugins = [minify()]
  build = [
    {
      input: 'src/index.js',
      output: [
        { file: 'dist/index.mjs', format: 'es', sourcemap: true, sourcemapPathTransform },
        { file: 'dist/index.cjs', format: 'cjs', sourcemap: true, sourcemapPathTransform },
        { file: 'dist/index.js', format: 'iife', sourcemap: true, sourcemapPathTransform },
      ],
      plugins: [
        sourcemaps(),
        importStylesheet()
      ]
    },
    {
      input: 'src/index.js',
      output: [
        { file: 'dist/index.min.mjs', format: 'es', sourcemap: true, sourcemapPathTransform, plugins },
        { file: 'dist/index.min.js', format: 'iife', sourcemap: true, sourcemapPathTransform, plugins }
      ],
      plugins: [
        sourcemaps(),
        importStylesheet({ minify: true })
      ]
    }
  ]
}

module.exports = build
