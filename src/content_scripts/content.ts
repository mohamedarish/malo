console.log("content script loaded");

window.addEventListener("mouseup", () => {
    const selection = window.getSelection();

    if (selection && selection.toString()) {
        console.log(selection.toString());

        const message = {
            word: selection.toString(),
        };

        browser.runtime.sendMessage(message);
    }
});
