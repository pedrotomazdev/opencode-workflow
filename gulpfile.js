/**
 * Gulpfile
 * @author Richard Santos <rsantos@tray.com.br>
 */

var gulp = require('gulp');
var util = require('gulp-util');
var fs = require('fs');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var less = require('gulp-less');
var stylus = require('gulp-stylus');
var minifyCSS = require('gulp-minify-css');
var bSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var path = require('path');
var yaml = require('js-yaml');
var process = require('process');

/**
 * Get CLI args
 */
for (i = process.argv.length; i > 0; i--) {
    var arg = process.argv[i];
    var nextArg = process.argv[i + 1];

    if (arg == '--folder' && nextArg) {
        const FOLDER = process.cwd() + '/' + nextArg;
    }
}

if (!FOLDER) {
    var example = 'gulp watch --folder opencode.commercesuite.com.br';
    util.log(util.colors.red('Error: missing param: --folder, ex: ' + example));
    return false;
}

/**
 * Get OpenCode config file
 */
var configYML = FOLDER + '/config.yml';
var configOpenCode = yaml.safeLoad(fs.readFileSync(configYML, 'utf8'));
const URL = configOpenCode[':preview_url'];

if (!URL) {
    util.log(util.colors.red('Error: Did you configured opencode? Check your file: ' + configYML));
    return false;
}

const CSSPATH = FOLDER + '/css/';
const JSPATH = FOLDER + '/js/';

gulp.task('sass', function(){
  gulp.src(CSSPATH + 'sass/theme.min.scss')
    .pipe(sass({errLogToConsole: true}))
    .pipe(concat('theme.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(CSSPATH));
});

gulp.task('less', function() {
    gulp.src(CSSPATH + 'less/theme.min.less')
    .pipe(less())
    .pipe(concat('theme.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(CSSPATH));
});

gulp.task('stylus', function() {
    gulp.src(CSSPATH + 'stylus/theme.min.styl')
        .pipe(stylus())
        .pipe(concat('theme.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(CSSPATH));
});

gulp.task('js', function(){
  gulp.src(JSPATH + "modules/*.js")
    .pipe(concat("theme.min.js"))
    .pipe(uglify({"compress": false}))
    .pipe(gulp.dest(JSPATH));
});

gulp.task('bsync', function() {
    bSync.init({
        logPrefix: 'Tray Opencode',
        open: 'external',
        proxy: URL,
        port: 3000,
        https: true,
        files: FOLDER + '/**/*.*',
    });
});

gulp.task('watch', function() {
    gulp.watch(CSSPATH + 'sass/*', ['sass']);
    gulp.watch(CSSPATH + 'less/*', ['less']);
    gulp.watch(CSSPATH + 'stylus/*', ['stylus']);
    gulp.watch(JSPATH + 'modules/*.js', ['js']);
});

gulp.task('default', ['sass', 'less', 'stylus', 'js', 'bsync']);
