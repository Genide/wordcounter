var gulp = require('gulp');
var browserSync = require('browser-sync').create();
const exec = require('child_process').exec;
const eslint = require('gulp-eslint');
const changedInPlace = require('gulp-changed-in-place');

var swallowError = function (error) {
    // console.log(error.name);
    // console.log(error.message);
    this.emit('end');
}

gulp.task('reload', function (done) {
    browserSync.reload();
    done();
});

gulp.task('ccView', function (done) {
    browserSync.init({
        server: {
            baseDir: "./coverage"
        }
    });
    done();
});

gulp.task('test', function (cb) {
    exec('npm run localTest --silent', { maxBuffer: 1024 * 1024 }, function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(error);
    })
});

gulp.task('lint all', () => {
    return gulp.src(['**/*.js', '!node_modules/**', '!coverage/**'])
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
})

gulp.task('lint-in-place', () => {
    return gulp.src(['./src/*.js', './test/*.js'])
        .pipe(changedInPlace())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
})

gulp.task('watch', (done) => {
    var watcher = gulp.watch(['./src/*.js', './test/*.js'], gulp.series(['lint-in-place', 'test', 'reload']));
    watcher.on('change', (path, stats) => {
        console.log(path + ' was changed');
    });
    // This is needed to keep the watcher going if there is an ESLint or test error
    watcher.on('error', swallowError);
    done();
});

gulp.task('default', gulp.series('lint all', 'test', 'ccView', 'watch'));