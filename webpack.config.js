var config = {
    entry: './src/index.js',
    output: {
        path: __dirname + 'dist',
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    }
};

module.exports = config;
