var gulp = require('gulp');
var browserSync = require('browser-sync').create();
const exec = require('child_process').exec;

gulp.task('js-watch', ['test'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('test', function (cb) {
    exec('npm run localTest --silent', {maxBuffer: 1024 * 1024}, function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(error);
    })
});

gulp.task('default', ['test'], function () {
    browserSync.init({
        server: {
            baseDir: "./coverage"
        }
    });

    gulp.watch('test/*.js', ['js-watch'])
    gulp.watch('*.js', ['js-watch'])
});