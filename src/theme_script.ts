const checkbox = document.getElementById("checkbox")!;

checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    document.getElementById("olam-header")!.classList.toggle("dark");
    document.getElementById("label")!.classList.toggle("dark");
    document.getElementById("ball")!.classList.toggle("dark");
});
