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
  gulp.src('app/fonts/*')
      .pipe(gulp.dest('public/fonts'))
});

gulp.task('views', function() {
  gulp.src('app/views/*')
      .pipe(gulp.dest('views'))
});
//gulp watch and reload
gulp.watch([
    'app/views/*.jade',
    'app/images/*',
]).on('change', reload);

gulp.watch('app/stylesheets/*.scss', ['styles']);
gulp.watch('app/javascripts/*.js', ['scripts']);
gulp.watch('app/fonts/**/*', ['fonts']);

//extras task
gulp.task('clean', del.bind(null, ['public/']));

gulp.task('build', ['views', 'styles', 'fonts', 'images']);
