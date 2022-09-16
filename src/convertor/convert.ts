import { vowels, consonants/*, compounds, chillaksharam, modifiers*/ } from "./data";

const en2ml = (word: string): string[] => {
	const res: string[] = [];

	for (let i = 0; i < word.length; i += 1) {
		if (i == 0) {
			let flag = false;
			vowels.forEach(letter => {
				if (letter.english == word[i]) {
					letter.malayalam.forEach(aksharam => {
						res.push(aksharam);
					});
					flag = true;
				}
			});

			if (!flag) {
				consonants.forEach(letter => {
					if (letter.english == word[i]) {
						letter.malayalam.forEach(aksharam => {
							res.push(aksharam);
						});
					}
				});
			}
		}
	}

	return res;
};

console.log(en2ml("omana"));

// export default en2ml;
