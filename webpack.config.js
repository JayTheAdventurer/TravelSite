const { Server } = require('http')
const { loader } = require('mini-css-extract-plugin')
const path = require('path') //initalize new const var path
//css plugins that are used by css, and must be recognised by webpack
const postCSSplugins = [ 
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer')
]
//Bundler export file//
module.exports = {
    entry: './app/assets/scripts/App.js', //webpack.config.js calls on app.js 
    output: {
        filename: 'bundled.js', //huge web file writes to bundled.js
        path: path.resolve(__dirname, 'app') //use the directory 'app'
    },
    //replaces the watch property, updates and refreshes changes immediately for us
    devServer:{ 
        before: function(app, server){
            server._watch('./app/**/*.html')
        },

        contentBase: path.join(__dirname, 'app'),
        hot: true,
        port: 3000,
        host:'0.0.0.0'
    },

    mode: 'development',
   // watch: true, //watches for file changes after compiling the code 'nrm run dev'
   
    //css options code
    module:{
        //sets when the webpack should bundle and use the css code
        rules:[
            {
                test: /\.css$/i, //if the fille is a .css file
                use: ['style-loader','css-loader', {loader: 'postcss-loader', options:{ postcssOptions: {plugins: postCSSplugins}} }  ]
            }//use the style, css loader, and post css loader, with these plugins and our manual settings
        ]
    }
}