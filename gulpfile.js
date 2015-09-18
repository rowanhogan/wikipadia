var gulp          = require('gulp'),
    babelify      = require("babelify"),
    browserify    = require('browserify'),
    fs            = require('fs'),
    mkdirp        = require("mkdirp"),
    plugins       = require('gulp-load-plugins')(),
    source        = require('vinyl-source-stream');

gulp.task('browserify', function() {
  return browserify('./app/scripts/app.js')
    .transform(babelify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('connect', function () {
  plugins.connect.server({
    root: 'dist',
    port: 4000
  });
});

gulp.task('setup', function () {
  gulp.src('./app/index.html').pipe(gulp.dest('./dist'));

  mkdirp('./dist/', function (err) {
    if (err) return cb(err)
    fs.writeFileSync('./dist/CNAME', 'wikipadia.xyz');
  });
});

gulp.task('images', function () {
  return gulp.src('./app/images/*.**')
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('ghpages', function() {
  return gulp.src('./dist/**/*')
    .pipe(plugins.ghPages());
});

gulp.task('sass', function () {
  gulp.src('./app/styles/*.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({outputStyle: 'compressed'}))
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function() {
  gulp.watch('./app/**/*.js', ['browserify']);
  gulp.watch('./app/**/*.scss', ['sass']);
  gulp.watch('./app/index.html', ['setup']);
  gulp.watch('./app/images/*.**', ['images']);
});

gulp.task('build',    ['setup', 'images', 'sass', 'browserify']);
gulp.task('default',  ['build', 'connect', 'watch']);

gulp.task('deploy',   plugins.sequence('build', 'ghpages'));

