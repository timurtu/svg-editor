/**
 * Created by timur on 9/5/16.
 */

const gulp = require('gulp')
const Promise = require('bluebird')
const execAsync = Promise.promisify(require('child_process').exec)
const rimrafAsync = Promise.promisify(require('rimraf'))

gulp.task('clean', () => rimrafAsync('dist'))
gulp.task('build', ['clean'], () => execAsync('./node_modules/.bin/webpack'))
gulp.task('electron', ['clean', 'build'], () => {
  execAsync('./node_modules/.bin/electron main.js')
})
gulp.task('watch', ['build', 'electron'], () => gulp.watch('src/**/*.js', ['build', 'electron']))
