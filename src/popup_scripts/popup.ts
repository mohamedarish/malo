import { Meaning } from "../types/defineapi";

const setTheme = async () => {
    const themeSet = await browser.storage.local.get("theme");

    if (themeSet && themeSet.theme == "dark") {
        const checkbox = document.getElementById("checkbox");

        if (checkbox) {
            (checkbox as HTMLInputElement).checked = true;
        }

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

        for (let i = 0; i < copyImages.length; i += 1) {
            copyImages[i].setAttribute("src", "../icons/copy-dark.png");
        }
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    await setTheme();

    const theme = await browser.storage.local.get("theme");

    const meanings = (await browser.storage.local.get("meanings")) as {
        meanings: Meaning[];
    };

    const word = (await browser.storage.local.get("word")) as {
        word: string;
    };

    const the_word = document.getElementById("the-word");

    if (!the_word) return true;

    the_word.innerText = "Word: " + word.word;

    const myUI = document.getElementById("list-items");

    // if (myUI) {
    // myUI.innerText += JSON.stringify(meanings.meanings);
    // }

    if (meanings.meanings.length < 1) {
        const el = document.createElement("li");

        el.innerText += "അർത്ഥം കണ്ടെത്താൻ കഴിയുന്നില്ല";
        el.id = "list-item";

        if (myUI) {
            myUI.appendChild(el);
        }
    } else {
        meanings.meanings.forEach((meaning) => {
            const meaning_holder = document.createElement("li");

            const heading = document.createElement("h3");
            heading.innerText = meaning.word;

            heading.className = "wordMal";

            const list_of_meanings = document.createElement("ol");
            meaning.meanings.forEach((m) => {
                const one_def_set_holder = document.createElement("li");

                const one_def_set = document.createElement("ul");

                m.forEach((me) => {
                    const one_def = document.createElement("li");

                    one_def.innerText += me;

                    one_def_set.appendChild(one_def);
                });

                one_def_set_holder.appendChild(one_def_set);

                list_of_meanings.appendChild(one_def_set);
            });

            const btn = document.createElement("button");

            const img = document.createElement("img");

            img.className = "copy-image";
            if (theme && theme.theme == "dark") {
                img.setAttribute("src", "../icons/copy-dark.png");
            } else {
                img.setAttribute("src", "../icons/copy-light.png");
            }

            btn.appendChild(img);

            btn.id = "item-button";
            btn.addEventListener("click", function copyButtonFn() {
                navigator.clipboard.writeText(meaning.word);
                const alert = document.getElementById("alert");

                if (!alert) return;

                alert.classList.add("visible");

                setTimeout(() => {
                    alert.classList.remove("visible");
                }, 1500);
            });

            meaning_holder.appendChild(heading);
            meaning_holder.appendChild(btn);
            meaning_holder.appendChild(list_of_meanings);

            const horizontal_rule = document.createElement("hr");

            meaning_holder.appendChild(horizontal_rule);

            if (myUI) {
                myUI.appendChild(meaning_holder);
            }
        });
    }
});

// if (meanings.meanings.length == 0) {
//     const el = document.createElement("li"),
//         myUl = document.getElementById("list-items");
//     el.innerText += "അർത്ഥം കണ്ടെത്താൻ കഴിയുന്നില്ല";
//     el.id = "list-item";
//     if (myUl != null) {
//         myUl.appendChild(el);
//     }
// } else {
//     for (let i = 0; i < meanings.meanings.length; i++) {
//         const el = document.createElement("li"),
//             btn = document.createElement("button"),
//             content = document.createTextNode(meanings.meanings[i]),
//             myUl = document.getElementById("list-items");

//         const img = document.createElement("img");
//         img.setAttribute("src", "../icons/copy-light.png");

//         btn.appendChild(img);

//         btn.id = "item-button";
//         btn.addEventListener("click", function copyButtonFn() {
//             navigator.clipboard.writeText(meanings.meanings[i]);
//             const alert = document.getElementById("alert");

//             if (!alert) return true;

//             alert.classList.add("visible");

//             setTimeout(() => {
//                 alert.classList.remove("visible");
//             }, 1500);
//         });
//         el.appendChild(content);
//         el.appendChild(btn);
//         el.id = "list-item";
//         if (myUl != null) {
//             myUl.appendChild(el);
//         }
//     }
// }
