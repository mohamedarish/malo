import { Meaning } from "../types/defineapi";

const themeSwitcher = document.getElementById("themeSwitcher");

const changeElements = (theme: string) => {
    const copyImage = document.querySelectorAll(".copy");

    for (let i = 0; i < copyImage.length; i += 1) {
        copyImage[i].setAttribute("src", `../icons/copy-${theme}.png`);
    }

    const themeSwitcher = document.getElementById("themeSwitcher");

    if (themeSwitcher) {
        themeSwitcher.setAttribute("src", `../icons/${theme}-mode.png`);
    }

    if (theme !== "dark") {
        document.body.classList.remove("dark");
    } else {
        document.body.classList.add("dark");
    }
};

if (themeSwitcher) {
    themeSwitcher.addEventListener("click", async () => {
        const currentTheme = await browser.storage.local.get("theme");

        if (!currentTheme || currentTheme.theme !== "dark") {
            browser.storage.local.set({ theme: "dark" });
            changeElements("dark");
        } else {
            browser.storage.local.remove("theme");
            changeElements("light");
        }
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const currentTheme = await browser.storage.local.get("theme");

    if (currentTheme && currentTheme.theme === "dark") {
        changeElements("dark");
    }

    const meanings = (await browser.storage.local.get("meanings")) as {
        meanings: Meaning[];
    };

    const word = (await browser.storage.local.get("word")) as { word: string };

    const wordHolder = document.getElementById("word");

    if (wordHolder) {
        wordHolder.innerText = word.word;
    }

    if (meanings.meanings.length < 1) {
        const list = document.getElementById("list");

        if (list) {
            const list_element = document.createElement("li");
            list_element.innerText = "അർത്ഥം കണ്ടെത്താൻ കഴിയുന്നില്ല";

            list.appendChild(list_element);
            return;
        }
    }

    meanings.meanings.forEach((word_instance) => {
        const list = document.getElementById("list");

        if (list) {
            const list_element = document.createElement("li");

            const word_instance_holder = document.createElement("span");
            word_instance_holder.innerText = word_instance.word;

            const copy_image = document.createElement("img");
            copy_image.setAttribute(
                "src",
                `../icons/copy-${
                    currentTheme.theme ? currentTheme.theme : "light"
                }.png`
            );
            copy_image.setAttribute("alt", "Copy");
            copy_image.classList.add("copy");

            copy_image.addEventListener("click", () => {
                navigator.clipboard.writeText(word_instance.word);

                const copyAlert = document.getElementById("alert");

                if (copyAlert) {
                    copyAlert.classList.add("visible");

                    setTimeout(() => {
                        copyAlert.classList.remove("visible");
                    }, 1500);
                }
            });

            word_instance_holder.appendChild(copy_image);

            list_element.appendChild(word_instance_holder);

            word_instance.meanings.forEach((meaning_instance) => {
                const meaning_instance_holder = document.createElement("ul");

                meaning_instance.forEach((meaning) => {
                    const meaning_holder = document.createElement("li");
                    meaning_holder.innerText = meaning;

                    meaning_instance_holder.appendChild(meaning_holder);
                });

                list_element.appendChild(meaning_instance_holder);
            });

            list.appendChild(list_element);
        }
    });
});

// For alert
//             btn.addEventListener("click", function copyButtonFn() {
//                 navigator.clipboard.writeText(meaning.word);
//                 const alert = document.getElementById("alert");

//                 if (!alert) return;

//                 alert.classList.add("visible");

//                 setTimeout(() => {
//                     alert.classList.remove("visible");
//                 }, 1500);
//             });