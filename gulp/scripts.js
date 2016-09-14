'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'uglify-save-license', 'del']
});

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('scripts', ['scripts-bower'], function() {
    return gulp.src(
            path.join(conf.paths.src, '/js/app.js')
        )
        .pipe($.sourcemaps.init())
        .pipe($.concat('app.js'))
        .pipe($.sourcemaps.write('maps'))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/scripts/')))
        .pipe(browserSync.reload({ stream: true }))
        .pipe($.size())
});

gulp.task('scripts-bower', function() {
    return gulp.src([
    		// put out-sourced (like bower) scripts here
            path.join(conf.paths.bower, '/jquery/dist/jquery.min.js'),
    		path.join(conf.paths.bower, '/bootstrap-sass/assets/javascripts/bootstrap.min.js')
    	])
        .pipe($.sourcemaps.init())
        .pipe($.concat('libs.js'))
        .pipe($.sourcemaps.write('maps'))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/libs/')))
        .pipe(browserSync.reload({ stream: true }))
        .pipe($.size())
})
