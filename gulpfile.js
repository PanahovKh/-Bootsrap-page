const { src, dest, parallel } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
// const browserSync = require('browser-sync').create();


// function Sync () {
//     browserSync.init({ 
//         server:{
//             baseDir:"./"
//         },
//     });
//     gulp.watch('./src/**/*.scss');
//     gulp.watch('./*.html').on('change', browserSync.reload);
// }

function returnHTML() {
    return src('./*.html')
    .pipe(dest('build'))
}

function botsrapCss () {
    return src('./src/css/**')
    .pipe(dest('build/css'))
}

function returnCSS() {
    return src('./src/**/*style.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(dest('build'))
    // .pipe(browserSync.stream())
}

function returnJs() {
    return src('./src/**/*.js', { sourcemaps: true })
    .pipe(dest('build', { sourcemaps: true }))
}

function returnImages() {
    return src('./src/**/*.jpg')
    .pipe(dest('build'))
}

// exports.Sync = Sync;
exports.botsrapCss = botsrapCss;
exports.returnImages = returnImages;
exports.returnJs = returnJs;
exports.returnHTML = returnHTML;
exports.returnCSS = returnCSS;
exports.default = parallel(returnHTML, returnCSS, returnJs,returnImages,botsrapCss);

