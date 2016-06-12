var gulp = require('gulp');
var gulp_uglify = require('gulp-uglify');
var gulp_browserify = require('gulp-browserify');

gulp.task('build', function() {
  gulp.src([
    '*.js'
  ]).pipe(gulp_browserify())
    .pipe(gulp_uglify())
    .pipe(gulp.dest('dist'));

  gulp.src([
    '*.html'
  ]).pipe(gulp.dest('dist'))

  return 1
});



gulp.task('debug', function() {
  gulp.src([
    'index.js','index.html'
  ]).pipe(gulp_browserify())
    .pipe(gulp.dest('dist'));

  gulp.src([
    '*.html'
  ]).pipe(gulp.dest('dist'))


});

gulp.task('default', ['build']);
gulp.task('devmode', ['debug']);

gulp.task('watch', function() {
  gulp.watch('src/hab.js/hab.js', ['default']);
});

gulp.task('watchdev', function() {
  gulp.watch('src/hab.js/hab.js', ['devmode']);
});


// Handle the error
function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}
