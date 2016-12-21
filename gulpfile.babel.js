'use strict';

// import
import gulp from 'gulp';
import source from 'vinyl-source-stream';
import browserify from 'browserify';
import babelify from 'babelify';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import decodecode from 'gulp-decodecode';
import browserSync from 'browser-sync';
import watch from 'gulp-watch';


// const
const SRC = './src';
const HTDOCS = './docs';
const DEST = './dist';


gulp.task('browserify', () => {
  return browserify(`${SRC}/script.js`)
    .transform(babelify)
    .bundle()
    .pipe(source('script.js'))
    .pipe(gulp.dest(`${DEST}/js`))
  ;
});

gulp.task('minify', () => {
  return gulp.src(`${DEST}/js/script.js`)
    .pipe(uglify({}))
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest(`${DEST}/js`))
  ;
});

gulp.task('deco', () => {
  return gulp.src(`${DEST}/js/script.js`)
    .pipe(decodecode({
      decoArr: ['b', 'u', 't', 'c', 'h', 'i'],
    }))
    .pipe(rename('script.deco.js'))
    .pipe(gulp.dest(`${DEST}/js`))
    .pipe(gulp.dest(`${HTDOCS}/js/lib`))
  ;
});

gulp.task('js', gulp.series('browserify', gulp.parallel('minify', 'deco')));


gulp.task('browser-sync' , () => {
  browserSync({
    server: {
      baseDir: HTDOCS,
    },
    startPath: '/',
    ghostMode: false,
  });

  watch([`${SRC}/*.js`], gulp.series('js', browserSync.reload));
});


gulp.task('build', gulp.series('js'));
gulp.task('default', gulp.series('js'));