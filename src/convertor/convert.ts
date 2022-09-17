import { chillaksharam, compounds, consonants, modifiers, vowels } from "./data";
import split from "./split";


const en2ml = (word: string): string[] => {
	const res: string[] = [];

	const parts = split(word);

	// if (parts.length < 2) return; // this will be modified further but for now we assume no words with < 2 parts exist (I can't think of a valid case and hence it will be considered false to prevent searching for single letter meanings)

	for (let i = 0; i < parts.length; i += 1) {
		let oldRes: string[] = [];
		res.forEach(element => {
			oldRes.push(element);
		});

		if (i == 0) {
			let flag = true;

			for (let j = 0; j < vowels.length; j += 1) {
				if (vowels[j].english == parts[i]) {
					vowels[j].malayalam.forEach(aksharam => {
						res.push(aksharam);
					});
					flag = false;
					break;
				}
			}

			if (flag) {
				if (parts[i + 1][0].match(/[aeiou]/gi)) {
					for (let j = 0; j < consonants.length; j += 1) {
						if (consonants[j].english == parts[i]) {
							consonants[j].malayalam.forEach(aksharam => {
								res.push(aksharam);
							});
							flag = false;
							break;
						}
					}

					i += 1;

					res.filter(element => !oldRes.includes(element));

					oldRes = [];
					res.forEach(element => {
						oldRes.push(element);
					});

					flag = true;
					if (parts[i] === "a") {
						flag = false;
					}

					if (flag) {
						for (let j = 0; j < modifiers.length; j += 1) {
							if (modifiers[j].english == parts[i]) {
								for (let k = 0; k < oldRes.length; k += 1) {
									modifiers[j].malayalam.forEach(aksharam => {
										res.push(res[k] + aksharam);
									});
								}
								break;
							}
						}

						res.filter(element => !oldRes.includes(element));
					}
				} else {
					const compoundOrNot = parts[i] + parts[i + 1];

					for (let j = 0; j < compounds.length; j += 1) {
						if (compounds[j].english == compoundOrNot) {
							compounds[j].malayalam.forEach(aksharam => {
								res.push(aksharam);
							});
							flag = false;
							i += 1;
							break;
						}

						res.filter(element => !oldRes.includes(element));

						oldRes = [];
						res.forEach(element => {
							oldRes.push(element);
						});

						if (parts[i + 1][0].match(/[aeiou]/gi)) {
							i += 1;
							flag = true;

							if (parts[i] === "a") {
								flag = false;
							}

							if (flag) {
								for (let j = 0; j < modifiers.length; j += 1) {
									if (modifiers[j].english == parts[i]) {
										for (let k = 0; k < oldRes.length; k += 1) {
											modifiers[j].malayalam.forEach(aksharam => {
												res.push(res[k] + aksharam);
											});
										}
										break;
									}
								}

								res.filter(element => !oldRes.includes(element));
							}
						} else {
							for (let k = 0; k < oldRes.length; k += 1) {
								res.push(res[k] + modifiers[0].malayalam[0]);
							}

							res.filter(element => !oldRes.includes(element));
						}
					}

					if (flag) {
						for (let j = 0; j < consonants.length; j += 1) {
							if (consonants[j].english == parts[i]) {
								consonants[j].malayalam.forEach(aksharam => {
									res.push(aksharam);
								});
								flag = false;
								break;
							}
						}

						res.filter(element => !oldRes.includes(element));

						oldRes = [];
						res.forEach(element => {
							oldRes.push(element);
						});
						for (let k = 0; k < oldRes.length; k += 1) {
							res.push(res[k] + modifiers[0].malayalam[0]);
						}

						res.filter(element => !oldRes.includes(element));
					}

					if (flag) {
						res.push(parts[i]);
					}
				}
			}
		} else if (i == parts.length - 1) {
			let flag = true;

			for (let j = 0; j < chillaksharam.length; j += 1) {
				if (chillaksharam[j].english == parts[i]) {
					for (let k = 0; k < oldRes.length; k += 1) {
						chillaksharam[j].malayalam.forEach(aksharam => {
							res.push(res[k] + aksharam);
						});
					}
					flag = false;
					break;
				}
			}

			if (flag) {
				// for ()
			}
		}
		console.log(parts[i], res);
		res.filter(element => !oldRes.includes(element));
	}

	return res;
};

en2ml("kshaamam").forEach(word => {
	console.log(word);
});

// export default en2ml;
