const fs = require('node:fs')
const path = require('node:path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const tsRelPaths = fs.readdirSync(path.resolve('src'), {
  encoding: 'utf-8',
  recursive: true,
})
  .filter(tsRelPath => /index\.ts$/.test(tsRelPath))
  .map(tsRelPath => tsRelPath.replace(/index.ts$/, ''))

const entry = tsRelPaths.reduce(
  (entry, tsRelPath) => ({ ...entry, [tsRelPath]: path.resolve('src', tsRelPath, 'index.ts') }), 
  {}
)

const htmlWebpackPlugin = tsRelPaths
  .map(tsRelPath => (
    new HtmlWebpackPlugin({
      filename: path.join(tsRelPath, 'index.html'),
      chunks: [
        tsRelPath
      ]
    })
  ))

module.exports = {
  entry,
  output: {
    filename: '[id].js',
    path: path.resolve('dist'),
    clean: true
  },
  plugins: [
    ...htmlWebpackPlugin,
    new CopyWebpackPlugin({
      patterns: [{
        from: 'public',
        to: 'public'
      }]
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  }
}
