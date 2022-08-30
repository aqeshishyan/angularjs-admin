module.exports = {
    entry: "./app/app.js",
    resolve: {
        extensions: [".webpack.js", "web.js", ".js"]
    },
    module: {
        
    },
    mode: 'development',
    devServer: {
        compress: true,
        port: 9000,
        static: {
            directory: './app'
        }
    }
}