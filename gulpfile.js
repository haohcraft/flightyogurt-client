var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var watch = require('gulp-watch');
var rev = require('gulp-rev');
var tiny_lr = require('tiny-lr');
var webpack = require("webpack");
var server = require('gulp-express');

// #
// # CONFIGS
// #

var webpackConfig = require("./webpack.config.js")
if (gulp.env.production) { //# i.e. we were executed with a --production option
	webpackConfig.plugins = webpackConfig.plugins.concat(new webpack.optimize.UglifyJsPlugin());
	webpackConfig.output.filename = "main-[hash].js";
}
var lessConfig = { includePaths : ['public/styles'] }
// # paths to files in bower_components that should be copied to dist/assets/vendor
var vendorPaths = ['es5-shim/es5-sham.js', 'es5-shim/es5-shim.js', 'bootstrap/dist/css/bootstrap.css']

// #
// # TASKS
// #

gulp.task('clean', function() {
    gulp.src('dist', {read: false})
      .pipe(clean())
});

// # main.less should @include any other CSS you want
gulp.task('less', function() {
    gulp.src('public/styles/main.less')
      .pipe(less(lessConfig).on('error', gutil.log))
      .pipe(gulp.env.production =='prod' ? minifyCSS(): gutil.noop())
      .pipe(gulp.env.production == 'prod' ? rev() : gutil.noop())
      .pipe(gulp.dest('dist/assets'))
});


// # Some JS and CSS files we want to grab from Bower and put them in a dist/assets/vendor directory
// # For example, the es5-sham.js is loaded in the HTML only for IE via a conditional comment.
// 
gulp.task('vendor', function() {
    var paths = vendorPaths.map(function (p) {
    	path.resolve("./bower_components", p);
    })
    gulp.src('paths')
      .pipe(gulp.dest('dist/assets/vendor'))
});


// # Just copy over remaining assets to dist. Exclude the styles and scripts as we process those elsewhere
// 
gulp.task('copy', function() {
    gulp.src(['public/**/*', '!public/scripts', '!public/scripts/**/*', '!public/styles', '!public/styles/**/*']).pipe(gulp.dest('dist'))
});

// # This task lets Webpack take care of all the coffeescript and JSX transformations, defined in webpack.config.js
// # Webpack also does its own uglification if we are in --production mode
gulp.task('webpack', function(callback) {
	execWebpack(webpackConfig);
	callback() ;
});

gulp.task('build',['webpack','less','copy','vendor']);

gulp.task('dev',['build'], function() {
  
    server.run({
      file: './app.js'
    });


    gulp.watch(['./app.js', 'routes/**/*', './public/**/*'], [server.notify, 'build', server.run]);
    // When /dist changes, tell the browser to reload
    gulp.watch('./dist/**/*', function(evt){
    	gutil.log(gutil.colors.cyan(evt.path), 'change');
    });

});

gulp.task('default',['build'], function() {
    // Give first-time users a little help
    setTimeout(function() {
    	gutil.log("**********************************************");
	    gutil.log( "* gulp              (development build)");
	    gutil.log( "* gulp clean        (rm /dist)");
	    gutil.log( "* gulp --production (production build)");
	    gutil.log( "* gulp dev          (build and run dev server)");
	    gutil.log( "**********************************************");	
    },3000);
});


// #
// # HELPERS
// #
var execWebpack = function (config) {
	webpack(config, function(err, stats) {
		if (err) {
			throw new gutil.PluginError('execWebpack', err);
		}
		gutil.log('[execWebpack]', stats.toString({colors: "true"}));
	} );
}