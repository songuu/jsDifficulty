var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('styles', () => {
    return gulp.src('app/index.scss')
    //.pipe(plumber())
    //.pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    //.pipe(sourcemaps.write())
    /*.pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: true,
        remove: false
    }))*/
    .pipe(gulp.dest('app/css'));
});

gulp.task('color', () => {
	return gulp.src('app/style.scss')
	.pipe(sass({outputstyle: 'compressed'}).on('error', sass.logError))
	.pipe(gulp.dest('app/css'))
})

gulp.task('radius', () => {
	return gulp.src('app/radius.scss')
	.pipe(sass({outputstyle: 'compressed'}).on('error', sass.logError))
	.pipe(gulp.dest('app/css'))
})

gulp.task('clearfix', () => {
	return gulp.src('app/clearfix.scss')
	.pipe(sass({outputstyle: 'compressed'}).on('error', sass.logError))
	.pipe(gulp.dest('app/css'))
})

gulp.task('grid', () => {
	return gulp.src('app/grid.scss')
	.pipe(sass({outputstyle: 'compressed'}).on('error', sass.logError))
	.pipe(gulp.dest('app/css'))
})
