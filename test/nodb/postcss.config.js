module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-import')({
            path: ['/Users/guillaume/Documents/github/thorium-core-dom/test/nodb/src/app/side-left-menu-sticky/style.css'],
        }),
    ]
}