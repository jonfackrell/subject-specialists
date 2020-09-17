const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');


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
        .pipe(concat('subject-specialists.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(rename('subject-specialists.min.js'))
        .pipe(uglify({warnings: false}))
        .pipe(gulp.dest('build/js'))
    ;
});

gulp.task('publish', gulp.parallel('css', 'js'));

gulp.task('watch', function () {
    gulp.watch([
        'src/styles.css',
        'src/subject-specialists.js'
    ], gulp.parallel('css', 'js'));
});