var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var babel = require('gulp-babel');

gulp.task('build', () => {
    gulp.src([
        'index.js',
    ])
    .pipe(babel({presets: ['es2015']}))
    .pipe(browserify())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));

    gulp.src([
        '*.html','*.csv'
    ]).pipe(gulp.dest('dist'));

    return 1;
});

gulp.task('debug', () => {
    gulp.src([
        'index.js'
    ])
    .pipe(babel())
    .pipe(browserify())
    .pipe(gulp.dest('dist'));

    gulp.src([
        '*.html','*.csv'
    ]).pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);
gulp.task('devmode', ['debug']);

gulp.task('watch', () => {
    gulp.watch('index.js', ['default']);
});

gulp.task('watchdev', () => {
    gulp.watch('index.js', ['devmode']);
});

