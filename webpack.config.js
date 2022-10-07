const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
 
module.exports = {
    mode: 'development',
    entry: path.join(__dirname+ '/src'+ '/main.js'),
    output: {
        path: path.join(__dirname+'/dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  'sass-loader'
                ]
              },
              {
                test: /\.css$/,
                use: [
                  'vue-style-loader',
                  'css-loader'
                ]
              }
        ],
 
    },    
    plugins: [
        new VueLoaderPlugin()
    ],
    devServer: {
        static: {
          directory: path.join(__dirname),
        },
        compress: true,
        port: 8080,
      },
}