const path = require("path");

module.exports = {
    entry: {
        background_scripts: "./dist/background_scripts/background.js",
        content_scripts: "./dist/content_scripts/content.js",
    },
    output: {
        path: path.resolve(__dirname, "addon"),
        filename: "[name]/index.js",
    },
};
