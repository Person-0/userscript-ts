const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const pkgData = require('../package.json');
const metadata = require('../metadata.json');

if (!pkgData.main) {
    throw new Error('property "main" does not exist in package.json');
}

// METADATA BUILD
let METADATA_STRING = "";
metadata.version = new Date().toUTCString();
const metaKeys = Object.keys(metadata);
const maxKeyLen = Math.max(...metaKeys.map(e => e.length));
METADATA_STRING += '// ==UserScript==\n';
for (const key of metaKeys) {
    let padding = '  ';
    const spaceReq = maxKeyLen - key.length;
    if (spaceReq > 0) {
        padding += ' '.repeat(spaceReq);
    }
    METADATA_STRING += '// @' + key + padding + metadata[key] + '\n'
}
METADATA_STRING += '// ==/UserScript==\n';
console.log('metadata:\n', METADATA_STRING);

// wrap the userscript in an IIFE to use unsafeWindow as window if available, falling back to window.
const unsfwinFuncWrapper = [
    '(function (window) {',
    '})((typeof unsafeWindow === "undefined" ? () => { return window } : () => { return unsafeWindow })());'
];

esbuild.build({
    bundle: true,
    write: false,
    platform: 'node',
    minify: true,
    banner: {
        js: METADATA_STRING + '\n' + unsfwinFuncWrapper[0]
    },
    footer: {
        js: unsfwinFuncWrapper[1]
    },
    entryPoints: [
        path.join(__dirname, '../', pkgData.main)
    ]
}).then((res) => {

    console.log('esbuild complete...');
    const bundled = res.outputFiles[0].text;

    // FINAL WRITE
    const finalPath = path.join(__dirname, '../dist/script.user.js');
    const finalDir = path.dirname(finalPath);
    if (fs.existsSync(finalDir)) {
        console.log('cleared old builds');
        fs.rmSync(finalDir, {
            recursive: true,
            force: true
        });
    }
    fs.mkdirSync(finalDir, { recursive: true });
    fs.writeFileSync(finalPath, bundled);

    console.log('script.user.js generated at', metadata.version);
    console.log('size:', bundled.length, 'bytes');

}).catch((err) => {
    console.log('esbuild error:', err);
});