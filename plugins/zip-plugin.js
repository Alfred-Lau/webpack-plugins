const jsZip = require('jszip');
const path = require('path');
const RawSource = require('webpack-sources').RawSource;
const zip = new jsZip();

module.exports = class ZipPlugin {
    constructor(opts) {
        this.opts = opts;
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('ZipPlugin', (compliation, callback) => {
            const folder = zip.folder(this.opts.filename);
            for (let filename in compliation.assets) {
                const source = compliation.assets[filename].source();

                folder.file(filename, source);
            }

            zip.generateAsync({ type: 'nodebuffer' }).then(content => {
                const outputPath = path.join(
                    compliation.options.output.path,
                    `${this.opts.filename}.zip`
                );

                const outputRelativePath = path.relative(
                    compliation.options.output.path,
                    outputPath
                );
                compliation.assets[outputRelativePath] = new RawSource(content);
                callback();
            });
        });
    }
};
