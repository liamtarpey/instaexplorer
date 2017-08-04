var config = {
    entry: './src/index.js',
    output: {
        path: __dirname + 'dist',
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'babel-loader'
                    }
                }
            }
        ]
    }
};

module.exports = config;
