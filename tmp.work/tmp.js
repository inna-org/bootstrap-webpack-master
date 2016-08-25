gulp.task('webpack', function() {
    return gulp.src('./app/scripts/index.js')
        .pipe(webpack({
            // watch: true,
            devtool: 'source-map',
            debug: true,
            output: {
                filename: 'bundle.js',
                path: __dirname
            },
            module: {
                loaders: [
                    {
                        test: /\.html$/,
                        loader: 'underscore-template-loader',
                        query: {
                            prependFilenameComment: __dirname,
                        },
                        exclude: /node_modules/,
                    },
                    { test: /imagesloaded/, loader: 'imports?define=>false&this=>window'},
                    { test: /underscore/, loader: 'exports?_' }
                    // { test: /backbone/, loader: 'exports?Backbone!imports?underscore,jquery' }
                ]
            }
        }))
        .pipe(gulp.dest('./dist/scripts'));



/**8888888888888888888888888888888888888888888888888888*/
