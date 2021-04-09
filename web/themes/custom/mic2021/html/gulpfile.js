// Variables
const browserSync_page = 'index.html'; // archivo inicial
const libraries_css = [
  './node_modules/@fortawesome/fontawesome-free/css/all.css',
  './node_modules/owl.carousel/dist/assets/owl.carousel.css',
  './node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css',
  './node_modules/aos/dist/aos.css'
];
const jquery_src = './node_modules/jquery/dist/jquery.js';
const libraries_js = [
  './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', // bootstrap.js + popper.js
  './node_modules/owl.carousel/dist/owl.carousel.min.js',
  './node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
  './node_modules/aos/dist/aos.js'
];

// Gulp
const gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  gulpCopy = require('gulp-copy'),
  pug = require('gulp-pug');

const root = './',
  source_css = root + 'src/scss/',
  public_css = root + 'public/css/',
  source_js = root + 'src/js/',
  public_js = root + 'public/js/',
  source_pug = root + 'src/pug/pages/',
  public_pug = root + 'public/';

const watch_file_html = root + 'public/*.html';
const watch_file_pug = root + 'src/pug/**/*.pug';
const watch_file_js = source_js + 'app.js';
const watch_file_css = source_css + 'app.scss';

function builder_css_libraries() {
  return gulp.src(libraries_css)
    .pipe(concat('libraries.min.css'))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(public_css));
}

function builder_css_bootstrap() {
  return gulp.src(root + 'src/scss/bootstrap/scss/bootstrap.scss', {sourcemaps: true})
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(concat('bootstrap.css'))
    .pipe(gulp.dest(public_css, {sourcemaps: '.'}));
}

function builder_css_app() {
  return gulp.src(source_css + 'app.scss', {sourcemaps: true})
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(concat('app.css'))
    .pipe(gulp.dest(public_css, {sourcemaps: '.'}));
}
//outputStyle = compressed

function builder_js_jquery() {
  return gulp.src(jquery_src, {sourcemaps: true})
    .pipe(concat('jquery.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(public_js));
}

function builder_js_libraries() {
  return gulp.src(libraries_js)
    .pipe(concat('libraries.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(public_js));
}

function builder_js_app() {
  return gulp.src(source_js + 'app.js', {sourcemaps: true})
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(public_js));
}

function builder_pug() {
  return gulp.src(source_pug + '*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(public_pug));
}

function watch() {
  browserSync.init({
    open: 'external',
    server: {
      baseDir: "./public/",
      index: browserSync_page
    }
  });
  gulp.watch(watch_file_pug, builder_pug);
  gulp.watch(watch_file_css, builder_css_app);
  gulp.watch(watch_file_js, builder_js_app);
  gulp.watch([
    watch_file_html,
    public_js + 'app.min.js',
    public_css + 'app.css'
  ]).on('change', reload);
}

exports.builder_pug = builder_pug;
exports.builder_css_app = builder_css_app;
exports.builder_css_bootstrap = builder_css_bootstrap;
exports.builder_js_app = builder_js_app;
exports.watch = watch;

// tareas independientes, ejecutar todos una vez, en orden
gulp.task('copy-lib-webfonts', function () {
  return gulp
    .src(root + 'node_modules/@fortawesome/fontawesome-free/webfonts/*')
    .pipe(gulpCopy(root + 'public/webfonts/', {prefix: 4}));
});
gulp.task('copy-lib-bootstrap', function () {
  return gulp.src([root + 'node_modules/bootstrap/**/*'])
    .pipe(gulp.dest(root + 'src/scss/bootstrap'));
});
gulp.task('copy-lib-jquery', builder_js_jquery); // copia jquery última versión
gulp.task('css-bootstrap', builder_css_bootstrap); // compila bootstrap

// ejecutar si se modifican las librerias
gulp.task('css-libraries', builder_css_libraries); // compila librerias css + bootstrap css
gulp.task('js-libraries', builder_js_libraries); // compila librerias - no incluye jQuery

// ejecutar en cada actualización de css y js
gulp.task('css-app', builder_css_app); // compila css custom
gulp.task('js-app', builder_js_app); // compila js custom

gulp.task('pug', builder_pug);

// task default
const build = gulp.series(watch);
gulp.task('default', build);
