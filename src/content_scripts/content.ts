import Message from "../types/customMessage";

console.log("content script loaded");

window.addEventListener("mouseup", () => {
    const selection = window.getSelection();

    browser.runtime.sendMessage({ word: "emptyOut", domElement: DOMRect });

    if (selection && selection.toString()) {
        console.log(selection.toString());

        const message: Message = {
            domElement: selection.getRangeAt(0).getBoundingClientRect(),
            word: selection.toString()
        };

        browser.runtime.sendMessage(message);
    }
});
