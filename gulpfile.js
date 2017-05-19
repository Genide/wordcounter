var gulp = require('gulp');
var browserSync = require('browser-sync').create();
const exec = require('child_process').exec;
const changedInPlace = require('gulp-changed-in-place');
const sourcemaps = require('gulp-sourcemaps');
const changed = require('gulp-changed');
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const tslint = require("gulp-tslint");

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
        cb();
    })
});

gulp.task('tslint_all', () => {
    return tsProject.src()
        .pipe(tslint({
            formatter: "stylish"
        }))
        .pipe(tslint.report());
});

gulp.task('ts_lint_in_place', () => {
    return tsProject.src()
        .pipe(changedInPlace())
        .pipe(tslint({
            formatter: "stylish"
        }))
        .pipe(tslint.report());
});

gulp.task('tsc_all', () => {
    return tsProject.src()
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(tsProject()).js
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest("dist"));
});

gulp.task('tsc_changed', () => {
    return tsProject.src()
        .pipe(changed("dist"))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(tsProject()).js
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest("dist"));
});

gulp.task('watch', (done) => {
    var tsWatcher = gulp.watch(['./src/*.ts', './test/*.ts'], gulp.series(['ts_lint_in_place', 'test', 'tsc_changed', 'reload']));
    // tsWatcher.on('change', (path, stats) => {
    //     console.log(path + ' was changed');
    // });
    // This is needed to keep the watcher going if there is an ESLint or test error
    tsWatcher.on('error', swallowError);
    done();
});

gulp.task('default', gulp.series('tslint_all', 'test', 'ccView', 'watch'));