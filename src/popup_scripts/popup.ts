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

const selectionMenuMeanings = document.getElementById("mean");
const selectonMenuSettings = document.getElementById("settings");

if (selectionMenuMeanings) {
    selectionMenuMeanings.addEventListener("click", () => {
        const meaningsMenu = document.getElementById("main");
        const settingsMenu = document.getElementById("settings-menu");

        if (meaningsMenu && settingsMenu) {
            if (meaningsMenu.classList.contains("hidd")) {
                meaningsMenu.classList.remove("hidd");
                settingsMenu.classList.add("hidd");
            }
        }

        if (
            selectionMenuMeanings.classList.contains("not-selected") &&
            !selectionMenuMeanings.classList.contains("selected")
        ) {
            selectionMenuMeanings.classList.remove("not-selected");
            selectionMenuMeanings.classList.add("selected");
        }
        if (
            selectonMenuSettings &&
            selectonMenuSettings.classList.contains("selected") &&
            !selectonMenuSettings.classList.contains("not-selected")
        ) {
            selectonMenuSettings.classList.remove("selected");
            selectonMenuSettings.classList.add("not-selected");
        }
    });
}

if (selectonMenuSettings) {
    selectonMenuSettings.addEventListener("click", () => {
        const meaningsMenu = document.getElementById("main");
        const settingsMenu = document.getElementById("settings-menu");

        if (meaningsMenu && settingsMenu) {
            if (settingsMenu.classList.contains("hidd")) {
                settingsMenu.classList.remove("hidd");
                meaningsMenu.classList.add("hidd");
            }
        }

        if (
            selectonMenuSettings.classList.contains("not-selected") &&
            !selectonMenuSettings.classList.contains("selected")
        ) {
            selectonMenuSettings.classList.remove("not-selected");
            selectonMenuSettings.classList.add("selected");
        }

        if (
            selectionMenuMeanings &&
            selectionMenuMeanings.classList.contains("selected") &&
            !selectionMenuMeanings.classList.contains("not-selected")
        ) {
            selectionMenuMeanings.classList.remove("selected");
            selectionMenuMeanings.classList.add("not-selected");
        }
    });
}

const urlUpdater = document.getElementById("update");

if (urlUpdater) {
    urlUpdater.addEventListener("click", async (event) => {
        event.preventDefault();

        const urlForm = document.getElementById("site") as HTMLInputElement;

        let test = "";

        if (urlForm) {
            if (urlForm.value.length < 1) {
                browser.storage.local.set({
                    server: "",
                });

                return;
            }
            try {
                const test_request = await fetch(`${urlForm.value}`, {
                    headers: new Headers({
                        "Access-Control-Allow-Origin": "*",
                    }),
                    mode: "cors",
                });

                test = await test_request.text();
            } catch (err) {
                console.error(err);
            }

            if (test == "The server is running!\n") {
                browser.storage.local.set({
                    server: urlForm.value,
                });
            } else {
                const bad_url = document.getElementById("bad-url");

                if (bad_url) {
                    bad_url.style.setProperty("display", "block");
                }
            }
        }
    });
}

const urlForm = document.getElementById("site");

if (urlForm) {
    urlForm.addEventListener("change", () => {
        const bad_url = document.getElementById("bad-url");

        if (bad_url) {
            bad_url.style.setProperty("display", "none");
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

    const server = (await browser.storage.local.get("server")) as {
        server: string;
    };

    const urlForm = document.getElementById("site") as HTMLInputElement;
    if (urlForm) {
        if (server.server.length < 1) {
            urlForm.placeholder =
                "https://malo-server-amd64.onrender.com (default)";
        } else {
            urlForm.placeholder = server.server;
        }
    }

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
