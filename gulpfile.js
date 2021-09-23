var typescript = require("gulp-tsc"),
    gulp = require("gulp"),
    watch = require("gulp-watch"),
    less = require("gulp-less"),
    path = require("path");

gulp.task("tsc", function () {
    gulp.src(["src/script/**/*.ts"]).pipe(typescript()).pipe(gulp.dest("public/js"));
});

gulp.task("less", function () {
    return gulp
        .src("./src/less/*.less")
        .pipe(
            less({
                paths: [path.join(__dirname, "less", "includes")],
            })
        )
        .pipe(gulp.dest("./public/css"));
});

gulp.task("default", () => {
    watch("src/style/**/*.less", function () {
        gulp.src("src/style/**/*.less").pipe(gulp.dest("less"));
    });

    watch("src/script/**/*.ts", function () {
        gulp.src("src/script/**/*.ts").pipe(gulp.dest("tsc"));
    });
});
