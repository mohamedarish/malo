import en2ml from "../convertor/convert";
import getMeanings from "../dictionary/fetchData";
import contentMessage from "../types/contentMessage";
import dictionary from "../types/dictionary";

console.log("Background Script Loaded");

const datuk = (await (
    await fetch(
        "https://raw.githubusercontent.com/mohamedarish/ml2ml-dictionary/main/dictionary.json"
    )
).json()) as dictionary[];

browser.runtime.onMessage.addListener(
    async (message: contentMessage, sender, sendResponse) => {
        const selection = message.word;

        if (message.sender != "content_script") return false;

        console.log(selection, sender, sendResponse, DOMRect);

        const words = en2ml(selection);

        console.log(words);

        const meanings = getMeanings(words, datuk);

        console.log(meanings);

        browser.storage.local.set({ meanings: meanings });

        console.log(meanings.toString());
    }
);

browser.menus.create({
    id: "find-malo",
    title: "find definition using malo",
    contexts: ["selection"],
});

browser.menus.onClicked.addListener(async (info) => {
    if (!info) return;

    if (info.menuItemId != "find-malo") return;

    if (!info.selectionText) return;

    const text = info.selectionText;

    const words = en2ml(text);

    console.log(words);

    const datuk = (await (
        await fetch(
            "https://raw.githubusercontent.com/mohamedarish/ml2ml-dictionary/main/dictionary.json"
        )
    ).json()) as dictionary[];

    const meanings = getMeanings(words, datuk);

    console.log(meanings);

    browser.storage.local.set({ meanings: meanings });
});
