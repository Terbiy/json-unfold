const JsonNode = require('./json-node');
const TYPES = require('./types');

describe('Create JSON node object', () => {
    it('Should create JSON node object for good parameters', () => {
        const parent = {};

        expect(
            new JsonNode('test', 123, parent)
        ).toEqual({
            name: 'test',
            type: TYPES.NUMBER,
            parent,
            children: []
        });

        expect(
            new JsonNode('fefe', [], parent)
        ).toEqual({
            name: 'fefe',
            type: TYPES.ARRAY,
            parent,
            children: []
        });

        expect(
            new JsonNode('fefe', { asd: 123 }, parent)
        ).toEqual({
            name: 'fefe',
            type: TYPES.OBJECT,
            parent,
            children: []
        });

        expect(
            new JsonNode('fefe', false, parent)
        ).toEqual({
            name: 'fefe',
            type: TYPES.BOOLEAN,
            parent,
            children: []
        });
    });

    it('Should set null for absent parent', () => {
        expect(
            new JsonNode('fefe', 'meme')
        ).toEqual({
            name: 'fefe',
            type: TYPES.STRING,
            parent: null,
            children: []
        });
    });

    it('Should not handle wrong input', () => {
        expect(new JsonNode()).toEqual({
            name: undefined,
            type: '',
            parent: null,
            children: []
        });
    });
});
