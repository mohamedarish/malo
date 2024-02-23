document.addEventListener("DOMContentLoaded", async () => {
    const meanings = (await browser.storage.local.get("meanings")) as {
        meanings: string[];
    };

    const word = (await browser.storage.local.get("word")) as {
        word: {
            english: string;
            malayalam: string[];
        };
    };

    console.log(await browser.storage.local.get("meanings"));

    const the_word = document.getElementById("the-word");

    if (!the_word) return true;

    the_word.innerText = "Word: " + word.word.english + "(";

    for (let i = 0; i < word.word.malayalam.length; i += 1) {
        if (i < word.word.malayalam.length - 1) {
            the_word.innerText += word.word.malayalam[i] + ", ";
        } else {
            the_word.innerText += word.word.malayalam[i] + ")";
        }
    }

    if (meanings.meanings.length == 0) {
        const el = document.createElement("li"),
            myUl = document.getElementById("list-items");
        el.innerText += "അർത്ഥം കണ്ടെത്താൻ കഴിയുന്നില്ല";
        el.id = "list-item";
        if (myUl != null) {
            myUl.appendChild(el);
        }
    } else {
        for (let i = 0; i < meanings.meanings.length; i++) {
            const el = document.createElement("li"),
                btn = document.createElement("button"),
                content = document.createTextNode(meanings.meanings[i]),
                myUl = document.getElementById("list-items");

            const img = document.createElement("img");
            img.setAttribute("src", "../icons/copy-light.png");

            btn.appendChild(img);

            btn.id = "item-button";
            btn.addEventListener("click", function copyButtonFn() {
                navigator.clipboard.writeText(meanings.meanings[i]);
                const alert = document.getElementById("alert");

                if (!alert) return true;

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
});
