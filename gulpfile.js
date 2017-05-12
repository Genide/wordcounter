var gulp = require('gulp');
var browserSync = require('browser-sync').create();
const exec = require('child_process').exec;
const eslint = require('gulp-eslint');

gulp.task('js-watch', ['test'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('test', ['lint'], function (cb) {
    exec('npm run localTest --silent', {maxBuffer: 1024 * 1024}, function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(error);
    })
});

gulp.task('lint', () => {
    return gulp.src(['**/*.js','!node_modules/**','!coverage/**'])
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
})

gulp.task('default', ['test'], function () {
    browserSync.init({
        server: {
            baseDir: "./coverage"
        }
    });

    gulp.watch('test/*.js', ['js-watch'])
    gulp.watch('*.js', ['js-watch'])
});