const checkbox = document.getElementById("checkbox");

if (checkbox) {
    checkbox.addEventListener("change", () => {
        document.body.classList.toggle("dark");
        const olamHeader = document.getElementById("olam-header");
        if (!olamHeader) return;
        olamHeader.classList.toggle("dark");
        const labelElement = document.getElementById("label");
        if (!labelElement) return;
        labelElement.classList.toggle("dark");
        const ballToggler = document.getElementById("ball");
        if (!ballToggler) return;
        ballToggler.classList.toggle("dark");
        const copyImages = document.querySelectorAll(".copy-image");

        if (ballToggler.classList.contains("dark")) {
            browser.storage.local.set({
                theme: "dark",
            });

            for (let i = 0; i < copyImages.length; i += 1) {
                copyImages[i].setAttribute("src", "../icons/copy-dark.png");
            }
        } else {
            browser.storage.local.set({ theme: "light" });

            for (let i = 0; i < copyImages.length; i += 1) {
                copyImages[i].setAttribute("src", "../icons/copy-light.png");
            }
        }
    });
}
