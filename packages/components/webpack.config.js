const MiniCssExtractPlugin      = require("mini-css-extract-plugin");
const StyleLintPlugin           = require('stylelint-webpack-plugin');
const SpriteLoaderPlugin        = require('svg-sprite-loader/plugin');
const path                      = require('path');

module.exports = (env, argv) => {
    var isDevMode = ( argv.mode === "development" );
    const is_serve = isDevMode;
    
    // entry: path.join(__dirname, 'src', 'index.js'),
    return ({
        entry: {
            // index: path.join(__dirname, 'src', 'index.js'),
            button: path.resolve(__dirname, 'src' ,'components/button/index.js'),
            label: path.resolve(__dirname, 'src' , 'components/label/index.js'),
        },
        output: {
            path: path.resolve(__dirname, 'lib'),
            filename: "[name].js",
            libraryExport: 'default',
            library: ["deriv-component", "[name]"],
            libraryTarget: 'umd',
        },
        optimization : {
            minimize: true,
            splitChunks: {
                chunks: 'all'
            }
        },
        devServer: {
            publicPath: '/dist/',
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(s*)css$/,
                    use: [
                        'css-hot-loader',
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true },
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: true },
                        }
                ]
                },  
                {  
                    test: /\.svg$/,
                    use: [
                        {
                            loader: 'svg-sprite-loader',
                            options: {
                                extract: true,
                                spriteFilename: 'bot-sprite.svg',
                            },
                        },
                        {
                            loader: 'svgo-loader',
                            options: {
                                plugins: [
                                    { removeUselessStrokeAndFill: false },
                                    { removeUnknownsAndDefaults: false },
                                ],
                            },
                        },
                    ],
                },
            ( !is_serve ? {
                        enforce: "pre",
                        test: /\.(js|jsx)$/,
                        exclude: [/node_modules/],
                        loader: "eslint-loader",
                        options: {
                            fix: true
                        },
                    } :{}),                
                {
                    test   : /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader : 'babel-loader',
                },
            ],
        },
        plugins: [
            // new MiniCssExtractPlugin({ filename: 'component.css' }),
            new StyleLintPlugin( { fix: true }),
            new SpriteLoaderPlugin(),
        ],
    });
}
