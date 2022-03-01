const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "pulse/src"
        }
    });
});

gulp.task('styles', function() {
    return gulp.src("pulse/src/sass/**/*.+(scss|sass)")
            .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: "",
                suffix: ".min",
              }))
            .pipe(autoprefixer())
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest("pulse/src/css"))
            .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("pulse/src/sass/**/*.+(scss|sass)", gulp.parallel("styles"));
    gulp.watch("pulse/src/*.html").on("change", browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));