import fs from 'fs-extra'
import * as glob from 'glob'
import * as babel from '@babel/parser'
import pkg from '@babel/traverse'
const { default: traverse } = pkg

const srcPath = './src'
const outputFile = './locales/vi.json'
const result = {}

const files = glob.sync(`${srcPath}/**/*.{js,jsx}`)

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8')

  const ast = babel.parse(content, {
    sourceType: 'module',
    plugins: ['jsx']
  })

  traverse(ast, {
    StringLiteral({ node }) {
      const text = node.value.trim()
      if (
        text &&
        /[a-zA-ZÀ-Ỵà-ỵ]/.test(text) && // có ký tự chữ
        text.length < 100 &&
        !text.startsWith('http') &&
        !text.includes('{')
      ) {
        const key = text
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/[^a-z0-9_]/g, '')
        result[key] = text
      }
    },
    JSXText({ node }) {
      const text = node.value.trim()
      if (text && text.length < 200 && !/^[{}<>]+$/.test(text)) {
        const key = text
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // bỏ dấu tiếng Việt
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/[^a-z0-9_]/g, '')
        result[key] = text
      }
    },
    JSXAttribute({ node }) {
      if (
        ['placeholder', 'alt', 'label', 'title', 'aria-label'].includes(node.name.name)
      ) {
        const val = node.value?.value
        if (val && !/{|}/.test(val)) {
          const key = val
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^a-z0-9_]/g, '')
          result[key] = val
        }
      }
    }
  })
}

await fs.ensureDir('./locales')
await fs.writeJson(outputFile, result, { spaces: 2 })
console.log(`Extracted ${Object.keys(result).length} texts to ${outputFile}`)
