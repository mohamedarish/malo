import en2ml from "../convertor/convert";
import getMeanings from "../dictionary/fetchData";
import Message from "../types/customMessage";
import dictionary from "../types/dictionary";

console.log("Background Script Loaded");

browser.runtime.onMessage.addListener(async (message: Message, sender, sendResponse) => {
    const selection = message.word;
    const DOMRect = message.domElement;

    console.log(selection, sender, sendResponse, DOMRect);

    const words = en2ml(selection);

    console.log(words);

    const datuk = await (await fetch("https://raw.githubusercontent.com/mohamedarish/ml2ml-dictionary/main/dictionary.json")).json() as dictionary[];

    const meanings = getMeanings(words, datuk);

    console.log(meanings);

    let toInsetList = "<ol>";

    meanings.forEach(meaning => {
        if (meaning.meaning.length > 0) {
            toInsetList += `<li>${meaning.word}</li><ul>`;

            meaning.meaning.forEach(definition => {
                toInsetList += `<li>${definition}</li>`;
            });

            toInsetList += "</ul>";
        }
    });

    toInsetList += "</ol>";

    console.log(toInsetList);
});
