
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var connect = require('gulp-connect');
var watch = require('gulp-watch');

var less = require('gulp-less');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');

var htmlPath = "./*.html";
var cssPath = "./css";
var lessFiles = "./less/**/*.less";

gulp.task("server", function(){
	connect.server({
		livereload: true,
		root: ['.']
	});
});

gulp.task("livereload",function(){

	var files = [htmlPath, cssPath];
	gulp.src(files)
		.pipe(watch(files))
    	.pipe(connect.reload());

});

gulp.task("less",function(){
	gulp.src(lessFiles)
		.pipe(concat(cssPath))
		.pipe(rename('main.css'))
		.pipe(less())
		.pipe(uglifycss())
		.pipe(gulp.dest(cssPath));
		//.pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(lessFiles , ["less"]);
});

gulp.task("default",[
	"less", 
	"server", 
	"livereload",
	"watch"
]);