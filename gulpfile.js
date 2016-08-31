var gulp = require('gulp'),
    riot = require('riot'),
    jsesc = require('jsesc'),
    rename = require('gulp-rename'),
    ts = require('gulp-typescript'),
    merge = require('merge2'),
    rimraf = require('rimraf'),
    through2 = require('through2');

gulp.task('build', ['clean', 'ts', 'tags']);

gulp.task('clean', function(callback){
    rimraf('./dist/**/', callback);
});

gulp.task('ts', ['clean'], function (){
    var tsResult = gulp.src('./src/**/*.ts')
        .pipe(rename({
            basename: "element",
        }))
        .pipe(ts({
            declaration: true
        }));

    return merge([
        tsResult.dts.pipe(gulp.dest('dist')),
        tsResult.js.pipe(gulp.dest('dist'))
    ]);
});

gulp.task('tags', ['clean'], function () {
    return gulp.src('./src/**/*.tag')
        .pipe(compile())
        .pipe(rename({
            basename: "tag",
            extname: ".js"
        }))
        .pipe(gulp.dest('./dist'))
});




function compile() {
    return through2.obj(function (file, enc, callback) {
        content = file.contents.toString(enc);
        var compiledTag = riot.compile(content);
        var compiled = [];
        compiledTag.match(/'(.*?)',/g).forEach(function (value) {
            compiled.push(jsesc(value.replace("',", "").replace("'", "")));
        });
        compiledContent = 'module.exports = ' + '{ tagName: \'' + compiled[0] + '\', html: \'' + compiled[1] + '\', css: \'' + compiled[2] + '\', attribs: \'' + compiled[3] + '\', js: \'\' }\n\n';
        file.contents = new Buffer(compiledContent, enc);
        this.push(file);
        callback();
    }, function (callback) {
        callback();
    });
}