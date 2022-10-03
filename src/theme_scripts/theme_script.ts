const checkbox = document.getElementById("checkbox");

if (checkbox) {
    checkbox.addEventListener("change", () => {
        document.body.classList.toggle("dark");
        const olamHeader = document.getElementById("olam-header");
        if (!olamHeader) return true;
        olamHeader.classList.toggle("dark");
        const labelElement = document.getElementById("label");
        if (!labelElement) return true;
        labelElement.classList.toggle("dark");
        const ballToggler = document.getElementById("ball");
        if (!ballToggler) return true;
        ballToggler.classList.toggle("dark");
    });
}
