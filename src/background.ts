console.log("Extension Loaded");

browser.menus.create({
    id: "define-malo",
    title: "Find definition using malo",
    contexts: ["selection"],
});

browser.menus.onClicked.addListener(async (info) => {
    if (!info) return;

    if (info.menuItemId != "muted-tab") return;

    if (!info.selectionText) return;

    const text = info.selectionText.split(" ")[0];
});
