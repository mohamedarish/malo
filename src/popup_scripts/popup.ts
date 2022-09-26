import meangings from "../types/meanings";

document.addEventListener("DOMContentLoaded", async () => {
    const meanings = (await browser.storage.local.get("meanings")) as {
        meanings: meangings[];
    };

    var the_word = document.getElementById("the-word")!;
    the_word.innerHTML = "Word: " + meanings.meanings[0].word;

    console.log("content_script: ", meanings.meanings);

    for (let i = 0; i < meanings.meanings.length; i++) {
        for (let j = 0; j < meanings.meanings[i].meaning.length; j++) {
            var el = document.createElement("li"),
                btn = document.createElement("button"),
                content = document.createTextNode(
                    meanings.meanings[i].meaning[j]
                ),
                myUl = document.getElementById("list-items");

            btn.innerHTML += '<i class="fa-duotone fa-copy"></i>';
            el.appendChild(content);
            el.appendChild(btn);
            el.id = "list-item";
            if (myUl != null) {
                myUl.appendChild(el);
            }
        }
    }
});
