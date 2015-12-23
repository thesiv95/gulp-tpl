var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	imagemin = require('gulp-imagemin'),
	autoprefixer = require('gulp-autoprefixer'),
	jade = require('gulp-jade');

// конвертация jade в html

gulp.task('templates', function() {
	gulp.src('jade/**/*.jade')
		.pipe(jade({
			pretty: true // Чтобы не сжимал на выходе
		}))
		.pipe(gulp.dest('out/'))
});

// JS - код
// Сжатие

gulp.task('scripts', function(){
	gulp.src('js/**/*.js')
	.pipe(plumber())
	.pipe(uglify())
	.pipe(gulp.dest('out/js'));
});

// Картинки
// Сжатие

gulp.task('images', function(){
	gulp.src('img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('out/img'));
});

// Стили
// 1 Компиляция SASS в CSS
// 2 Сжатие
// 3 Авто-добавление префиксов для старых браузеров
gulp.task('styles', function(){
	gulp.src('scss/**/*.scss')
	.pipe(plumber())
	.pipe(autoprefixer({ browsers: ['> 1%', 'IE 7'], cascade: false }))
	.pipe(sass(
		{outputStyle: 'compressed'}
	).on('error', sass.logError))
	.pipe(gulp.dest('out/css'));
});


// Слежка - задачи выполняются по каждому сохранению
gulp.task('watch', function(){
	gulp.watch('js/**/*.js', ['scripts']);
	gulp.watch('scss/**/*.scss', ['styles']);
});

// Задача по умолчанию - выполнение всех описанных
// выше других задач
gulp.task('default', ['scripts', 'styles', 'images', 'watch']);