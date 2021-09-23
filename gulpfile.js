const series = require("gulp"),
    watch = require("gulp-watch"),
    less = require("gulp-less"),
    path = require("path");

const gulp = require("gulp");

const ts = require("gulp-typescript");

const tsProject = ts.createProject("./tsconfig.json");

gulp.task("tsc", function () {
    return gulp.src(["./src/script/**/*.ts"]).pipe(ts()).pipe(gulp.dest("public/js"));
});

gulp.task("less", function () {
    return gulp
        .src("./src/style/**/*.less")
        .pipe(
            less({
                paths: [path.join(__dirname, "less", "includes")],
            })
        )
        .pipe(gulp.dest("./public/css"));
});

gulp.task("default", () => {
    gulp.series(["tsc", "less"]);
    watch("src/style/**/*.less", gulp.series(["less"]));
    watch("src/script/**/*.ts", gulp.series(["tsc"]));
});
