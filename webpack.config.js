//Ներմուծում է node-ից դիրեկտորիաներ հետ աշխատելու մոդուլը, որը կտրվի path փոփոխականին
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MiniCssPlagin = require('optimize-css-assets-webpack-plugin');
const TesterJsPlagin = require('terser-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
//կախված isDev-ի արժեքից ֆայլերի անվանումները կամ կլինեն նորմալ, կամ էլ կոդավորված տարբերակով
const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;
optimization =() =>{
    const config = {
        splitChunks: {
            chunks: 'all'
        } 
     }
     if(isProd){
         config.minimizer = [
            new MiniCssPlagin(),
            new TesterJsPlagin()
         ]
     }
    return config;
}
const cssLoaders = otherLoader =>{
    const loaders =  [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
            publicPath: './',
            //hmr: isDev,
            },
        },
        'css-loader',
    ];
    if(otherLoader){
        loaders.push(otherLoader)
    }
    return loaders
};
const babelLoaders = otherPreset => {
    const useFn = [
        {
         loader: 'babel-loader',
         options: {
             presets: [
                 '@babel/preset-env',
             ],
         plugins: [
             '@babel/plugin-proposal-class-properties'
         ]
         }
     }
 ];
 if(otherPreset){
    useFn[0]['options']['presets'].push(otherPreset);
  } 
 return   useFn
};

const pluginWithAnlz = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd,
            }
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({ 
            patterns: [{ 
                from: path.resolve(__dirname, 'src/img/'),
                to: path.resolve(__dirname, 'dist/img')
             }] 
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        })
    ];
    if(isProd){
      base.push(new BundleAnalyzerPlugin())
    }
    return base;
 };

module.exports = {
    //ընթացիկ թղթապանակի ճանապարհն է
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: ['@babel/polyfill','./js/index.js'],
    },
    output: {
        filename: filename('js'),
        // ընթացիկ դիրեկտորիայում կստեղծի dist անունով թղթապանակ, որտեղ կլինի վերջնական ֆայլը՝ bundle.js
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.png', '.json', '.xml', '.less'],
        alias: {
        //@-ով սկսվողը պարտադիր վերցրվում է ''-ի մեջ
         '@': path.resolve(__dirname, 'src'),
         '@css' : path.resolve(__dirname, 'src/css'),
         "@img": path.resolve(__dirname, 'src/img'),
         "@modulesJs": path.resolve(__dirname, 'src/js')
        }
    },
    optimization: optimization(),
    devtool: (isDev) ? 'source-map' : false,
    devServer: {
        port: 9000,
        open: true
        //hot: isDev
      },
    plugins:pluginWithAnlz(),
    module:{
        rules:[
            {
                test: /\.css$/,
                use:cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/, //sass կամ scss
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use:['file-loader']
            },
            {
                test:/\.(ttf|woff|woff2|eot)$/,
                use:['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, //հաշվի չառնել node_module-ը
                use: babelLoaders()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/, //հաշվի չառնել node_module-ը
                use: babelLoaders('@babel/preset-typescript')
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/, //հաշվի չառնել node_module-ը
                use: babelLoaders('@babel/preset-react')
            }
        ]
    }
}