'use strict'

const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

gulp.task('js', () => {
	browserify('src/script.js')
		.transform("babelify", {
			presets: ['es2015']
		})
		.bundle()
		.pipe(source('game.js'))
		.pipe(buffer())
		.pipe(gulp.dest('public/scripts'));
});


gulp.task('default',['js'],() => {
	gulp.watch('src/**/*.js',['js']);
});