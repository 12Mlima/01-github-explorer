const path = require('path'); //boa convenção para passar a rota
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  entry: path.resolve(__dirname, 'src', 'index.tsx'), //dirname pega o diretorio onde está o arquivo com a instrução
  output: {
    path: path.resolve(__dirname, 'dist'), //arquivo para gerar com o webpack

    filename: 'bundle.js', //nome do arquivo
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], //passa um array com varias extensões de arquivos
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    hot: true,
  },

  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
  ].filter(Boolean),
  module: {
    //como nossa aplicação vai se comportar quando estiver importando cada tipo de arquivo
    rules: [
      {
        test: /\.(j|t)sx$/, //recebe uma expressão regular pra saber se o arquivo é javascript ou não
        exclude: /node_modules/, // exclui todos os arquivos nodemodules pra não fazer a conversão
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          },
        }, //basicamente é a integração entre o babel e o webpack
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
