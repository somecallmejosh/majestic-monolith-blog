'use strict';

var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  connect = require('gulp-connect'),
  del = require('del'),
  ghPages = require('gulp-gh-pages'),
  path  = require('path'),
  sass = require('gulp-sass'),
  shell = require('gulp-shell'),
  maps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify');

var paths = {
  sass: 'precompile/sass/**/*.scss',
  css: 'static/css',
  js: 'static/js',
  jsPre: 'precompile/js/**/*.js',
  jsPreProject: 'precompile/js/project/*.js',
  public: 'public'
};

gulp.task('build', ['clean'], shell.task('hugo'));

gulp.task('css', function() {
  return gulp.src(paths.sass)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.css))
    .pipe(connect.reload());
});

gulp.task('clean', shell.task('rm -rf public'));

gulp.task('default', ['watch']);

gulp.task('deploy', ['build'], function() {
  return gulp.src('./public/**/*')
    .pipe(ghPages());
});

gulp.task('javascript', function(){
  return gulp.src(paths.jsPre)
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js))
    .pipe(connect.reload());
});

gulp.task('javascript', function(){
  return gulp.src(
    [
      'node_modules/jquery/dist/jquery.js',
      paths.jsPreProject
    ])
    .pipe(concat('main.min.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['css']);
  gulp.watch(paths.jsPre, ['javascript']);
});
