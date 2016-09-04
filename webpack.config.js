/**
 * Created by timur on 9/4/16.
 */

module.exports = {
  
  entry: {
    app: './src/entry'
  },
  
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  
  module: {
   loaders: [
     {
       test: /\.js$/,
       exclude: /node_modules/,
       loader: 'babel?cacheDirectory'
     }
   ]
  }
}