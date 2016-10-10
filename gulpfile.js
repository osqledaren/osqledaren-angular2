/**
 * Prototype gulpfile
 */

// Load plugins
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	notify = require('gulp-notify'),
	appDefaults = {
		cssDir: './assets/css/', // path to compiled css
		scssDir: './src/scss/', // path to styles
		jsDir: './assets/js', // path to js
		nodeModulesDir: "./node_modules/" // path to node modules
	},
	browserSync = require('browser-sync').create();

// Styles
gulp.task('styles', function () {
	return gulp.src(appDefaults.scssDir + '**/*.scss')
		.pipe(sass({
			style: 'compressed',
			includePaths: [appDefaults.nodeModulesDir + 'bootstrap/scss', appDefaults.scssDir]
		})).on('error', notify.onError(function (error) {
			return 'An error occurred while compiling sass.\nLook in the console for details.\n' + error;
		}))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest(appDefaults.cssDir))
		.pipe(notify({message: 'Styles task complete'}))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('copyjs', function () {
	gulp.src(appDefaults.nodeModulesDir + 'bootstrap/dist/js/bootstrap.min.js')
		.pipe(gulp.dest(appDefaults.jsDir));

	gulp.src(appDefaults.nodeModulesDir + 'jquery/dist/jquery.min.js')
		.pipe(gulp.dest(appDefaults.jsDir));

	gulp.src(appDefaults.nodeModulesDir + 'tether/dist/js/tether.min.js')
		.pipe(gulp.dest(appDefaults.jsDir));
});

gulp.task('serve', function () {
	browserSync.init({
		server: './'
	});

	gulp.watch(appDefaults.scssDir + '**/*.scss', function (event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		gulp.run('styles');
	});
	gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['copyjs', 'styles', 'serve']);
