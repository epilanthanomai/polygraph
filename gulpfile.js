const gulp = require('gulp');
const browserify = require('gulp-browserify');
const uglify = require('gulp-uglify');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const postcss = require('./lib/css');

gulp.task('js', () => {
  gulp.src('client/js/root.js')
      .pipe(browserify())
      .pipe(uglify())
      .pipe(gulp.dest('build/js'));
});

gulp.task('css', () => {
  gulp.src('client/css/site.css')
      .pipe(postcss)
      .pipe(gulp.dest('build/css'));
});

gulp.task('html', () => {
  gulp.src('views/*.pregen.pug')
      .pipe(pug())
      .pipe(rename((opt) => {
        opt.basename = opt.basename.replace(/\.pregen$/, '');
        return opt;
      }))
      .pipe(gulp.dest('build/html'));
});

gulp.task('default', ['js', 'css', 'html']);
