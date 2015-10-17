var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    spritesmith = require('gulp.spritesmith'),
    autoprefixer = require('gulp-autoprefixer'),
    imageOptim = require('gulp-imageoptim'),
    usemin = require('gulp-usemin');

var assetPath = 'dev/assets/';

gulp.task('less', function() {
    // all less files are imported in main.less
    gulp.src(assetPath+'css/style.less')
    .pipe(less())
    .pipe(autoprefixer({
            browsers: ['last 2 versions']        
    }))
    // the task will output main.css in css
    .pipe(gulp.dest('dev/assets/css'))
});

gulp.task('imgopt', function() {
    return gulp.src('dev/images/**/*')
        .pipe(imageOptim.optimize())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('usemin', function() {
  return gulp.src('dev/index.html')
    .pipe(usemin())
    .pipe(gulp.dest('dist/'));
});

gulp.task('copycssimages', function() {
    return gulp.src('dev/assets/images_single/*')
    .pipe(gulp.dest('dist/assets/images_single'))
});

gulp.task('dist', ['usemin', 'copycssimages','imgopt']);

gulp.task('watch', function() {
    console.log("test")
    // if a less file changes, run the less task
    gulp.watch(assetPath+'css/*.less', ['less']);

    // if any file in `assets` changes, reload the browser
    livereload.listen();
   gulp.watch(assetPath+'**').on('change', livereload.changed);
});
 
 
// gulp.task('sprite', function () {
//   var spriteData = gulp.src(assetPath+"images_single/*.*").pipe(spritesmith({
//     imgName: 'sprite.png',
//     cssName: 'sprite.css'
//   }));
//   return spriteData.pipe(gulp.dest(assetPath+'css/'));
// });