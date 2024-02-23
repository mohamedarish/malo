window.addEventListener("mouseup", async () => {
    const selection = window.getSelection();

    if (!selection) return;

    if (!selection.toString()) return;

    const message = {
        word: selection.toString(),
        sender: "content_script",
    };

    browser.runtime.sendMessage({ message });
});
