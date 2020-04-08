const { src, dest, parallel } = require('gulp');
const scss = require('gulp-scss');
const minifyCSS = require('gulp-csso');

function returnCSS() {
    return src('./sass/**/*.scss')
    .pipe(scss())
    .pipe(minifyCSS())
    .pipe(dest('./build'))
}

exports.returnCSS = returnCSS;
exports.default = parallel(returnCSS)