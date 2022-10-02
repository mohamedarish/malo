import contentMessage from "../types/contentMessage";

console.log("content script loaded");

window.addEventListener("mouseup", async () => {
    const selection = window.getSelection();

    if (selection && selection.toString()) {
        console.log(selection.toString());

        const message: contentMessage = {
            word: selection.toString(),
            sender: "content_script",
        };

        const prevMessage = (await browser.storage.local.get("message")).message;

        console.log(prevMessage);
        console.log(message);
        if (prevMessage) console.log(prevMessage.word == message.word);

        if (prevMessage && prevMessage.word == message.word) return false;

        browser.runtime.sendMessage(message);

        browser.storage.local.set({ "message": message });
    }
});
