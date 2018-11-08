const getType = require('./types-helper').getType;
const TYPES = require('./types');

describe('Types existing in JSON', () => {
    it('Should define boolean right', () => {
        expectEachToBeType([true, false], TYPES.BOOLEAN);
    });

    it('Should define something not to be boolean right', () => {
        expectEachNotToBeType([
            'adsf',
            12,
            [1, 3]
        ], TYPES.BOOLEAN);
    });

    it('Should define numbers right', () => {
        expectEachToBeType([
            12.333,
            1
        ], TYPES.NUMBER);
    });

    it('Should define something that is not number right', () => {
        expectEachNotToBeType([
            'aasf',
            true,
            {}
        ], TYPES.NUMBER);
    });

    it('Should define string right', () => {
        expectEachToBeType([
            'asdfasd asdfasdf ',
            ''
        ], TYPES.STRING);
    });

    it('Should define something that is not string right', () => {
        expectEachNotToBeType([
            122.22,
            [2, 'asd'],
            false
        ], TYPES.STRING);
    });

    it('Should define arrays right', () => {
        expectEachToBeType([
            [],
            [12, 31, {}]
        ], TYPES.ARRAY);
    });

    it('Should define something that is not array right', () => {
        expectEachNotToBeType([
            {},
            12.21,
            '12313.131212, fasfasf, 1312'
        ], TYPES.ARRAY);
    });

    it('Should define object right', () => {
        expectEachToBeType([
            {},
            { a: 12 }
        ], TYPES.OBJECT);
    });

    it('Should define something that is not object right', () => {
        expectEachNotToBeType([
            111,
            'asdf',
            false
        ], TYPES.OBJECT);
    });

    it('Should define null right', () => {
        expect(getType(null)).toBe(TYPES.NULL);
    });

    it('Should define something that is not null right', () => {
        expectEachNotToBeType([
            123,
            {},
            [],
            false,
            true,
            'null'
        ], TYPES.NULL);
    })
});

function expectEachToBeType(essences, type) {
    essences.forEach((essence) => {
        expect(getType(essence)).toBe(type);
    });
}

function expectEachNotToBeType(essences, type) {
    essences.forEach((essence) => {
        expect(getType(essence)).not.toBe(type);
    });
}
