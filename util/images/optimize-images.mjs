// =====================================================================
// Image optimizer — converts raw JPEGs in /raw-assets to optimized WebP
// in /public/images (mirrored structure). Also generates the OG image and
// an apple-touch-icon. Re-run any time with `yarn images:optimize`.
//
// Source JPEGs live in /raw-assets (gitignored) so the committed repo only
// ships lightweight WebP. next/image still serves AVIF/resized variants at
// runtime on top of these.
// =====================================================================

import { existsSync } from 'node:fs'
import { mkdir, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', '..')
const SRC_DIR = path.join(ROOT, 'raw-assets')
const OUT_DIR = path.join(ROOT, 'public', 'images')

// Photo content: cap the largest edge — next/image resizes down per breakpoint.
const MAX_WIDTH = 1600
const QUALITY = 78

const IMG_RE = /\.(jpe?g|png)$/i

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(full)))
    } else if (IMG_RE.test(entry.name)) {
      files.push(full)
    }
  }
  return files
}

async function convert(srcPath) {
  const rel = path.relative(SRC_DIR, srcPath)
  const outPath = path.join(OUT_DIR, rel).replace(IMG_RE, '.webp')
  await mkdir(path.dirname(outPath), { recursive: true })

  const image = sharp(srcPath).rotate()
  const meta = await image.metadata()

  const pipeline = image
    .resize({
      width: Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH),
      withoutEnlargement: true
    })
    .webp({ quality: QUALITY, effort: 6 })

  const info = await pipeline.toFile(outPath)
  const before = (await stat(srcPath)).size
  return { rel: rel.replace(IMG_RE, '.webp'), before, after: info.size }
}

async function makeOgImage() {
  const src = path.join(SRC_DIR, 'kitchens', 'trinity-light.jpg')
  if (!existsSync(src)) return null
  const outPath = path.join(OUT_DIR, 'og', 'og-image.webp')
  await mkdir(path.dirname(outPath), { recursive: true })
  const info = await sharp(src)
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'centre' })
    // subtle warm darkening so overlaid brand text reads well
    .modulate({ brightness: 0.92 })
    .webp({ quality: 82 })
    .toFile(outPath)
  return { rel: 'og/og-image.webp', after: info.size }
}

async function makeAppleIcon() {
  const src = path.join(ROOT, 'public', 'favicon.svg')
  if (!existsSync(src)) return null
  const outPath = path.join(ROOT, 'public', 'apple-touch-icon.png')
  const info = await sharp(src, { density: 384 })
    .resize(180, 180, {
      fit: 'contain',
      background: { r: 64, g: 49, b: 42, alpha: 1 }
    })
    .flatten({ background: { r: 64, g: 49, b: 42 } })
    .png()
    .toFile(outPath)
  return { rel: 'apple-touch-icon.png', after: info.size }
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`

async function main() {
  if (!existsSync(SRC_DIR)) {
    console.error(`✗ Source folder not found: ${SRC_DIR}`)
    process.exit(1)
  }

  const files = await walk(SRC_DIR)
  console.log(`Optimizing ${files.length} image(s) → WebP …\n`)

  let totalBefore = 0
  let totalAfter = 0

  for (const file of files) {
    const { rel, before, after } = await convert(file)
    totalBefore += before
    totalAfter += after
    console.log(`  ✓ ${rel.padEnd(34)} ${kb(before)} → ${kb(after)}`)
  }

  const og = await makeOgImage()
  if (og) console.log(`  ✓ ${og.rel.padEnd(34)} ${kb(og.after)}`)

  const apple = await makeAppleIcon()
  if (apple) console.log(`  ✓ ${apple.rel.padEnd(34)} ${kb(apple.after)}`)

  const saved = totalBefore - totalAfter
  const pct = totalBefore ? ((saved / totalBefore) * 100).toFixed(0) : 0
  console.log(
    `\nDone. ${kb(totalBefore)} → ${kb(totalAfter)} (−${pct}%, saved ${kb(saved)}).`
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
