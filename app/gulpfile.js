var gulp = require('gulp'),
    bower = require('gulp-bower'),
    gulpFilter = require('gulp-filter'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish');

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

gulp.task('lint', function () {
    return gulp.src(['js/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish))
        .pipe(jshint.reporter("fail"));
});
