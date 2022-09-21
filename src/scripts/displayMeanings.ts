import en2ml from "../convertor/convert";
import getMeanings from "../dictionary/fetchData";
import dictionary from "../types/dictionary";

console.log("content Script Loaded");

document.onclick = async (event) => {
	const selection = window.getSelection();

	if ((selection && selection.toString().length > 0)) {
		console.log(window.getSelection()?.toString());


		const words = en2ml(selection.toString());

		const datuk = await (await fetch("https://raw.githubusercontent.com/mohamedarish/ml2ml-dictionary/main/dictionary.json")).json() as dictionary[];

		const meanings = getMeanings(words, datuk);

		let content = "<ul>";

		meanings.forEach(meaning => {
			if (meaning.meaning.length > 0) {
				content += `<li>${meaning.word}<ol>`;

				meaning.meaning.forEach(artham => {
					content += `<li>${artham}</li>`;
				});

				content += "</ol></li>";
			}
		});

		content += "</ul>";

		const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

		document.body.insertAdjacentHTML("beforeend", `<div id = 'meaning-snippet' style = 'position: absolute; top: ${event.clientY + 20 + scrollTop} px; left: ${event.clientX - 110} px; '>${content}</div>`);
	}
};
