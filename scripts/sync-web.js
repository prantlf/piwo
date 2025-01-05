import { copyFile, readFile, writeFile, unlink } from 'node:fs/promises'
import pkg from '../package.json' with { type: 'json' }

async function copyExample(name) {
  let content = await readFile(`examples/${name}.html`, 'utf8')
  content = content
    .replace('{version}', pkg.version)
    .replace('../dist/index.mjs', 'index.min.mjs')
  await writeFile(`../piwo-pages/${name}.html`, content)
}

async function writeIndex() {
  const content = await readFile('index.html', 'utf8')
  await Promise.all([
    writeFile('../piwo-pages/index.html', content),
    unlink('index.html')
  ])
}

await Promise.all([
  copyFile('dist/index.min.mjs', '../piwo-pages/index.min.mjs'),
  copyFile('dist/index.min.mjs.map', '../piwo-pages/index.min.mjs.map'),
  copyFile('examples/event-logger.js', '../piwo-pages/event-logger.js'),
  writeIndex(),
  copyExample('login'),
  copyExample('login-schema'),
  copyExample('person'),
  copyExample('person-schema'),
  copyExample('search'),
  copyExample('search-schema'),
  copyExample('widget'),
  copyExample('widget-schema')
])
