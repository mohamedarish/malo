import en2ml from "./convertor/convert.js";
import getMeanings from "./dictionary/fetchData.js";
import dictionary from "./types/dictionary.js";

console.log("Extension Loaded");


browser.menus.create({
    id: "define-malo",
    title: "Find definition using malo",
    contexts: ["selection"],
});


browser.menus.onClicked.addListener(async (info) => {
    if (!info) return;

    if (info.menuItemId != "define-malo") return;

    if (!info.selectionText) return;

    const text = info.selectionText.split(" ")[0];

    console.log(text);

    const words = en2ml(text);

    console.log(words);

    const datuk = await (await fetch("https://raw.githubusercontent.com/mohamedarish/ml2ml-dictionary/main/dictionary.json")).json() as dictionary[];

    const meanings = getMeanings(words, datuk);

    console.log(meanings);

    browser.tabs.executeScript({
        file: "./scripts/viewPopup.js"
    });
});
