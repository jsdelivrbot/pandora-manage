var gulp = require('gulp');

var sass = require('gulp-sass');

var plumber = require('gulp-plumber');
var rename = require('gulp-rename');

gulp.task('sass', function() {

  gulp.src('app/scss/common/*')
    .pipe(plumber())
    .pipe(sass({check:true, sourcemap: false, style: 'expanded', precision: 10, sourcemapPath: '../sourcemaps'}))
    .pipe(rename(function (path) {
        path.basename = path.basename.replace(".css", "") + "-bundle";
    }))
    .pipe(gulp.dest('app/css'));

});

gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);
