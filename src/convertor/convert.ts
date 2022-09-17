import { modifiers, chillaksharam, compounds, consonants, vowels } from "./data";
import split from "./split";

const en2ml = (word: string): string[] => {
	const res: string[] = [];

	const parts = split(word);

	// if (parts.length < 2) return; // this will be modified further but for now we assume no words with < 2 parts exist (I can't think of a valid case and hence it will be considered false to prevent searching for single letter meanings)

	for (let i = 0; i < parts.length; i += 1) {
		let oldRes: string[] = [];
		let flag = true;

		res.forEach((element) => {
			oldRes.push(element);
		});

		if (i == 0 && parts[i][0].match(/[aeiou]/gi)) {
			// this part is a vowel (cannot be a modifier as we've handled the modifier and it cannot occur as the word does not start with a vowel) also vowel can occur only at the first letter and vowels never occur in the middle.
			for (let j = 0; j < vowels.length; j += 1) {
				if (vowels[j].english == parts[i]) {
					vowels[j].malayalam.forEach((aksharam) => {
						res.push(aksharam);
					});
				}
			}
		} else {
			// not a vowel, so consonant, chillaksharam or compound.
			// compound >> chillaksharam >> consonant and hence we check for this in this order.

			if (i < parts.length - 1 && !parts[i + 1][0].match(/[aeiou]/gi)) {
				// this means that it is either a compound or chillaksharam or it is a consonant that ends with .
				const joined = parts[i] + parts[i + 1]; // the oart i + 1 may or may not make it a fit to become a compound

				for (let j = 0; j < compounds.length; j += 1) {
					if (compounds[j].english == joined) {
						i += 1; // this is done as the next part has been used up to compound this letter
						flag = false;
						oldRes.forEach(element => { // no compound appears at the start of the word and hence we assume that res.length >= 1
							compounds[j].malayalam.forEach(aksharam => {
								res.push(element + aksharam);
							});
						});
						break;
					}
				}

				if (flag) {
					// we found out that it is not a compound and now we know that part i + 1 isn't a vowel and hence this letter can either be a chillaksharam or a consonant that ends with .

					// checking if it is a chilaksharam
					for (let j = 0; j < chillaksharam.length; j += 1) {
						if (chillaksharam[j].english == parts[i]) {
							flag = false;
							oldRes.forEach(element => {// no chillaksharam can occur at the start of the word and hence we assume that res.length >= 1
								compounds[j].malayalam.forEach(aksharam => {
									res.push(element + aksharam);
								});
							});
							break;
						}
					}

					if (flag) {
						// now it is not a chillaksharam either, which makes us conclude that it is a consonant that ends with .

						for (let j = 0; j < consonants.length; j += 1) {
							if (consonants[j].english == parts[i]) {
								flag = false; // we still don't know if it is an invalid sequence and hence we maintain the flag
								oldRes.forEach(element => {
									consonants[j].malayalam.forEach(aksharam => {
										res.push(element + aksharam + modifiers[0].malayalam[0]); // we know that it ends with .
									});
								});
								if (oldRes.length < 1) {
									consonants[j].malayalam.forEach(aksharam => {
										res.push(aksharam + modifiers[0].malayalam[0]); // we know that it ends with .
									});
								}
								break;
							}
						}

						if (flag) {
							// invalid character sequence detected and hence we keep it as is.
							if (oldRes.length < 1) {
								res.push(parts[i]);
							} else {
								oldRes.forEach(element => {
									res.push(element + parts[i]);
								});
							}
						}
					}
				}
			} else if (i == parts.length) {
				// not a vowel ending and it is not a compound as we have found out before, and now the word can either end with a chillaksharam or a consonatn ending with .

				// checking if it is a chillaksharam
				for (let j = 0; j < chillaksharam.length; j += 1) {
					if (chillaksharam[j].english == parts[i]) {
						flag = false;
						oldRes.forEach(element => {// no chillaksharam can occur at the start of the word and hence we assume that res.length >= 1
							compounds[j].malayalam.forEach(aksharam => {
								res.push(element + aksharam);
							});
						});
						break;
					}
				}

				if (flag) {
					// now it is not a chillaksharam either, which makes us conclude that it is a consonant that ends with .

					for (let j = 0; j < consonants.length; j += 1) {
						if (consonants[j].english == parts[i]) {
							flag = false; // we still don't know if it is an invalid sequence and hence we maintain the flag
							oldRes.forEach(element => {
								consonants[j].malayalam.forEach(aksharam => {
									res.push(element + aksharam + modifiers[0].malayalam[0]); // we know that it ends with .
								});
							});
							if (oldRes.length < 1) {
								consonants[j].malayalam.forEach(aksharam => {
									res.push(aksharam + modifiers[0].malayalam[0]); // we know that it ends with .
								});
							}
							break;
						}
					}

					if (flag) {
						// invalid character sequence detected and hence we keep it as is.
						if (oldRes.length < 1) {
							res.push(parts[i]);
						} else {
							oldRes.forEach(element => {
								res.push(element + parts[i]);
							});
						}
					}
				}
			} else {
				// now it can only be a consonant ending with a modifier in the next part.
				
			}
		}
	}

	return res;
};

en2ml("kshaamam").forEach((word) => {
	console.log(word);
});

export default en2ml;
