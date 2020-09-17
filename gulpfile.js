const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

gulp.task('css', function () {
    const postcss = require('gulp-postcss');

    return gulp.src('src/styles.css')
        .pipe(postcss([
            require('tailwindcss'),
            require('autoprefixer'),
        ]))
        .pipe(rename('subject-specialists.min.css'))
        .pipe(gulp.dest('build/css/'));
});

gulp.task('js', function() {
    return gulp.src([
        'node_modules/axios/dist/axios.min.js',
        'node_modules/underscore/underscore-min.js',
        'node_modules/handlebars/dist/handlebars.min.js',
        'src/subject-specialists.js'
    ])
        .pipe(concat('build/js/subject-specialists.min.js'))
        .pipe(gulp.dest('./'))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});

gulp.task('publish', gulp.parallel('css', 'js'));

gulp.task('watch', function () {
    gulp.watch([
        'src/styles.css',
        'src/subject-specialists.js'
    ], gulp.parallel('css', 'js'));
});