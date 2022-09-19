import en2ml from "./convertor/convert.js";
import getMeanings from "./dictionary/fetchData.js";

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

    const meanings = await getMeanings(words);

    console.log(meanings);
});
