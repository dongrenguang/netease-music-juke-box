const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, "./src"),
    entry: {
        vendor: ["jquery"],
        nm: ["./nm/index.js", "./nm/resource/bundle.less"]
    },
    output: {
        path: "./assets",
        publicPath: "/assets",
        filename: "[name]/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    "babel-loader?sourceRoot=./src"
                ]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js",
            minChunks: Infinity
        }),
        new ExtractTextPlugin("./[name]/resource/bundle.css")
    ]
};
