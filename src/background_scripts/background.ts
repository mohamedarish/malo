import en2ml from "../convertor/convert";
import getMeanings from "../dictionary/fetchData";
import contentMessage from "../types/contentMessage";
import dictionary from "../types/dictionary";

browser.runtime.onMessage.addListener(async (message: contentMessage) => {
    const selection = message.word;

    if (message.sender != "content_script") return true;

    const words = en2ml(selection);

    let datuk = (await browser.storage.local.get("datuk")).datuk;

    if (!datuk) {
        console.log("Fetched from github");
        datuk = (await (
            await fetch(
                "https://raw.githubusercontent.com/mohamedarish/ml2ml-dictionary/main/dictionary.json"
            )
        ).json()) as dictionary[];

        browser.storage.local.set({ datuk: datuk });
    }

    let meanings = getMeanings(words, datuk);

    meanings = meanings.filter((element) => element.meaning.length > 0);

    if (meanings.length < 1) true;

    browser.storage.local.set({ meanings: meanings });

    return true;
});

browser.menus.create({
    id: "find-malo",
    title: "find definition using malo",
    contexts: ["selection"],
});

browser.menus.onClicked.addListener(async (info) => {
    if (!info) return true;

    if (info.menuItemId != "find-malo") return true;

    let text: string;

    if (!info.selectionText) {
        text = (await browser.storage.local.get("message")).message.word;

        if (text.length < 1) return true;
    } else {
        text = info.selectionText;
    }
    const words = en2ml(text);

    let datuk = (await browser.storage.local.get("datuk")).datuk;

    if (!datuk) {
        datuk = (await (
            await fetch(
                "https://raw.githubusercontent.com/mohamedarish/ml2ml-dictionary/main/dictionary.json"
            )
        ).json()) as dictionary[];

        browser.storage.local.set({ datuk: datuk });
    }

    let meanings = getMeanings(words, datuk);

    meanings = meanings.filter((element) => element.meaning.length > 0);

    browser.storage.local.set({ meanings: meanings });

    return true;
});
