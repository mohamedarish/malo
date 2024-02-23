import contentMessage from "../types/contentMessage";
import DefineAPI from "../types/defineapi";

browser.runtime.onMessage.addListener(
    async (message: { message: contentMessage }) => {
        const selection = message.message.word;

        if (message.message.sender != "content_script") return true;

        console.log("selectipon", selection);

        const response_words = await fetch(
            "https://malo.mohamedarish.tech/rtrnsltrt",
            {
                headers: new Headers({
                    "content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                }),
                mode: "cors",
                method: "POST",
                body: JSON.stringify({
                    word: selection,
                }),
            }
        );

        const words = (await response_words.json()) as TransliterateAPI;

        console.log("words", words);

        const response_define = await fetch(
            "https://malo.mohamedarish.tech/define",
            {
                headers: new Headers({
                    "content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                }),
                mode: "cors",
                method: "POST",
                body: JSON.stringify({
                    words: words.result,
                }),
            }
        );

        const meanings = (await response_define.json()) as DefineAPI;

        console.log("meanings", meanings);

        browser.storage.local.set({
            word: { english: selection, malayalam: words.result },
            meanings: meanings.meanings,
        });

        return true;
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

    const text = info.selectionText;

    console.log("selection", text);

    const response_words = await fetch(
        "https://malo.mohamedarish.tech/rtrnsltrt",
        {
            headers: new Headers({
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }),
            mode: "cors",
            method: "POST",
            body: JSON.stringify({
                word: text,
            }),
        }
    );

    const words = (await response_words.json()) as TransliterateAPI;

    console.log("words", words);

    const response_define = await fetch(
        "https://malo.mohamedarish.tech/define",
        {
            headers: new Headers({
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }),
            mode: "cors",
            method: "POST",
            body: JSON.stringify({
                words: words.result,
            }),
        }
    );

    const meanings = (await response_define.json()) as DefineAPI;

    console.log("meanings", meanings);

    browser.storage.local.set({
        word: { english: text, malayalam: words.result },
        meanings: meanings.meanings,
    });
});
