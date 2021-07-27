const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

function styles() {
  return gulp.src('src/scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        cascade: false
      }))
      .pipe(gulp.dest('build/css'))
      .pipe(browserSync.stream());
}

exports.styles = styles;

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
}

gulp.task('watch', gulp.parallel(watchFiles, browsersync));