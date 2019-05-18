const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    module: {
        rules: [
            {
              test: /\.tsx?$/,
              loader: 'awesome-typescript-loader',
              exclude: /node_modules/
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                // loader: 'file-loader',
                use: {
                    loader: "url-loader",
                    options: {
                      // Limit at 50k. Above that it emits separate files
                      limit: 50000,
                      mimetype: "application/font",
                      // Output below fonts directory
                      name: "./fonts/[name].[ext]"
                    }
                }
            }
        ]
    },
    plugins:[
       new HtmlWebpackPlugin({
          template: './index.html'
       })
    ]
};