import { minify } from 'rollup-plugin-swc-minify'
import { createPathTransform } from 'rollup-sourcemap-path-transform'
import copy from 'rollup-plugin-copy'
import serve from 'rollup-plugin-serve'
import liveReload from 'rollup-plugin-livereload'

let build

if (process.env.ROLLUP_SERVE) {
  build = {
    input: 'src/index.js',
    output: [
      { file: 'dist/index.mjs', format: 'es', sourcemap: true },
    ],
    plugins: [
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
    prefixes: {
      '*src/': '/piwo/'
    },
    requirePrefix: true
  })
  const plugins = [minify()]
  build = {
    input: 'src/index.js',
    output: [
      { file: 'dist/index.mjs', format: 'es', sourcemap: true, sourcemapPathTransform },
      { file: 'dist/index.min.mjs', format: 'es', sourcemap: true, sourcemapPathTransform, plugins },
      { file: 'dist/index.cjs', format: 'cjs', sourcemap: true, sourcemapPathTransform },
      { file: 'dist/index.js', format: 'iife', sourcemap: true, sourcemapPathTransform },
      { file: 'dist/index.min.js', format: 'iife', sourcemap: true, sourcemapPathTransform, plugins }
    ],
    plugins: [
      copy({
        targets: [
          { src: 'dist/index.min.mjs*', dest: 'web/static/js' }
        ]
      })
    ]
  }
}

export default build
