const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

function styles() {
  return gulp.src('src/scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
          browsers: ['last 5 versions',
              '> 5%'],
          cascade: false
      }))
      .pipe(gulp.dest('build/css'))
      .pipe(browserSync.stream());
}

exports.styles = styles;

function scripts() {
    return browserify('src/js/app.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.stream());
}

exports.scripts = scripts;

function browsersync() {
    browserSync.init({ // Инициализация Browsersync
        server: { baseDir: 'build/' }, // Указываем папку сервера
        notify: false, // Отключаем уведомления
        online: true // Режим работы: true или false
    })
}

exports.browsersync = browsersync;

function watchFiles() {
    gulp.watch('src/scss/*.scss', styles);
    gulp.watch('src/js/*.js', scripts);
}

gulp.task('watch', gulp.parallel(watchFiles, browsersync));