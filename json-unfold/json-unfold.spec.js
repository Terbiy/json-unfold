const jsonUnfold = require('./json-unfold');

describe('Right, wrong and trivial values', () => {
    const EMPTY_STRING = '';

    it('Should accept valid JSON', () => {
        expect(jsonUnfold('{ "a": 123 }')).toEqual({ a: 123 });
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
