var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var gulpSass = require('gulp-sass');
var browserSync = require('browser-sync');
var gulpLoadPlugins = require('gulp-load-plugins');
var del = require('del');
var wiredep = require('wiredep').stream;

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

//the most important rasks
gulp.task('styles', function() {
    gulp.src('app/stylesheets/*.scss')
        .pipe(gulpSass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/stylesheets/'))
        .pipe(reload({stream: true}));
});

gulp.task('fonts', function() {
  gulp.src('app/fonts/**')
      .pipe(gulp.dest('public/fonts'));
});

gulp.task('images', function() {
  gulp.src('app/images/**')
      .pipe(gulp.dest('public/images'));
});

gulp.task('views', function() {
  gulp.src('app/views/**')
      .pipe(gulp.dest('views'));
});

gulp.task('bowerFile', function() {
  gulp.src('app/bower_components/**')
      .pipe(gulp.dest('public/bower_components'));
});

gulp.task('scripts', () => {
  gulp.src('app/javascripts/**/*.js')
      .pipe($.plumber())
      .pipe($.sourcemaps.init())
      .pipe($.babel())
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('public/javascripts/'))
      .pipe(reload({stream: true}));
});

//gulp watch and reload
gulp.watch([
    'app/images/*',
]).on('change', reload);

gulp.watch('app/views/*.jade', ['views']);
gulp.watch('app/stylesheets/*.scss', ['styles']);
gulp.watch('app/javascripts/*.js', ['scripts']);
gulp.watch('app/fonts/**/*', ['fonts']);

//extras task
gulp.task('clean', del.bind(null, ['public/*']));

gulp.task('build', ['clean', 'views', 'styles', 'fonts', 'images', 'bowerFile']);
