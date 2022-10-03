import contentMessage from "../types/contentMessage";

window.addEventListener("mouseup", async () => {
    const selection = window.getSelection();

    if (!selection) return true;

    if (!selection.toString()) return true;

    const message: contentMessage = {
        word: selection.toString(),
        sender: "content_script",
    };

    const prevMessage = (await browser.storage.local.get("message")).message;

    if (prevMessage && prevMessage.word == message.word) return true;

    browser.runtime.sendMessage(message);

    browser.storage.local.set({ message: message });

    return true;
});
