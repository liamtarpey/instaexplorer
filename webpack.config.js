var ExtractTextPlugin = require("extract-text-webpack-plugin");
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
    },
    plugins: [
        new ExtractTextPlugin("style.css")
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    }
};

module.exports = config;
