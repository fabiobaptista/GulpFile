
//Includes
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var connect = require('gulp-connect');
var watch = require('gulp-watch');

var less = require('gulp-less');
var sass = require('gulp-sass');

//var uglify = require('gulp-uglify');
//var uglifycss = require('gulp-uglifycss');

//Variables
var clientPath = "./src/client/";

var tempPath = './.tmp/';

var lessFiles = clientPath + "./styles/**/*.less";
var sassFiles = clientPath + "./styles/**/*.scss";

var htmlFiles = clientPath + "**/*.html";
var cssFiles = tempPath +  "**/*.css";
var jsFiles = clientPath + "**/*.js";

//Pre processors
gulp.task("less",function(){
	gulp.src(lessFiles)
		.pipe(concat(lessFiles))
		.pipe(rename('main.less.css'))
		.pipe(less())
		//.pipe(uglifycss())
		.pipe(gulp.dest(tempPath));
});
 
gulp.task("sass", function () {
    gulp.src(sassFiles)
		.pipe(concat(sassFiles))
		.pipe(rename('main.sass.css'))
		.pipe(sass().on('error', sass.logError))
		//.pipe(uglifycss())
        .pipe(gulp.dest(tempPath));
});

gulp.task("pre-processors",["less",	"sass"]);

gulp.task("default",["less", "sass", "server", "livereload", "watch"]);

//Server tasks
gulp.task('watch-pre-processors', function() {
    gulp.watch([lessFiles, sassFiles] , ["less", "sass"]);
});

gulp.task("server", function(){
	connect.server({
		port: 80,
		livereload: true,
		root: [__dirname, clientPath]
	});
});

gulp.task("livereload",function(){

	var files = [htmlFiles, cssFiles, jsFiles];
	gulp.src(files)
		.pipe(watch(files))
    	.pipe(connect.reload());
});

gulp.task("runserve",["server",	"livereload", "watch-pre-processors"]);