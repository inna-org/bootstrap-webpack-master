Goal for step05
> SurviveJS 24.4 Expose React Performance Utilities to Browser

Changes


Node Module Changes
npm i expose-loader react-addons-perf --save-dev
npm i react-dom --save-dev

Notes

Questions
1) Should I be loading .scss and/or .less?
{
      test: /\.scss$/,
      loaders: ['style', 'css', 'postcss', 'sass']
    }, {
      test: /\.less$/,
      loaders: ['style', 'css', 'less']
    },



Improvements Needed
1) Should I be using the react.min.js file and other .min* files for production?

Maybe Future
1) SurviveJS 24.7 Setting Up TypeScript: He does not go into it much but I should research it as it sounds useful.
