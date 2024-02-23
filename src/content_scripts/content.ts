window.addEventListener("mouseup", async () => {
    const selection = window.getSelection();

    if (!selection) return;

    if (!selection.toString()) return;

    const message = {
        word: selection.toString(),
    };

    browser.runtime.sendMessage({ message });
});
