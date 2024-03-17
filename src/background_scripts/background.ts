import { contentMessage } from "../types/contentMessage";
import { DefineAPI, Meaning } from "../types/defineapi";
import { TransliterateAPI } from "../types/transliterateapi";

const getAccumulativeNumber = (obj: Meaning): number => {
    let len = 0;

    obj.meanings.forEach((arr) => {
        len += arr.length;
    });

    return len;
};

browser.runtime.onMessage.addListener(
    async (message: { message: contentMessage }) => {
        const selection = message.message.word;

        let { server } = (await browser.storage.local.get("server")) as {
            server: string;
        };

        if (!server || !server.startsWith("http")) {
            server = "https://localhost:3030";
        }

        try {
            const test_request = await fetch(server, {
                headers: new Headers({
                    "Access-Control-Allow-Origin": "*",
                }),
                mode: "cors",
            });

            const test = await test_request.text();

            if (test !== "The server is running!") {
                return;
            }
        } catch (err) {
            return;
        }

        const response_words = await fetch(`${server}/rtrnsltrt`, {
            headers: new Headers({
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }),
            mode: "cors",
            method: "POST",
            body: JSON.stringify({
                word: selection,
            }),
        });

        const words = (await response_words.json()) as TransliterateAPI;

        const response_define = await fetch(`${server}/define`, {
            headers: new Headers({
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }),
            mode: "cors",
            method: "POST",
            body: JSON.stringify({
                words: words.result,
            }),
        });

        const meanings = (await response_define.json()) as DefineAPI;

        meanings.meanings.sort((a, b) => {
            return getAccumulativeNumber(b) - getAccumulativeNumber(a);
        });

        browser.storage.local.set({
            word: selection,
            meanings: meanings.meanings.filter((m) => m.meanings.length > 0),
        });
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

    let { server } = (await browser.storage.local.get("server")) as {
        server: string;
    };

    if (!server || !server.startsWith("http")) {
        server = "http://localhost:3030";
    }

    try {
        const test_request = await fetch(server, {
            headers: new Headers({
                "Access-Control-Allow-Origin": "*",
            }),
            mode: "cors",
        });

        const test = await test_request.text();

        if (test !== "The server is running!") {
            return;
        }
    } catch (err) {
        return;
    }

    const text = info.selectionText;

    const response_words = await fetch(`${server}/rtrnsltrt`, {
        headers: new Headers({
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }),
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
            word: text,
        }),
    });

    const words = (await response_words.json()) as TransliterateAPI;

    const response_define = await fetch(`${server}/define`, {
        headers: new Headers({
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }),
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
            words: words.result,
        }),
    });

    const meanings = (await response_define.json()) as DefineAPI;

    meanings.meanings.sort((a, b) => {
        return getAccumulativeNumber(b) - getAccumulativeNumber(a);
    });

    browser.storage.local.set({
        word: text,
        meanings: meanings.meanings.filter((m) => m.meanings.length > 0),
    });
});
