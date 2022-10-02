import contentMessage from "../types/contentMessage";

window.addEventListener("mouseup", async () => {
    const selection = window.getSelection();

    if (!selection) return;

    if (!selection.toString()) return;

    const message: contentMessage = {
        word: selection.toString(),
        sender: "content_script",
    };

    const prevMessage = (await browser.storage.local.get("message")).message;

    if (prevMessage && prevMessage.word == message.word) return;

    browser.runtime.sendMessage(message);

    browser.storage.local.set({ "message": message });

});
