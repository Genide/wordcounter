var gulp = require('gulp');
var browserSync = require('browser-sync').create();
const exec = require('child_process').exec;
const eslint = require('gulp-eslint');
const changedInPlace = require('gulp-changed-in-place');
const babel = require('gulp-babel');
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

gulp.task('lint all', () => {
    return gulp.src(['**/*.js', '!node_modules/**', '!coverage/**'])
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('js_lint_in_place', () => {
    return gulp.src(['./src/*.js', './test/*.js'])
        .pipe(changedInPlace())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
});

gulp.task('babel_changed', () => {
    return gulp.src("src/**/*.js")
        .pipe(changed("dist"))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest("dist"));
});

gulp.task('babel_all', () => {
    return gulp.src("src/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest("dist"));
});

gulp.task('tslint_all', () => {
    return tsProject.src()
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

gulp.task('ts_lint_in_place', () => {
    return tsProject.src()
        .pipe(changedInPlace())
        .pipe(tslint({
            formatter: "verbose"
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
    var jsWatcher = gulp.watch(['./src/*.js', './test/*.js'], gulp.series(['js_lint_in_place', 'test', 'babel_changed', 'reload']));
    var tsWatcher = gulp.watch(['./src/*.ts'], gulp.series(['ts_lint_in_place', 'test', 'tsc_changed', 'reload']));
    // watcher.on('change', (path, stats) => {
    //     console.log(path + ' was changed');
    // });
    // This is needed to keep the watcher going if there is an ESLint or test error
    jsWatcher.on('error', swallowError);
    tsWatcher.on('error', swallowError);
    done();
});

gulp.task('default', gulp.series('lint all', 'test', 'ccView', 'watch'));