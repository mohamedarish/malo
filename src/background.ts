import en2ml from "./convertor/convert";

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
    en2ml(text).forEach((word) => {
        console.log(word);
    });
});
