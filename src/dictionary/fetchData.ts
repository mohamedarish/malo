import en2ml from "../convertor/convert";
import dictionary from "../types/dictionary";
import meangings from "../types/meanings";

const getMeanings = (words: string[]): meangings[] => {
	const res: meangings[] = [];

	words.forEach(async word => {
		let dictionary: dictionary[];

		await fetch("https://raw.githubusercontent.com/mohamedarish/ml2ml-dictionary/main/dictionary.json")
			.then(async response => {
				dictionary = await response.json() as dictionary[];
				dictionary.filter(element => {
					element.entry == word;
				});

				const meanings: string[] = [];

				dictionary.forEach(occurance => {
					occurance.defs.forEach(mean => {
						meanings.push(mean.entry);
					});
				});

				res.push({
					word: word,
					meaning: meanings
				});
			});

		res.push({
			word: word,
			meaning: []
		});
	});

	return res;
};

getMeanings(en2ml("kshethram")).forEach(meaning => {
	console.log(meaning);
});

export default getMeanings;