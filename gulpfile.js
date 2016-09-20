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
var cleanCSS = require('gulp-clean-css');

var paths = {
    coreJS: [
        'js/app/*.js'
    ],

    libJS: [
        'js/bootstrap.js',
        'js/ripples.js',
        'js/material.js',
        'js/wow.js',
        'js/jquery.mmenu.min.all.js',
        'js/count-to.js',
        'js/jquery.inview.min.js',
        'js/classie.js',
        'js/jquery.nav.js',
        'js/smooth-on-scroll.js',
        'js/smooth-scroll.js',
        'js/main.js'
    ],

    coreLess: [
        ''
    ],

    libCSS: [
        'css/bootstrap.min.css',
        'css/material.min.css',
        'css/ripples.min.css',
        'css/responsive.css',
        'css/animate.css'
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
});

gulp.task('default', ['serve']);

gulp.task('watch', ['serve'], function () {
    // Watch for changes in `app` folder
    gulp.watch('dist/**/*.*').on('change', browserSync.reload);

    // Watch .css files
    gulp.watch('css/**/*.css', ['css']);

    // Watch .js files
    gulp.watch('js/**/*.js', ['js']);

    // Watch image files
    gulp.watch('img/**/*', ['images']);
});

gulp.task('all', ['clean'], function () {
    gulp.start('build');
});

// Run all combine and minify tasks for css and js.
gulp.task('build', ['css', 'js', 'fonts'], function () {
    console.info("Running CSS and JS tasks.")
});

// Run all fonts tasks.
gulp.task('fonts', function () {
    return gulp.src([
        'fonts/*'])
        .pipe(gulp.dest('dist/fonts/'));
});

// Run all CSS tasks.
gulp.task('css', ['minify-css', 'minify-custom-css'], function () {
    console.info("Running CSS tasks.")
});

// Concat CSS files.
gulp.task('concat-css', function () {
    return gulp.src(paths.libCSS)
        .pipe(concat('lib.css'))
        .pipe(gulp.dest('./dist/css/'));
});

// Minify CSS files. 
gulp.task('minify-css', ['concat-css'], function () {
    return gulp.src('dist/css/lib.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('minify-custom-css', function () {
    return gulp.src('css/app/main.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./dist/css/'));
});


// Run all JS tasks.
gulp.task('js', ['uglify-js'], function () {
    console.info("Running JS tasks.")
});

// Concat JS files.
gulp.task('concat-js', function () {
    return gulp.src(paths.libJS)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('./dist/js/'));
});

// Uglify JS files.
gulp.task('uglify-js', ['concat-js'], function (cb) {
    pump([
        gulp.src('dist/js/lib.js'),
        uglify(),
        gulp.dest('./dist/js/')
    ],
        cb
    );
});

// Clean up the dist folder. 
gulp.task('clean', function () {
    return del([
        'dist/',
    ]);
});