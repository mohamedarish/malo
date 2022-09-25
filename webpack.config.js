const path = require("path");

module.exports = {
    entry: {
        content_scripts: "./dist/content_scripts/content.js",
        background_scripts: "./dist/background_scripts/background.js",
        popup_scripts: "./dist/popup_scripts/popup.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]/index.js",
    },
};
