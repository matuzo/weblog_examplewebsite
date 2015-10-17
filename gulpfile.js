var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    spritesmith = require('gulp.spritesmith'),
    autoprefixer = require('gulp-autoprefixer'),
    imageOptim = require('gulp-imageoptim'),
    usemin = require('gulp-usemin'),
    uncss = require('gulp-uncss'),
    minifyCss = require('gulp-minify-css'),
    path = require( 'path' ),
    tmpDir = require('os').tmpdir(),
    request = require('request'),
    fs = require('fs'),
    criticalcss = require("criticalcss"),
    inline = require('gulp-inline');

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

gulp.task('copybootstrapfonts', function() {
    return gulp.src('bower_components/bootstrap/fonts/*')
    .pipe(gulp.dest('dist/assets/fonts'))
});

// ,'imgopt'
gulp.task('distcopy', ['usemin', 'copycssimages','copybootstrapfonts'], function() {
  return gulp.src('dist/assets/css/style.css')
    .pipe(uncss({
      html: ['dist/*.html'],
      ignore: [ '.formError','.formError .formErrorContent']
    }))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest('dist/assets/css/'));
});

gulp.task('criticalfile', ['distcopy'], function() {
  var cssUrl = 'http://localhost/~matuzo/weblog_examplewebsite/dist/assets/css/style.css';
  var cssPath = path.join( tmpDir, 'style.css' );
 
  request(cssUrl).pipe(fs.createWriteStream(cssPath)).on('close', function() {
    criticalcss.getRules(cssPath, function(err, output) {
      if (err) {
        throw new Error(err);
      } else {
        criticalcss.findCritical("http://localhost/~matuzo/weblog_examplewebsite/dist/", { height: 700, rules: JSON.parse(output), ignoreConsole: true}, function(err, output) {
          if (err) {
            throw new Error(err);
          } else {
            fs.writeFileSync( 'dist/assets/css/styles-critical.css', output );
          }
        });
      }
    });
  });
});

gulp.task('dist', ['criticalfile'], function() {
  gulp.src('dist/index.html')
  .pipe(inline({
    css: minifyCss(),
    disabledTypes: ['svg', 'img', 'js'], // Only inline css files
    ignore: ['../dist/assets/css/style.css']
  }))
  .pipe(gulp.dest('dist/'));
});

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