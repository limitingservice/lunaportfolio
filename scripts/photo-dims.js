const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'public', 'photos');

async function walk(dir, out) {
    for (const name of fs.readdirSync(dir)) {
        const full = path.join(dir, name);
        if (fs.statSync(full).isDirectory()) {
            await walk(full, out);
        } else if (/\.(jpe?g|png)$/i.test(name)) {
            const meta = await sharp(full).metadata();
            const rel = '/' + path.relative(path.join(__dirname, '..', 'public'), full).replace(/\\/g, '/');
            out[rel] = { w: meta.width, h: meta.height };
        }
    }
}

(async () => {
    const dims = {};
    await walk(ROOT, dims);
    console.log(JSON.stringify(dims, null, 2));
})();
