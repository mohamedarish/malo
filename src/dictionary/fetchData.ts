import dictionary from "../types/dictionary";
import meangings from "../types/meanings";

const getMeanings = (words: string[], datuk: dictionary[]): meangings[] => {
	const res: meangings[] = [];

	words.forEach(async word => {

		const corpus = datuk.filter(element => {
			return element.head.charCodeAt(0) === word.charCodeAt(0) && element.entry.length === word.length && element.entry.includes(word);
		});

		const definitions: string[] = [];

		corpus.forEach(occurance => {
			occurance.defs.forEach(meaning => {
				definitions.push(meaning.entry);
			});
		});

		res.push({
			word: word,
			meaning: definitions
		});
	});

	return res;
};

export default getMeanings;