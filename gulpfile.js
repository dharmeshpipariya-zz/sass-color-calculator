'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var cachebust = require('gulp-cache-bust');

gulp.task('clean', function () {
  return gulp.src('dist', { read: false })
    .pipe(clean());
});

gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(cleanCss())
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  return gulp.src('./src/*.html')
    .pipe(cachebust({ type: 'timestamp' }))
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});

gulp.task('img', function () {
  return gulp.src('./src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/assets/img'));
});

gulp.task('fonts', function () {
  gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./dist/assets/fonts'));
});

gulp.task('js', function () {
  return gulp.src('./src/js/**/*.js')
    .pipe(concat('script.js'))
    .pipe(minify({
      ext: {
        min: '.js'
      },
      noSource: true
    }))
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('./src/*.html', ['html']);
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/js/**/*.js', ['js']);
});

gulp.task('serve', function () {
  connect.server({
    root: './dist',
    livereload: true
  });
});

gulp.task('default', ['serve', 'html', 'sass', 'img', 'fonts', 'js', 'watch']);