const path = require('path');
const ZipPlugin = require('./plugins/zip-plugin');

module.exports = {
    entry: path.join(__dirname, './src/index.js'),
    output: {
        filename: 'main.js',
        path: path.join(__dirname, './dist')
    },
    plugins: [new ZipPlugin({ filename: 'offline' })]
};
