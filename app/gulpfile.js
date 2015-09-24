var gulp = require('gulp'),
    bower = require('gulp-bower'),
    gulpFilter = require('gulp-filter');

gulp.task('bower-install', function () {
    return (function () {
        return bower();
    }());
});

gulp.task('bower', ['bower-install'], function () {
    var jsFilter = gulpFilter('**/*.min.js');

    return gulp.src('bower_components/**')
        .pipe(jsFilter)
        .pipe(gulp.dest('vendor'));
});

