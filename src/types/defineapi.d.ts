export type Meaning = {
    word: string;
    meanings: string[][] | [];
};

export type DefineAPI = {
    meanings: Meaning[];
};
