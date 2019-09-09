const gulp = require('gulp');
var gulpMdToHtml = require("gulp-md-to-html");
var rename = require("gulp-rename");
var insert = require('gulp-insert');
var presentation = require('gulp-markdown-html-presentation');


gulp.task('resources', () => {
    return gulp.src('resources/**/*')
        .pipe(gulp.dest('dist/resources'));
});

gulp.task('md', () => {
  return gulp.src('md-text/*.md')
  .pipe(gulpMdToHtml())
  .pipe(gulp.dest('dist/workbook'));
});

gulp.task('presentations', () => {
  return gulp.src('md-presentations/*.md')
  .pipe(presentation({
      theme: 'default'
  }))
  .pipe(gulp.dest('dist/presentations'));
});

gulp.task('default', gulp.parallel('resources', 'md', 'presentations'));