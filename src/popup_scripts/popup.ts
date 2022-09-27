import meangings from "../types/meanings";

document.addEventListener("DOMContentLoaded", async () => {
    const meanings = (await browser.storage.local.get("meanings")) as {
        meanings: meangings[];
    };

    const the_word = document.getElementById("the-word");

    if (!the_word) return;

    the_word.innerText = "Word: " + meanings.meanings[0].word;

    console.log("content_script: ", meanings.meanings);

    if (meanings.meanings[0].meaning.length === 0) {
        const el = document.createElement("li"),
            myUl = document.getElementById("list-items");
        el.innerText += "അർത്ഥം കണ്ടെത്താൻ കഴിയുന്നില്ല";
        el.id = "list-item";
        if (myUl != null) {
            myUl.appendChild(el);
        }
    } else {
        for (let i = 0; i < meanings.meanings.length; i++) {
            for (let j = 0; j < meanings.meanings[i].meaning.length; j++) {
                const el = document.createElement("li"),
                    btn = document.createElement("button"),
                    content = document.createTextNode(
                        meanings.meanings[i].meaning[j]
                    ),
                    myUl = document.getElementById("list-items");

                const img = document.createElement("img");
                img.setAttribute("src", "../icons/copy-light.png");

                btn.appendChild(img);

                btn.id = "item-button";
                btn.addEventListener("click", function copyButtonFn() {
                    navigator.clipboard.writeText(
                        meanings.meanings[i].meaning[j]
                    );
                    const alert = document.getElementById("alert");

                    if (!alert) return;

                    alert.classList.add("visible");

                    setTimeout(() => {
                        alert.classList.remove("visible");
                    }, 1500);
                });
                el.appendChild(content);
                el.appendChild(btn);
                el.id = "list-item";
                if (myUl != null) {
                    myUl.appendChild(el);
                }
            }
        }
    }
});
