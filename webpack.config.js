const fs = require('node:fs')
const path = require('node:path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const WebpackBundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

let workFolderNumbersWithTSXFiles = []

const tsRelPaths = fs.readdirSync(path.resolve('src'), {
  encoding: 'utf-8',
  recursive: true,
})
  .filter(tsRelPath => /index\.ts(x)?$/.test(tsRelPath))
  .map(tsRelPath => {
    if (/\.tsx$/.test(tsRelPath)) {
      const match = tsRelPath.match(/\d+/);

      if (match) {
        workFolderNumbersWithTSXFiles.push(match[0])
      }
    }

    return tsRelPath.replace(/index.ts(x)?$/, '')
  })

const entry = tsRelPaths.reduce((entry, tsRelPath) => {
  const match = tsRelPath.match(/\d+/)
  
  let number = null
  if (match) {
    number = match[0]
  }

  let extention = 'ts'
  if (number && workFolderNumbersWithTSXFiles.some((numberOfWorkFolderWithTSXFile) => numberOfWorkFolderWithTSXFile === number)) {
    extention = 'tsx'
  }

  return (
    { ...entry, [tsRelPath]: path.resolve('src', tsRelPath, `index.${extention}`) }
  )
}, 
{})

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
    }),
    // new WebpackBundleAnalyzerPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: 'ts-loader'
      }
    ]
  }
}
