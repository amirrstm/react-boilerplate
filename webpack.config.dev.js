import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import HardSourceWebpackPlugin from "hard-source-webpack-plugin";

export default {
    resolve: {
        extensions: ["*", ".js", ".jsx", ".json"],
        alias: {
            "react-dom": "@hot-loader/react-dom"
        }
    },
    devtool: "cheap-module-eval-source-map",
    entry: [
        "./app/webpack-public-path",
        "react-hot-loader/patch",
        "webpack-hot-middleware/client?reload=true",
        path.resolve(__dirname, "app/index.js") // Defining path seems necessary for this to work consistently on Windows machines.
    ],
    target: "web",
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"), // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: "/",
        filename: "bundle.js"
    },
    plugins: [
        new HardSourceWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            // Create HTML file that includes references to bundled CSS and JS.
            template: "app/resources/index.ejs",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                use: ["file-loader"]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            mimetype: "application/font-woff"
                        }
                    }
                ]
            },
            {
                test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            mimetype: "application/octet-stream"
                        }
                    }
                ]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            mimetype: "image/svg+xml"
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /(\.css|\.scss|\.sass)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [require("autoprefixer")],
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: [
                                path.resolve(__dirname, "app", "scss")
                            ],
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    }
};
