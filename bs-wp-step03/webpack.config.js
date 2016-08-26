const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const parts = require('./libs/parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  bootstrapCSS: path.join(__dirname, 'node_modules/bootstrap/dist', 'css'),
  bootstrapJS: path.join(__dirname, 'node_modules/bootstrap/dist', 'js'),
  style: path.join(__dirname, 'app', 'main.css'),
  build: path.join(__dirname, 'build'),
  jquery: path.join(__dirname, 'node_modules/jquery/src', 'jquery.js'),
  nodemodules: path.join(__dirname, "node_modules"),
  libs: path.join(__dirname, 'libs')
};
// Entry accepts a path or an object of entries.
// We'll be using the latter form given it's
// convenient with more complex configurations.
const common = {
  entry: {
    style: PATHS.style,
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      //title: 'Webpack demo'
      template: PATHS.app + '/index.html'
    })
  ],
  // Important! Do not remove '', If you do, imports without
  // an extension won't work anymore!
  resolve: {
    extensions: ['', '.json', '.js', '.jsx']
  }
};

var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
  case 'build':
  case 'stats':
    console.log("--------------------------- $ npm run build - called")
    config = merge(
      common,
        {
          devtool: 'source-map',
          output: {
            path: PATHS.build,
            filename: '[name].[chunkhash].js',
            // This is used for require.ensure. The setup
            // will work without but this is useful to set.
            chunkFilename: '[chunkhash].js'
          }
        },
      parts.clean(PATHS.build),
      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      parts.babelES6(PATHS),
      parts.extractBundle({
        name: 'vendor',
        entries: ['react']
      }),
      parts.minify(),
      //parts.exposeJQuery(PATHS),
      parts.loadBootstrapJS(PATHS.bootstrapJS),
      //parts.setupCSS(PATHS.app)
      parts.loadBootstrap(PATHS.bootstrapCSS),
      parts.extractCSS(PATHS)
    );
    break;
  default:
    console.log("--------------------------- $ npm start - called");
    config = merge(
      common,
        {
          devtool: 'source-map'
        },
      //parts.setupCSS(PATHS.style),
      parts.babelES6(PATHS),
      parts.loadBootstrapJS(PATHS.bootstrapJS),
      parts.loadBootstrap(PATHS.bootstrapCSS),
      parts.extractCSS(PATHS.style),
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
}

// Run validator in quiet mode to avoid output in stats
module.exports = validate(config, {
  quiet: true
});
