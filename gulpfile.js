let gulp = require("gulp");
let sass = require("gulp-sass");
gulp.task("compileSass",function(){
    return gulp.src("./src/sass/*.scss").pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest('./src/css/'))
});
gulp.task("jt",function(){
    gulp.watch("./src/sass/*.scss",gulp.series("compileSass"));
});