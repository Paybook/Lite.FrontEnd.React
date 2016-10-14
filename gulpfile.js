var gulp = require('gulp');
var ts = require('gulp-typescript');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
 
gulp.task('tsc', function() {
    var tsProject = ts.createProject(__dirname + '/tsconfig.json');
    return gulp.src('app/**/*.ts', { base: './' })
        .pipe(ts(tsProject))
        .pipe(rename(function (path) {
            path.extname = '.babel';
        }))
        .pipe(gulp.dest('.'));
});
 
gulp.task('babel', function() {
    return gulp.src('app/**/*.babel', { base: './' })
        .pipe(babel())
        .pipe(rename(function (path) {
            path.extname = '.js';
        }))
        .pipe(gulp.dest('.'));
});
 
gulp.task('ts-babel', ['tsc', 'babel']);