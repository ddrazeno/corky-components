var gulp = require('gulp'),
    riot = require('riot'),
    jsesc = require('jsesc'),
    rename = require('gulp-rename'),
    browserify = require('browserify'),
    ts = require('gulp-typescript'),
    merge = require('merge2'),
    rimraf = require('rimraf'),
    through2 = require('through2'),
    source = require('vinyl-source-stream'),
    glob = require('glob'),
    file = require('gulp-file'),
    es = require('event-stream');

gulp.task('build', ['clean', 'ts', 'tags']);

gulp.task('clean', function (callback) {
    rimraf('./dist/**/', callback);
});

gulp.task('prepare-html-tests', function (done) {


    glob('./test/**/*.dummy.js', function (err, files) {
        if (err) done(err);

        var hrefs = files.map(function(file){
            var index = file.lastIndexOf('/');
            var href = file.substring(0, index).replace('./test', '');
            return `<a href="${href}">${href.replace('/', '')}</a>`
        });

        file('./test/index.html', `<!doctype html><html><body>${hrefs.join('</br>')}</body></html>`)
        .pipe(gulp.dest('./'));

         var tasks = files.map(function(entry) {
            var index = entry.lastIndexOf('/');
            
            return browserify({ entries: [entry] })
                .transform('babelify', {presets: ["es2015"]})
                .bundle()
                .pipe(source(entry))
                .pipe(rename({
                    extname: '.bundle.js'
                }))
                .pipe(file(entry.substring(0, index) + '/index.html', `<!doctype html><html><body><div id="app"></div><script src="${entry.replace('./test', '').replace('dummy', 'dummy.bundle')}"></script><script>Dummy();</script></script></body></html>`))
                .pipe(gulp.dest('./'));
            });
            
        es.merge(tasks).on('end', done);

    });
});

gulp.task('ts', ['clean'], function () {
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