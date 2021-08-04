const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
    configureWebpack: {
        plugins: [
            new WebpackManifestPlugin(),
        ],
        optimization: {
            splitChunks: false
        },
    }
}