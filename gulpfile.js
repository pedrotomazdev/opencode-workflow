var gulp = require("gulp"),
  sass = require("gulp-sass"),
  concat = require("gulp-concat"),
  minifyCSS = require("gulp-minify-css"),
  path = require("path");

var SASSPATH, CSSPATH;

gulp.task('sass', function(){
  console.log(SASSPATH);
  console.log(CSSPATH);
  gulp.src(SASSPATH + '/theme.min.scss')
    .pipe(sass())
    .pipe(concat('theme.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(CSSPATH));
});

var watcher = gulp.watch('**/*.scss', ['sass']);
watcher.on("change", function(event) {
  SASSPATH = path.resolve(event.path, "../");
  CSSPATH  = path.resolve(event.path, "../../");
});

gulp.task("default");