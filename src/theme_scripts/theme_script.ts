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
    });
}
