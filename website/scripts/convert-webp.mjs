import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname, basename } from 'path'

const DIRS = [
  'public/images/Sponsor/Dabei',
  'public/images/Sponsor/Bearbeitung - Raus',
  'public/images',
]

async function convertDir(dir) {
  let files
  try { files = await readdir(dir) } catch { return }
  for (const file of files) {
    const ext = extname(file).toLowerCase()
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue
    const src = join(dir, file)
    const dst = join(dir, basename(file, ext) + '.webp')
    try {
      const info = await stat(src)
      await sharp(src)
        .webp({ quality: 82, effort: 6 })
        .toFile(dst)
      const out = await stat(dst)
      console.log(`✓ ${file} → ${basename(dst)}  ${Math.round(info.size/1024)}KB → ${Math.round(out.size/1024)}KB`)
    } catch (e) {
      console.error(`✗ ${file}: ${e.message}`)
    }
  }
}

for (const dir of DIRS) await convertDir(dir)
console.log('\nDone.')
