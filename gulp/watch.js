'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'uglify-save-license', 'del']
});

var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', ['inject', 'temp-img'], function () {

  gulp.watch([path.join(conf.paths.src, '/html/*.html')], ['inject']);

  gulp.watch([
    path.join(conf.paths.src, '/scss/*.css'),
    path.join(conf.paths.src, '/scss/*.scss'),
    path.join(conf.paths.src, '/images/*')
  ], function(event) {
    if(isOnlyChange(event)) {
      gulp.start('styles');
      gulp.start('temp-img');
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch(path.join(conf.paths.src, '/scripts/*.js'), function(event) {
    if(isOnlyChange(event)) {
      gulp.start('scripts');
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch(path.join(conf.paths.src, '/html/*.html'), function(event) {
    if(isOnlyChange(event)) {
      gulp.start('htmlInclude');
    } else {
      gulp.start('inject');
    }
  });
});

gulp.task('temp-img', function () {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss,inc}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/')));
});