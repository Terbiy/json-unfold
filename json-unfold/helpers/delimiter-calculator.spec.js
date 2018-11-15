const { calculateDelimiter } = require("./delimiter-calculator");

const DOT = '.';
const BACKSLASH = '\\';

describe('Delimiter calculation', () => {
    it('Should return dots delimiter for names without dots', () => {
        expect(calculateDelimiter([
            'abcdefghijklmnopqrstuvwxyz',
            'zyxwvutsrqponmlkjihgfedcba'
        ])).toBe(DOT);
    });

    it('Should return backslash delimiter for first names with dots', () => {
        expect(calculateDelimiter([
            'abc.defghijklmnopqrstu.vwxyz',
            'zyxwvutsrqponmlkjihgfedcba'
        ])).toBe(BACKSLASH);
    });

    it('Should return backslash delimiter for other names with dots', () => {
        expect(calculateDelimiter([
            'abcdefghijklmnopqrstuvwxyz',
            'zyxwvutsrqponmlkjihgfedcba',
            'onmlkjihgfedcba.zy.x.wvutsrqp'
        ])).toBe(BACKSLASH);
    });
});
