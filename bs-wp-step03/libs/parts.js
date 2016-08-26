const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


exports.babelES6 = function(PATHS) {
  return {
    module: {
      loaders: [
        {
          test: [/\.js$/, /\.es6$/, /\.jsx?$/],
          loader: 'babel-loader',
          exclude: [PATHS.nodemodules],
          include: PATHS.app,
          query:
          {
            presets:['react', 'es2015']
          }
        }
      ]
    }
  }
}



exports.clean = function(path) {
  console.log("--------------------------- clean - called");
  console.log("path = " + path);
  // path = PATH.build

  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        // Without `root` CleanWebpackPlugin won't point to our
        // project and will fail to work.
        root: process.cwd()
      })
    ]
  };
}

exports.setFreeVariable = function(key, value) {
  console.log("--------------------------- setFreeVariable - called");
  console.log("key = " + key);
  console.log("value = " + value);
  // key = process.env.NODE_ENV
  // value = production

  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
}


exports.extractBundle = function(options) {
  console.log("--------------------------- extractBundle - called");
  console.log("options = " + options);
  /* options = {
                  name:'vendor',
                  entries: ['react']
               }
  */
  const entry = {};
  entry[options.name] = options.entries;
  return {
    // Define an entry point needed for splitting.
    entry: entry,
    plugins: [
      // Extract bundle and manifest files. Manifest is
      // needed for reliable caching.
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, 'manifest']
      })
    ]
  };
}

exports.minify = function() {
  console.log("--------------------------- minify - called");
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        // Don't beautify output (enable for neater output)
        beautify: false,
        // Eliminate comments
        comments: false,
        // Compression specitic options
        compress: {
          warnings: false,
          // Drop 'console' statements
          drop_console: false
        },
        // Mangling specific options
        mangle: {
          // Don't mangle $
          //except: ['webpackJson'],
          // Don't care about IE8
          //screw_ie8: true,
          // Don't managle function names
          //keep_fnames: true
        }
      })
    ]
  };
}

exports.loadBootstrapJS = function (paths) {
  console.log("--------------------------- loadBootstrapJS - called");
  console.log("loadBootstrapJS.paths = " + paths);
  return {
    module: {
      loaders: [
        {
          test: /bootstrap\/js\//,
          loader: 'imports?jQuery=jquery'
        }
      ]
    }
  }
}

exports.extractCSS = function(PATHS) {
  console.log("--------------------------- extractCSS - called");
  //console.log("paths = " + paths);

  return {
    module: {
      loaders: [
        // Extract CSS during build
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
          include: PATHS.css,
          exclude: PATHS.nodemodules
        }
      ]
    },
    plugins: [
      // Output extracted CSS to a file
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
  };
}

exports.loadBootstrap = function(paths) {
  console.log("--------------------------- loadBootstrap - called");
  console.log("loadBootstrap.paths = " + paths);
  // paths = PATHS.bootstrapcss
  return {
    module: {
      loaders: [
        /* StackExchange: eot, tf & svg arent that useful anymore. Just use
           woff2 and woff (in that order) http://stackoverflow.com/questions/37464264/should-i-be-using-webpack-with-fonts */
        /* Another idea is that I need a loder for .less
           https://github.com/mtscout6/react-bootstrap-getting-started/blob/step-5-solution/webpack.config.babel.js
           { test: /\.less/, loader: 'style!css!less' },
        */
        {
          test: /\.css$/,
          //loaders: ['style-loader', 'css-loader'],
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
          include: paths
        },
        {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/octet-stream'
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=image/svg+xml'
        }
      ]
    }
  };
}

exports.devServer = function(options) {
  return {
    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,
      // Unlike the cli flag, this doesn't set
      // HotModuleReplacementPlugin!
      hot: true,
      inline: true,
      // Display only errors to reduce the amount of output.
      stats: 'errors-only',
      // Parse host and port from env to allow customization.
      //
      // If you use Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: options.host, // Defaults to `localhost`
      port: options.port // Defaults to 8080
    },
    plugins: [
      // Enable multi-pass compilation for enhanced performance
      // in larger projects. Good default.
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]
  };
}


/*==============================*/












/*
exports.setupCSS = function(paths) {
  console.log("--------------------------- setupCSS - called");
  console.log("paths = " + paths);
  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css'],
          include: paths
        }
      ]
    }
  };
}





exports.exposeJQuery = function(PATHS) {
  console.log("--------------------------- exposeJQuery - called");
  //console.log("exposeJQuery.paths = " + paths);
  console.log("resolvejquery = " + require.resolve("jquery"));
  console.log("paths works or not: " + PATHS.app);
  return {
    module: {
      loaders: [
        {
          //test: require.resolve('jquery'),
          test: /\.js$/,
          //no good - loader: 'expose?$!expose?jQuery!jquery',
                    //loader: 'expose?$!expose?jQuery!jquery', //from bootstrap-webpack doc
          // this on works with no error
          loader: 'expose?jQuery!expose?$',

          include: PATHS.jquery,
          exclude: PATHS.nodemodules
        }
      ]
    }
  }
}
*/
/*
console.log('** parts.js *******************************************');

console.log('================================================================');
*/
