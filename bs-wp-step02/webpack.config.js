const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const parts = require('./libs/parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  bootstrapcss: path.join(__dirname, 'node_modules/bootstrap/dist', 'css'),
  bootstrapjs: path.join(__dirname, 'node_modules/bootstrap/dist', 'js'),
  style: [
    path.join(__dirname, 'app', 'main.css')
  ],
  build: path.join(__dirname, 'build'),
  jquery: path.join(__dirname, 'node_modules/jquery/src', 'jquery.js'),
  nodemodules: path.join(__dirname, "node_modules")
};

///home/user01/workspace/project-node-webpack/node_modules/bootstrap/dist/css
//            /workspace/project-node-webpack/node_modules/bootstrap/dist/css


console.log("--------------------------- webpack.config.js");
//console.log("PATHS.app = " + PATHS.app);
//console.log("PATHS.build = " + PATHS.build);
//console.log("PATHS.style = " + PATHS.style);
//console.log("PATHS.bootstrap = " + PATHS.bootstrap);
//console.log("PATHS.jquery = " + PATHS.jquery);
//console.log("config = " + config);
//PATHS.app =
///home/user01/workspace/project-node-webpack/node_modules/bootstrap/dist/css/
///home/user01/workspace/project-node-webpack/app/main.css


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
  ]
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
      parts.extractBundle({
        name: 'vendor',
        entries: ['react']
      }),
      parts.minify(),
      //parts.exposeJQuery(PATHS),
      parts.loadBootstrapJS(PATHS.bootstrapjs),
      //parts.setupCSS(PATHS.app)
      parts.extractCSS(PATHS.style),
      parts.loadBootstrap(PATHS.bootstrapcss)
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
      parts.loadBootstrapJS(PATHS.bootstrapjs),
      parts.loadBootstrap(PATHS.bootstrapcss),
      parts.extractCSS(PATHS.style),
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
}

/*
function listAllProperties(o) {
	var objectToInspect;
	var result = [];

	for(objectToInspect = o; objectToInspect !== null; objectToInspect = Object.getPrototypeOf(objectToInspect)){
      result = result.concat(Object.getOwnPropertyNames(objectToInspect));
	}

	return result;
}

function populateFunction(arr){
    var ret = [];
    function iterateThrough(obj,elt){
        Object.keys(obj).forEach(function(curKey){
            if(typeof obj[curKey]==='object'){
                iterateThrough(obj[curKey],ul);
            }
            else{
                result = result.concat(curKey)
            }
        });
    }
    iterateThrough(arr,mainContain);
    return mainContain;
}
*/
//console.log('** webpack.config.js - POST ************************************');
//console.log("config = " + config["0"]);
//var tmp = parts.setupCSS(PATHS.app);
//console.log("tmp.host = " + tmp.host);
//console.log("setupCSS = " + tmp.module.loaders[0].loaders);
//var ret = listAllProperties(tmp);
//var ret = populateFunction(ret);
//console.log("ret = " + ret);
//console.log('================================================================');

// Run validator in quiet mode to avoid output in stats
module.exports = validate(config, {
  quiet: true
});
