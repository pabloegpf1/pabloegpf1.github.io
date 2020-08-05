var gulp = require('gulp');
var plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');;
const rename = require('gulp-rename');
var csso = require('gulp-csso');

gulp.task('scripts', function() {
    return gulp.src('./js/scripts.js')
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(babel({
          presets: [['@babel/env', {modules:false}]]
        }))
        .pipe(uglify({
            output: {
                comments: '/^!/'
            }
        }))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('./js'));
});

gulp.task('styles', function () {
    return gulp.src('./css/styles.css')
      .pipe(csso())
      .pipe(rename({extname: '.min.css'}))
      .pipe(gulp.dest('./css'))
  });

gulp.task('watch', function() {
    gulp.watch('./js/scripts.js', gulp.series('scripts'));
    gulp.watch('./css/styles.css', gulp.series('styles'));
});