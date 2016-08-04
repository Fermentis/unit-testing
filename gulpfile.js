var gulp = require('gulp'), //GULP!
    gutil = require('gulp-util'), //Utility functions for gulp plugins
    browserSync = require('browser-sync').create(), //Live reload/sync on file edits
    sass = require('gulp-sass'), //Compiles sass
    gulpif = require('gulp-if'), //Basic if statement
    concat = require('gulp-concat'), //Concatenates files
    browserify = require('browserify'), //Makes node modules available in the browser
    source = require('vinyl-source-stream'); //Necessary for gulp

var env,
    jsSources,
    sassSources,
    htmlSources,
    outputDir;

jsSources = ['app/**/*.js',];
sassSources = ['app/**/*.scss'];
htmlSources = ['app/**/*.html'];
outputDir = 'builds/development/';

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('sass', function(){
  return gulp.src(sassSources)
    .pipe(sass())
    .pipe(gulp.dest(outputDir + 'css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('html', function() {
  gulp.src(htmlSources)
    //.pipe(gulpif(env === 'production', minifyHTML()))
    //.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
    .pipe(gulp.dest(outputDir))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserify', function() {
	// Grabs the app.module.js file
    return browserify('./app/app.module.js')
    	// bundles it and creates a file called main.js
        .bundle()
        .pipe(source('scripts.js'))
        // saves it the app/js/ directory
        .pipe(gulp.dest('./app/js/'));
});

gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch(sassSources, ['sass']);
  gulp.watch(htmlSources, ['html']);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  });
});

gulp.task('browserify', ['browserify']);
gulp.task('default', ['js', 'sass', 'html', 'browserSync', 'watch']);