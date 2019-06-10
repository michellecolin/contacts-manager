// DIST
gulp.task('sass-dist', function () {
	return gulp.src('public/src/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('concatCss-dist', ['sass'], function () {
	return gulp.src('dist/css/**/*.css')
		.pipe(concatCss("app.css"))
		.pipe(gulp.dest('dist'))
});

gulp.task('cssNano-dist', ['sass-dist', 'concatCss-dist'], function() {
	return gulp.src('dist/app.css')
		.pipe(cssNano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist'));
});

gulp.task('scripts-dist', function() {
	return gulp.src('public/src/**/*.ts')
		.pipe(addStream.obj(prepareTemplates()))
		.pipe(sourceMaps.init())
		.pipe(ts({
			noImplicitAny: true,
			suppressImplicitAnyIndexErrors: true,
			out: 'app.js'
		}))
		.pipe(gulp.dest('dist'))
		.pipe(rename('app.min.js'))
		.pipe(uglify())
		.pipe(sourceMaps.write('.'))
		.pipe(gulp.dest('dist'));
});

gulp.task('css-dist', function () {
	return gulp.src([
		'node_modules/bootstrap/dist/css/bootstrap.min.css',
		'node_modules/sweetalert/lib/sweet-alert.css'
	])
	.pipe(concat("lib.css"))
	.pipe(gulp.dest('dist/lib'))
});

gulp.task('js-dist', function() {
	return gulp.src([
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/angular/angular.min.js',
		'node_modules/bootstrap/dist/js/bootstrap.min.js',
		'node_modules/angular-route/angular-route.min.js',
		'node_modules/ng-file-upload/dist/ng-file-upload.min.js',
		'node_modules/sweetalert/lib/sweet-alert.min.js',
		'node_modules/angular-sweetalert/SweetAlert.min.js'
	],
	{base:'node_modules'})
	.pipe(concat("lib.js"))
	.pipe(gulp.dest("./dist/lib"))
	.pipe(browserSync.stream());
});


gulp.task('inject-dist', ['scripts-dist', 'js-dist', 'css-dist', 'cssNano-dist'], function(){
	// inject our dist files
	var injectSrc = gulp.src([
		'./dist/lib/lib.css',
		'./dist/lib/lib.js',
		'./dist/app.css',
		'./dist/app.js'
	], { read: false });

	var injectOptions = {
		ignorePath: '/dist'
	};

	return gulp.src('./public/*.html')
		.pipe(inject(injectSrc, injectOptions))
		.pipe(gulp.dest('./dist'));

});