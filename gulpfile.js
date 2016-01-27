var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'www'
    }
  });

  gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js', 'views/**/*.html'], {cwd: 'www'}, reload);
});