import dictionary from "../types/dictionary";
import meangings from "../types/meanings";

const getMeanings = (words: string[]): meangings[] => {
	const res: meangings[] = [];

	words.forEach(async word => {

		await fetch("https://raw.githubusercontent.com/mohamedarish/ml2ml-dictionary/main/dictionary.json")
			.then(async response => {
				let dictionary = await response.json() as dictionary[];

				console.log(dictionary);

				dictionary = dictionary.filter(element => {
					element.entry.replace(/[0-9]/g, "") == word;
				});

				console.log(dictionary);

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

// getMeanings(en2ml("kshethram")).forEach(meaning => {
// 	console.log(meaning);
// });

export default getMeanings;