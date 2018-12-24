let gulp = require("gulp");
let sass = require("gulp-sass");
gulp.task("compileSass",function(){
    return gulp.src("./src/sass/*.scss").pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest('./src/css/'))
});
gulp.task("jt",function(){
    gulp.watch("./src/sass/*.scss",gulp.series("compileSass"));
});

// var browserSync = require("browser-sync");
// 静态服务器:没有语言解析器
// gulp.task('server',()=>{
//     browserSync({
//         // 服务器路径
//         // server:'./src/',
//         // 代理服务器，必须绑定到当前服务器路径一致
//         proxy:'http://localhost:1810',
//         // 端口
//         port:666,
//         // 监听文件修改，自动刷新
//         files:['./src/**/*.html','./src/css/*.css','./src/api/*.php','./src/js/*.js']
//     });
//     // 监听sass文件修改，并自动编译
//     gulp.watch("./src/sass/*.scss",gulp.series("compileSass"))
// });