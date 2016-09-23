/**
 * Gulpfile
 * @author Richard Santos <rsantos@tray.com.br>
 */
'use strict';

var gulp = require('gulp');
var util = require('gulp-util');
var fs = require('fs');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var less = require('gulp-less');
var stylus = require('gulp-stylus');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var bSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var path = require('path');
var yaml = require('js-yaml');
var process = require('process');
var cp = require('child_process');
var spawn = require('cross-spawn-async');

/**
 * Get CLI args
 */
var FOLDER;
for (var i = process.argv.length; i > 0; i--) {
    var arg = process.argv[i];
    var nextArg = process.argv[i + 1];

    if (arg == '--folder' && nextArg) {
        FOLDER = process.cwd() + '/' + nextArg;
    }
}

if (!FOLDER) {
    var example = 'gulp --folder opencode.commercesuite.com.br';
    util.log(util.colors.red('Error: missing param: --folder, ex: ' + example));
    process.exit(1);
}

/**
 * Get OpenCode config file
 */
var configYML = FOLDER + '/config.yml';
var configOpenCode = yaml.safeLoad(fs.readFileSync(configYML, 'utf8'));
const URL = configOpenCode[':preview_url'];

if (!URL) {
    util.log(util.colors.red('Error: Did you configured opencode? Check your file: ' + configYML));
    process.exit(1);
}

const CSSPATH = FOLDER + '/css/';
const JSPATH = FOLDER + '/js/';
const IMGPATH = FOLDER + '/img/';
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', () => {
  gulp.src(CSSPATH + 'sass/theme.min.scss')
    .pipe(sass({errLogToConsole: true}))
    .on('error', util.log)
    .pipe(concat('theme.min.css'))
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest(CSSPATH));
});

gulp.task('less', () => {
    gulp.src(CSSPATH + 'less/theme.min.less')
    .pipe(less())
    .pipe(concat('theme.min.css'))
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest(CSSPATH));
});

gulp.task('stylus', () => {
    gulp.src(CSSPATH + 'stylus/theme.min.styl')
        .pipe(stylus())
        .pipe(concat('theme.min.css'))
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(gulp.dest(CSSPATH));
});

gulp.task('js', () => {
  gulp.src(JSPATH + "modules/*.js")
    .pipe(concat("theme.min.js"))
    .pipe(uglify({"compress": false}))
    .pipe(gulp.dest(JSPATH));
});

var imageFiles = [
    IMGPATH + '**/*.{png,jpg,gif,svg}',
    '!'+ IMGPATH + 'dist/*'
];

gulp.task('imagemin', () => {
    gulp.src(imageFiles)
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}]
		}))
		.pipe(gulp.dest(IMGPATH + 'dist/'));
});

gulp.task('bsync', () => {
    bSync.init({
        logPrefix: 'Tray Opencode',
        logFileChanges: false,
        open: 'external',
        proxy: {
            target: URL
        },
        reloadDelay: 800,
        port: 8081,
        https: true,
        files: FOLDER + '**/**',
    });
});

gulp.task('opencode', () => {
    process.chdir(FOLDER);

    var opencode = spawn('opencode', ['watch']);

    opencode.stdout.on('data', (data) => {
        var output = util.colors.green(data);
        if (data.indexOf('Error') > -1) {
            output = util.colors.bgRed(data);
        }
        process.stdout.write(output);
    });

    opencode.stderr.on('data', (data) => {
        process.stdout.write(util.colors.bgRed(prefix + data));
    });
});

gulp.task('watch', () => {
    gulp.watch(CSSPATH + 'sass/*', ['sass']);
    gulp.watch(CSSPATH + 'less/*', ['less']);
    gulp.watch(CSSPATH + 'stylus/*', ['stylus']);
    gulp.watch(JSPATH + 'modules/*.js', ['js']);
    // gulp.watch(imageFiles, ['imagemin']);
});

gulp.task('default', [
    'watch',
    'opencode',
    'bsync', // comment this line if you're using remotes envs (Cloud 9, etc...)
    'sass',
    'less',
    'stylus',
    'js',
    // 'imagemin',
 ]);
