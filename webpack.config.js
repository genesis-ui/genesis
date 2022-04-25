const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    const mode = env.WEBPACK_SERVE ? 'development' : 'production';

    let exports = {
        mode: mode,
        entry: {
            'genesis': './src/js/GenesisApp.js',
        },
        plugins: [],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'genesis-ui.js',
            library: {
                name: 'Genesis',
                type: 'umd'
            },
            publicPath: '/'
        },
        externals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
        },
        resolve: {
            extensions: ['.js']
        },
        module: {
            rules: [
                {
                    test: /\.(txt|md)$/i,
                    use: [
                        {
                            loader: 'raw-loader',
                            options: {
                                esModule: false,
                            }
                        }
                    ],
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-react'],
                            plugins: [
                                '@babel/plugin-transform-react-jsx',
                                '@babel/plugin-transform-runtime'
                            ],
                            comments: false,
                        }
                    }
                },
            ],
        },
    }

    if (mode === 'development') {
        exports.devServer = {
            host: 'latus.local',
            static: path.join(__dirname, 'dist'),
            port: 9000,
            historyApiFallback: true,
            devMiddleware: {
                writeToDisk: true
            }
        };

        exports.plugins.push(new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/templates/index.html',
            chunks: ['index']
        }));
    }

    return exports;
};