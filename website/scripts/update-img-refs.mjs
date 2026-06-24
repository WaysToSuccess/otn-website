import { readFile, writeFile, readdir } from 'fs/promises'
import { join } from 'path'

const SRC_DIR = 'src'

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) files.push(...await walk(full))
    else if (e.name.endsWith('.tsx') || e.name.endsWith('.ts')) files.push(full)
  }
  return files
}

// Replace .png/.jpg/.jpeg with .webp inside /images/... quoted strings
function replaceImgExts(src, skipFile = false) {
  if (skipFile) return src
  // Match string literals containing /images/ path
  return src.replace(/(['"`])([^'"`]*\/images\/[^'"`]+)\.(png|jpg|jpeg)(\?[^'"`]*)?\1/g, (match, q, path, _ext, query) => {
    return `${q}${path}.webp${query || ''}${q}`
  })
}

const SKIP = ['ZeitungsartikelPage', 'InternSocialMediaPage']

const files = await walk(SRC_DIR)
let changed = 0

for (const file of files) {
  const skip = SKIP.some(s => file.includes(s))
  const src = await readFile(file, 'utf8')
  const out = replaceImgExts(src, skip)
  if (out !== src) {
    await writeFile(file, out)
    console.log(`✓ ${file}`)
    changed++
  }
}
console.log(`\nUpdated ${changed} files.`)
