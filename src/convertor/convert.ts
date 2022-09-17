import split from "./split";

const en2ml = (word: string): string[] => {
	const res: string[] = [];

	const parts = split(word);

	// if (parts.length < 2) return; // this will be modified further but for now we assume no words with < 2 parts exist (I can't think of a valid case and hence it will be considered false to prevent searching for single letter meanings)

	for (let i = 0; i < parts.length; i += 1) {
		if (i == 0 && parts[i][0].match(/[aeiou]/gi)) {
			// this part is a vowel (cannot be a modifier as we've handled the modifier and it cannot occur as the word does not start with a vowel) also vowel can occur only at the first letter and vowels never occur in the middle.
			
		} else {
			// this part is a consonant or chillaksharam (if i == parts/length - 1)
			if (parts[i + 1][0].match(/[aeiou]/gi)) {
				// next part is a vowel and hence mix the 2 parts
			} else {
				// next part is not a vowel and hence it can be a compound or . and hence we check to see if it is a compound or .

				// after checks we found that it is not . and hence we chekc the next letter. (incremented the value of i in the above as it is not .)
				if (parts[i + 1].match(/[aeiou]/gi)) {
					// the next part is a vowel and hence we find that value too.
				} else {
					// The value is equal to . and hence we append with .
				}
			}
		}
	}

	return res;
};

en2ml("kshaamam").forEach((word) => {
	console.log(word);
});

// export default en2ml;
