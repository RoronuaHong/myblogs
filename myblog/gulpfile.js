var gulp = require("gulp"),
	gulpLoadPlugins = require("gulp-load-plugins"),
	plugins = gulpLoadPlugins(),
	browserSync = require("browser-sync").create(),
	reload = browserSync.reload;

gulp.task("default", ["sass"], function() {
	var files = [
		"**/*.html",
		"**/*.css",
		"**/*.js",
		"**/*.ejs",
		"**/*.scss"
	];
	browserSync.init(files, {
		proxy: "127.0.0.1:7777"
	});
	gulp.watch("./public/stylesheets/scss/*.scss", ["sass"]);
	gulp.watch("./public/javascripts/*.js").on("change", reload);
	gulp.watch("./views/*").on("change", reload);
	gulp.watch("./public/templates/").on("change", reload);
});

gulp.task("sass", function() {
	return gulp.src("./public/stylesheets/scss/*.scss")
		.pipe(plugins.changed("./public/stylesheets/", {extension: ".css"}))
		.pipe(plugins.autoprefixer({
			browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 10', 'ios 5', 'android 4'],
            cascade: true,
            remove: true
		}))
		.pipe(plugins.sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest("./public/stylesheets/"))
		.pipe(reload({stream: true}));
});
