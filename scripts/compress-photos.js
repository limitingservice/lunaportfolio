const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'public', 'photos');
const MAX_EDGE = 2400;
const QUALITY = 80;

async function compressDir(dir) {
    const entries = fs.readdirSync(dir);
    for (const name of entries) {
        const full = path.join(dir, name);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
            await compressDir(full);
            continue;
        }
        if (!/\.(jpe?g|png)$/i.test(name)) continue;

        const beforeKB = (stat.size / 1024).toFixed(0);
        const tmp = full + '.tmp';

        const meta = await sharp(full).rotate().metadata();
        const longest = Math.max(meta.width || 0, meta.height || 0);
        const pipeline = sharp(full).rotate();
        if (longest > MAX_EDGE) {
            pipeline.resize({
                width: meta.width >= meta.height ? MAX_EDGE : undefined,
                height: meta.height > meta.width ? MAX_EDGE : undefined,
            });
        }
        await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(tmp);

        fs.renameSync(tmp, full);
        const afterKB = (fs.statSync(full).size / 1024).toFixed(0);
        console.log(`${name}: ${beforeKB}KB -> ${afterKB}KB`);
    }
}

(async () => {
    console.log(`Compressing ${ROOT} (max edge ${MAX_EDGE}px, q${QUALITY})...`);
    await compressDir(ROOT);
    console.log('Done.');
})();
