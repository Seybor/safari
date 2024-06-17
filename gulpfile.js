const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const include = require('gulp-include');
const rename = require('gulp-rename');
const svgsprite = require('gulp-svg-sprite');

// const newer = require('gulp-newer');
// const concat = require('gulp-concat');
// const clean = require('gulp-clean');

function pages() {
  return src(['app/pages/**/*.html', '!app/pages/demo-icomoon/*.html'])
    .pipe(
      include({
        includePaths: 'app/inc',
      })
    )
    .pipe(dest('app'))
    .pipe(browserSync.stream());
}

function scriptslibs() {
  return src(['app/js/libs.js'])
    .pipe(
      include({
        includePaths: 'app/libs',
      })
    )
    .pipe(uglify())
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(['app/js/main.js'])
    .pipe(uglify())
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

function styleslibs() {
  return src(['app/css/libs.css'])
    .pipe(
      include({
        includePaths: 'app/libs',
      })
    )
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

function styles() {
  return src(['app/scss/*.scss'])
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 1 version'],
        grid: false,
      })
    )
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

function sprite() {
  return src('app/img/icon/*.svg')
    .pipe(
      svgsprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
            example: false,
          },
        },
        svg: {
          xmlDeclaration: false,
        },
      })
    )
    .pipe(dest('app/img'));
}

function browser() {
  browserSync.init({
    server: {
      baseDir: 'app/',
    },
    notify: false,
  });
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/css/*.css', '!app/css/*.min.css'], styleslibs);

  watch(['app/js/main.js'], scripts);
  watch(['app/js/libs.js'], scriptslibs);

  watch(['app/inc/**/*.html', 'app/pages/**/*.html'], pages);
  watch(['app/*.html']).on('change', browserSync.reload);
}

// - htmlMinify
const htmlMinify = require('html-minifier');
const options = {
  includeAutoGeneratedTags: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortClassName: true,
  useShortDoctype: true,
  collapseWhitespace: true,
};
function html() {
  return src(['app/**/*.html', '!app/pages/**/*.html', '!app/inc/**/*.html', '!app/libs/**/*.html'])
    .on('data', function (file) {
      const buferFile = Buffer.from(htmlMinify.minify(file.contents.toString(), options));
      return (file.contents = buferFile);
    })
    .pipe(dest('dist'));
}
// ! htmlMinify

function images() {
  return src(['app/img/**/*.*'])
    .pipe(imagemin())
    .pipe(dest('dist/img'));
}

function moduleMin() {
  return src([
    'app/js/modules/**/*.js'
  ],
    { base: 'app' }
  ).pipe(uglify())
    .pipe(dest('dist'));
}

function building() {
  return src(
    [
      'app/css/*.min.css',
      'app/js/*.min.js',

      'app/fonts/*.*',

      'app/favicon.ico',
      'app/manifest.json',

      'app/libs/**/*.*',
    ],
    { base: 'app' }
  ).pipe(dest('dist'))

}

exports.styles = styles;
exports.styleslibs = styleslibs;

exports.scripts = scripts;
exports.scriptslibs = scriptslibs;

exports.sprite = sprite;
exports.pages = pages;

exports.images = images;
exports.html = html;
exports.moduleMin = moduleMin
exports.building = building;

exports.watching = watching;

exports.build = series(html, moduleMin, images, building);
// exports.default = parallel(styles, styleslibs, scripts, scriptslibs, pages, watching);
exports.default = series(series(styles, styleslibs, scripts, scriptslibs, pages), parallel(watching, browser));
