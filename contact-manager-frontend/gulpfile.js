let addStream     = require('add-stream');
let gulp          = require('gulp');
let nodemon       = require('gulp-nodemon');
let inject        = require('gulp-inject');
let concat        = require('gulp-concat');
let concatCss     = require('gulp-concat-css');
let cssNano       = require('gulp-cssnano');
let rename        = require('gulp-rename');
let sourceMaps    = require('gulp-sourcemaps');
let templateCache = require('gulp-angular-templatecache');
let ts            = require('gulp-typescript');
let tslint        = require('gulp-tslint');
let uglify        = require('gulp-uglify');
let sass          = require('gulp-sass');
let path          = require('path');
let wiredep       = require('wiredep').stream;
let _             = require('underscore');
let browserSync = require('browser-sync');

let _PATH;
let _ROOT;

// Lint to keep us in line
gulp.task('lint', () => {
	return gulp.src('public/src/**/*.ts')
		.pipe(tslint())
		.pipe(tslint.report('default'));
});

// Concatenate & minify JS
gulp.task('scripts', () => {

	return gulp.src('public/src/**/*.ts')
		.pipe(addStream.obj(prepareTemplates()))
		.pipe(sourceMaps.init())
		.pipe(ts({
			noImplicitAny: true,
			suppressImplicitAnyIndexErrors: true,
			out: 'app.js'
		}))
		.pipe(gulp.dest(_PATH))
		.pipe(rename('app.min.js'))
		.pipe(uglify())
		.pipe(sourceMaps.write('.'))
		.pipe(gulp.dest(_PATH));
});

gulp.task('css', () => {
	return gulp.src([
		'node_modules/bootstrap/dist/css/bootstrap.min.css',
		'node_modules/sweetalert/lib/sweet-alert.css'
	])
	.pipe(concat("lib.css"))
	.pipe(gulp.dest(`${_PATH}/lib`))
});


// Compile, concat & minify sass
gulp.task('sass', () => {
	console.log(_PATH);
	return gulp.src('public/src/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(`${_PATH}/css`));
});


gulp.task('concatCss', ['sass'], () => {
	return gulp.src('public/dist/css/**/*.css')
		.pipe(concatCss("app.css"))
		.pipe(gulp.dest(_PATH))
});


gulp.task('cssNano', ['sass', 'concatCss'], () => {
	return gulp.src('public/dist/app.css')
		.pipe(cssNano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(_PATH));
});


gulp.task('js', () => {
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
	.pipe(gulp.dest(`${_PATH}/lib`))
	.pipe(browserSync.stream());
});

gulp.task('inject', ['scripts', 'js', 'css', 'cssNano'], () => {
	// inject our dist files
	let injectSrc = gulp.src([
		`${_PATH}/lib/lib.css`,
		`${_PATH}/lib/lib.js`,
		`${_PATH}/app.css`,
		`${_PATH}/app.js`
	], { read: false });

	let injectOptions = {
		ignorePath: `/${_ROOT}`
	};

	return gulp.src('./public/*.html')
		.pipe(inject(injectSrc, injectOptions))
		.pipe(gulp.dest(`./${_ROOT}`));

});

gulp.task('serve', ['scripts', 'cssNano', 'inject'], () => {
	let options = {
		restartable: "rs",
		verbose: true,
		ext: "ts html scss",
		script: 'server.js',
		delayTime: 1,
		watch: ['public/src/**/*(*.ts|*.html)', 'public/src/**/*.scss'],
		env: {
			'PORT': 3000
		},
		ignore: ["public/dist/*", "public/dist/**/**"],
		// bit faster if we only do what we need to
		tasks: function (changedFiles) {
			let tasks = [];
			changedFiles.forEach(function (file) {
				let ext = path.extname(file);
				if (ext === '.ts' || ext === '.html'){
					tasks.push('lint');
					tasks.push('scripts');
				}
				else if (ext === '.scss'){
					tasks.push('sass');
					tasks.push('concatCss');
					tasks.push('cssNano');
				}
			});
			return tasks
		}
	};

	return nodemon(options)
		.on('restart', (ev) => {
			console.log('restarting..');
		});
});


// Default Task
gulp.task('default', ['set-serve', 'serve']);
gulp.task('set-serve', () => {
	_PATH = 'public/dist';
	_ROOT = 'public';
});

gulp.task('build', ['set-dist', 'inject']);
gulp.task('set-dist', () => {
	_PATH = 'dist';
	_ROOT = 'dist';
});

function prepareTemplates() {

	// we get a conflict with the < % = let % > syntax for $templateCache
	// template header, so we'll just encode values to keep yo happy
	let encodedHeader = "angular.module(&quot;&lt;%= module %&gt;&quot;&lt;%= standalone %&gt;).run([&quot;$templateCache&quot;, function($templateCache:any) {";
	return gulp.src('public/src/**/*.html')
		.pipe(templateCache('templates.ts', {
			root: "app-templates",
			module: "app.templates",
			standalone : true,
			templateHeader: _.unescape(encodedHeader)
		}));
}