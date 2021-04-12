/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const path = require('path');

const plugins = path.resolve(__dirname, '..', 'libs/plugins');
const md5 = path.resolve(plugins, 'md5/md5.js');

gulp.task('concat', function () {
    return gulp.src([
        md5,
    ]).pipe(uglify({
        output: {
            max_line_len: 160000
        }
    })).pipe(concat('common.min.js')).pipe(gulp.dest('../dll/js'));
});
