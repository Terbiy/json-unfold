const { jsonUnfold } = require('./json-unfold');

describe('Right, wrong and trivial values', () => {
    const EMPTY_STRING = '';

    it('Should accept valid JSON', () => {
        expect(jsonUnfold('{ "a": 123 }')).toEqual(['a']);
    });

    it('Should return empty string on invalid JSON', () => {
        expect(jsonUnfold('{{')).toBe(EMPTY_STRING);
    });

    it('Should return empty string on random string', () => {
        expect(jsonUnfold('adfef23"s')).toBe(EMPTY_STRING);
    });

    it('Should return empty string on number', () => {
        expect(jsonUnfold('78.21')).toBe(EMPTY_STRING);
    });

    it('Should return empty string on boolean', () => {
        expect(jsonUnfold('true')).toBe(EMPTY_STRING);
    });

    it('Should return empty string on null', () => {
        expect(jsonUnfold('null')).toBe(EMPTY_STRING);
    });

    it('Should return empty string on {}', () => {
        expect(jsonUnfold('{}')).toBe(EMPTY_STRING);
    });

    it('Should return empty string on []', () => {
        expect(jsonUnfold('[]')).toBe(EMPTY_STRING);
    });
});

describe('Should handle complex JSONs from project description', () => {
    it('Should handle JSON without dot in the names', () => {
        expect(jsonUnfold('{"a": {"b": "3", "c": [1, 1, 2, 3, "5"]}, "d": "hello", "e": true, "f": {"g": null}, "h": [], "i": {}}')).toEqual([
            'a.b',
            'a.c[0]',
            'a.c[1]',
            'a.c[2]',
            'a.c[3]',
            'a.c[4]',
            'd',
            'e',
            'f.g',
            'h',
            'i'
        ]);
    });

    it('Should handle JSON with dot in names', () => {
        expect(jsonUnfold('{"a.b": {"c": {"d": 3}}}')).toEqual([
            'a.b\\c\\d'
        ]);
    });
});
