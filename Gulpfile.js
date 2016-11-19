'use strict';

var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  connect = require('gulp-connect'),
  ghPages = require('gulp-gh-pages'),
  htmlmin = require('gulp-htmlmin'),
  sass = require('gulp-sass'),
  shell = require('gulp-shell'),
  uglify = require('gulp-uglify');

var paths = {
  sass: 'precompile/sass/**/*.scss',
  css: 'static/css',
  js: 'static/js',
  jsPre: 'precompile/js/**/*.js',
  jsPreProject: 'precompile/js/project/*.js',
  public: 'public'
};

gulp.task('build', function(){
  return  gulp.src('CNAME')
    .pipe(shell('rm -rf public'))
    .pipe(shell('hugo'))
    .pipe(shell('gulp minify-html'))
    .pipe(shell('cp CNAME public/CNAME'))
    .pipe(shell('cp robots.txt public/robots.txt'))
    .pipe(shell('cp *.png public/'))
    .pipe(shell('cp *.svg public/'))
    .pipe(shell('cp manifest.json public/manifest.json'))
    .pipe(shell('cp browserconfig.xml public/browserconfig.xml'))
    .pipe(gulp.dest(paths.public));
});

gulp.task('css', function() {
  return gulp.src(paths.sass)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.css))
    .pipe(connect.reload());
});

gulp.task('cloudinary', function(){
  return gulp.src('precompile/js/vendor/cloudinary.js')
    .pipe(uglify())
    .pipe(gulp.dest(paths.js));
});

gulp.task('default', ['watch']);

gulp.task('deploy', ['build'], function() {
  return gulp.src('./public/**/*')
    .pipe(ghPages());
});

gulp.task('javascript', ['cloudinary'], function(){
  return gulp.src(
    [
      'node_modules/jquery/dist/jquery.js',
      'precompile/js/vendor/disqus.js',
      paths.jsPreProject
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js))
    .pipe(connect.reload());
});

gulp.task('minify-html', function(){
  return gulp.src('public/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      useShortDoctype: true
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['css']);
  gulp.watch(paths.jsPre, ['javascript']);
});
