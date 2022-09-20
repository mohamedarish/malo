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

    /* const selection =

    console.log(selection?.rangeCount);

    const range = selection?.getRangeAt(0);

    const rect = range?.getBoundingClientRect();

    const div = document.createElement("div");
    div.style.border = "2px solid black";
    div.style.position = "fixed";
    div.style.top = rect?.top + "px";
    div.style.left = rect?.left + "px";
    div.innerHTML = meanings + "";
    document.body.append(div);*/
});
