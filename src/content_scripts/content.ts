import contentMessage from "../types/contentMessage";

console.log("content script loaded");

window.addEventListener("mouseup", () => {
    const selection = window.getSelection();

    if (selection && selection.toString()) {
        console.log(selection.toString());

        const message: contentMessage = {
            domElement: selection.getRangeAt(0).getBoundingClientRect(),
            word: selection.toString(),
            sender: "content_script",
        };

        browser.runtime.sendMessage(message);
    }
});
