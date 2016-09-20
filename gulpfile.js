"use strict";

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var concat = require("gulp-concat");
var less = require("gulp-less");
var uglify = require("gulp-uglify");
var sourcemaps = require('gulp-sourcemaps');
var pump = require('pump');
var watch = require('gulp-watch');
var cleancss = require('gulp-clean-css');
var debug = require('gulp-debug');
var _ = require('lodash');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var copy = require('gulp-copy');
var newer = require('gulp-newer');
var del = require('del');
var filesRequired = require('gulp-files-required');

var paths = {
    coreJS: [
        'js/app/*.js'
    ],

    bowerJS: [
        'lib/jquery/dist/jquery.js',
        'lib/bootstrap/dist/js/bootstrap.js',
    ],

    coreLess: [
        ''
    ],

    bowerCSS: [
        'lib/bootstrap/dist/css/bootstrap.css',
    ],
    outputFolders: [ //supports the cleaning
        'dist/css/*',
        'dist/js/*',
        'dist/sourcemaps/*'
    ]
}

// Static Server
gulp.task('serve', function () {

    browserSync.init({
        server: "./"
    });

    gulp.watch("css/*.css").on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("js/*.js").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);

gulp.task('_watch', function () {

    gulp.watch(paths.coreJs, ['core:js']);
    gulp.watch(paths.bowerJs, ['bower:js']);

    gulp.watch(paths.coreLess, ['core:less']);
    gulp.watch(paths.bowerCSS, ['bower:css']);
});

gulp.task("_build", ['core:js', 'core:less', 'bower:css', 'bower:js']);

gulp.task("_rebuild", ['_clean', '_build']);

gulp.task("_clean", function (cb) {
    del.sync(paths.outputFolders);
    cb();
});

gulp.task('core:js', function (cb) {
    processJs(paths.coreJs, 'core.min.js', cb);
});

gulp.task('bower:js', function (cb) {
    processJs(paths.bowerJs, 'bower.min.js', cb);
});

gulp.task('core:less', function (cb) {
    processLess(paths.coreLess, 'core.min.css', cb);
});

gulp.task("bower:css", function (cb) {
    pump([
        gulp.src(paths.bowerCss),
        newer('dist/css'),
        sourcemaps.init(),
        cleancss({ target: 'dist/css/', relativeTo: 'dist/css/' }),
        sourcemaps.write('../source-maps'),
        debug({ title: 'bower:css' }),
        gulp.dest('dist/css')
    ], cb);
});

function processJs(inputFiles, outputFile, cb) {

    var options = {
        //preserveComments: 'license'
    };

    pump([
        gulp.src(inputFiles),
        filesRequired(inputFiles.length, inputFiles.length),
        newer('dist/js/' + outputFile),
        sourcemaps.init(),
        concat(outputFile),
        uglify(options),
        sourcemaps.write('../source-maps'),
        debug({ title: outputFile }),
        gulp.dest('dist/js')
    ], cb);

}

function processLess(inputFiles, outputFile, cb) {
    pump([
       gulp.src(inputFiles),
       filesRequired(inputFiles.length, inputFiles.length),
       newer('dist/css/' + outputFile),
       sourcemaps.init(),
       less(),
       cleancss({ target: 'dist/css/', relativeTo: 'dist/css/' }),
       concat(outputFile),
       sourcemaps.write('../source-maps'),
       debug({ title: outputFile }),
       gulp.dest('dist/css')
    ], cb);
}