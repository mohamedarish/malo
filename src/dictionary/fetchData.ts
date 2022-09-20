import dictionary from "../types/dictionary";
import meangings from "../types/meanings";

const getMeanings = (words: string[]): meangings[] => {
	const res: meangings[] = [];

	words.forEach(async word => {

		await fetch("https://raw.githubusercontent.com/mohamedarish/ml2ml-dictionary/main/dictionary.json")
			.then(async response => {
				let dictionary = await response.json() as dictionary[];

				// console.log(dictionary);

				dictionary = dictionary.filter(element => {
					element.entry.replace(/[0-9]/g, "") == word;
				});

				// console.log(dictionary);

				const definition: string[] = [];

				dictionary.forEach(occurance => {
					occurance.defs.forEach(mean => {
						definition.push(mean.entry);
					});
				});

				res.push({
					word: word,
					meaning: definition
				});
			});
	});

	return res;
};


console.log(getMeanings(["കാക്കച്ചുവട്"]));

getMeanings(["കാക്കച്ചുവട്"]).forEach(element => {
	console.log("starting");
	console.log(element.word);

	element.meaning.forEach(meaning => {
		console.log(meaning);
	});
	console.log();
});

export default getMeanings;