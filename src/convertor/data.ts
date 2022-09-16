import letters from "../types/letter";

const vowels: letters[] = [
    {
        english: "a",
        malayalam: ["അ "]
    },
    {
        english: "aa",
        malayalam: ["ആ "]
    },
    {
        english: "i",
        malayalam: ["ഇ "]
    },
    {
        english: "ee",
        malayalam: ["ഈ "]
    },
    {
        english: "u",
        malayalam: ["ഉ "]
    },
    {
        english: "oo",
        malayalam: ["ഊ "]
    },
    {
        english: "ru",
        malayalam: ["ഋ "]
    },
    {
        english: "e",
        malayalam: ["എ ", "ഏ "]
    },
    {
        english: "ai",
        malayalam: ["ഐ "]
    },
    {
        english: "o",
        malayalam: ["ഒ ", "ഓ "]
    },
    {
        english: "ou",
        malayalam: ["ഔ "]
    }
];

const compounds: letters[] = [
    {
        english: "kk",
        malayalam: ["ക്ക"]
    },
    {
        english: "gg",
        malayalam: ["ഗ്ഗ"]
    },
    {
        english: "ng",
        malayalam: ["ങ്ങ"]
    },
    {
        english: "cch",
        malayalam: ["ച്ച"]
    },
    {
        english: "jj",
        malayalam: ["ജ്ജ"]
    },
    {
        english: "nj",
        malayalam: ["ഞ"]
    },
    {
        english: "tt",
        malayalam: ["ട്ട", "റ്റ"]
    },
    {
        english: "nn",
        malayalam: ["ണ്ണ", "ഞ്ഞ", "ന്ന"]
    },
    {
        english: "tth",
        malayalam: ["ത്ത"]
    },
    {
        english: "ddh",
        malayalam: ["ദ്ദ", "ദ്ധ"]
    },
    {
        english: "nth",
        malayalam: ["ന്ത"]
    },
    {
        english: "nk",
        malayalam: ["ങ്ക"]
    },
    {
        english: "nd",
        malayalam: ["ണ്ട"]
    },
    {
        english: "bb",
        malayalam: ["ബ്ബ"]
    },
    {
        english: "pp",
        malayalam: ["പ്പ"]
    },
    {
        english: "mm",
        malayalam: ["മ്മ"]
    },
    {
        english: "yy",
        malayalam: ["യ്യ"]
    },
    {
        english: "ll",
        malayalam: ["ല്ല"]
    },
    {
        english: "vv",
        malayalam: ["വ്വ"]
    },
    {
        english: "ssh",
        malayalam: ["ശ്ശ"]
    },
    {
        english: "ss",
        malayalam: ["സ്സ"]
    },
    {
        english: "ks",
        malayalam: ["ക്സ"]
    },
    {
        english: "nch",
        malayalam: ["ഞ്ച"]
    },
    {
        english: "ksh",
        malayalam: ["ക്ഷ"]
    },
    {
        english: "mb",
        malayalam: ["ന്റ"]
    },
    {
        english: "nthy",
        malayalam: ["ന്ത്യ"]
    }
];

const consonants: letters[] = [
    {
        english: "k",
        malayalam: ["ക"]
    },
    {
        english: "kh",
        malayalam: ["ഖ"]
    },
    {
        english: "g",
        malayalam: ["ഗ"]
    },
    {
        english: "gh",
        malayalam: ["ഘ"]
    },
    {
        english: "ng",
        malayalam: ["ങ"]
    },
    {
        english: "ch",
        malayalam: ["ച"]
    },
    {
        english: "chh",
        malayalam: ["ഛ"]
    },
    {
        english: "j",
        malayalam: ["ജ"]
    },
    {
        english: "jh",
        malayalam: ["ഝ"]
    },
    {
        english: "nj",
        malayalam: ["ഞ"]
    },
    {
        english: "t",
        malayalam: ["ട"]
    },
    {
        english: "dt",
        malayalam: ["ഠ"]
    },
    {
        english: "d",
        malayalam: ["ഡ"]
    },
    {
        english: "dd",
        malayalam: ["ഢ"]
    },
    {
        english: "n",
        malayalam: ["ണ", "ന"]
    },
    {
        english: "th",
        malayalam: ["ത"]
    },
    {
        english: "thh",
        malayalam: ["ഥ"]
    },
    {
        english: "dh",
        malayalam: ["ദ"]
    },
    {
        english: "dhh",
        malayalam: ["ധ"]
    },
    {
        english: "p",
        malayalam: ["പ"]
    },
    {
        english: "ph",
        malayalam: ["ഫ"]
    },
    {
        english: "b",
        malayalam: ["ബ"]
    },
    {
        english: "bh",
        malayalam: ["ഭ"]
    },
    {
        english: "m",
        malayalam: ["മ"]
    },
    {
        english: "y",
        malayalam: ["യ"]
    },
    {
        english: "r",
        malayalam: ["ര", "റ"]
    },
    {
        english: "l",
        malayalam: ["ല", "ള"]
    },
    {
        english: "v",
        malayalam: ["വ"]
    },
    {
        english: "sh",
        malayalam: ["ശ", "ഷ"]
    },
    {
        english: "s",
        malayalam: ["സ"]
    },
    {
        english: "h",
        malayalam: ["ഹ"]
    },
    {
        english: "zh",
        malayalam: ["ഴ"]
    }
];

const chillaksharam: letters[] = [
    {
        english: "l",
        malayalam: ["ൽ", "ൾ"]
    },
    {
        english: "n",
        malayalam: ["ൺ", "ൻ"]
    },
    {
        english: "r",
        malayalam: ["ർ"]
    },
    {
        english: "m",
        malayalam: ["ം"]
    }
];

const modifiers: letters[] = [
    {
        english: ".",
        malayalam: ["്"]
    },
    {
        english: "aa",
        malayalam: ["ാ"]
    },
    {
        english: "i",
        malayalam: ["ി"]
    },
    {
        english: "ee",
        malayalam: ["ീ"]
    },
    {
        english: "u",
        malayalam: ["ു"]
    },
    {
        english: "oo",
        malayalam: ["ൂ"]
    },
    {
        english: "ru",
        malayalam: ["ൃ"]
    },
    {
        english: "e",
        malayalam: ["െ", "േ"]
    },
    {
        english: "ai",
        malayalam: ["ൈ"]
    },
    {
        english: "o",
        malayalam: ["ൊ", "ോ"]
    },
    {
        english: "ou",
        malayalam: ["ൗ"]
    },
    {
        english: "au",
        malayalam: ["ൗ"]
    }
];

export default { vowels, compounds, consonants, chillaksharam, modifiers };
