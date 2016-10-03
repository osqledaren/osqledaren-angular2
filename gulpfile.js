/**
 * Prototype gulpfile
 */

  var gulp = require('gulp');

  var gutil = require('gulp-util');
  var sass = require('gulp-sass');
  var prefix = require('gulp-autoprefixer');
  var minifycss = require('gulp-minify-css');
  var browserSync = require('browser-sync').create();

  gulp.task('sass', function (){
    gulp.src(['./src/scss/*.scss', '!./src/scss/_variables.scss'])
    .pipe(sass({
      includePaths: ['./node_modules/bootstrap/scss', './src/scss'],
      outputStyle: 'expanded'
    }))
    .on('error', function (err) {
      gutil.log(err);
      this.emit('end');
    })
    .pipe(prefix(
      "last 1 version", "> 1%", "ie 8", "ie 7"
      ))
    .pipe(gulp.dest('./assets/css'))
    .pipe(minifycss())
    .pipe(gulp.dest('./assets/css'))
    .pipe(gulp.dest('./assets/css')).on('error', gutil.log)
    .pipe(browserSync.reload({stream: true}));
  });

  gulp.task('copyjs', function() {
    gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest('./assets/js'));

    gulp.src('./node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('./assets/js'));

    gulp.src('./node_modules/tether/dist/js/tether.min.js')
    .pipe(gulp.dest('./assets/js'));
  });

  gulp.task('serve', function() {
    browserSync.init({
      server: {
        baseDir: "./"
      }
    });

    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./*.html').on('change', browserSync.reload);
  });

  gulp.task('default', ['serve', 'copyjs']);
