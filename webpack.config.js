const path = require("path");

module.exports = {
    entry: {
        content_scripts: "./dist/content_scripts/content.js",
        background_scripts: "./dist/background_scripts/background.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]/index.js",
    },
};
