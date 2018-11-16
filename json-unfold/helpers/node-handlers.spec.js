const { wrapArrayChildName } = require('./node-handlers');
const JsonNode = require('./json-node');
const { buildNamesDelimitator } = require("./node-handlers");

describe('Testing array child wrapper', () => {
    it('Should not wrap non-array child into brackets', () => {
        const nonArray = { a: 1 };
        const nonArrayNode = new JsonNode('', nonArray, null);
        const aNode = new JsonNode('a', 1, nonArrayNode);

        wrapArrayChildName(aNode);

        expect(aNode).not.toEqual(new JsonNode('[a]', 1, nonArrayNode));
    });

    it('Should wrap array child name into brackets', () => {
        const array = [1];
        const arrayNode = new JsonNode('', array, null);
        const node0 = new JsonNode('0', 1, arrayNode);

        wrapArrayChildName(node0);

        expect(node0).toEqual(new JsonNode('[0]', 1, arrayNode))
    });
});


describe('Testing child delimitator', () => {
    const delimitate = buildNamesDelimitator('.');
    const parent = {
        name: '1'
    };

    it('Should add delimitator to all children except top-level', () => {
        expect([
            {
                name: 'a',
                parent
            },
            {
                name: 'b',
                parent
            },
            {
                name: 'c'
            }
        ].reduce(delimitate, '')).toBe('c.b.a');
    });

    it('Should not delimitate array childs', () => {
        const arrayParent = {
            ...parent,
            type: 'array'
        };

        expect([
            {
                name: '[a]',
                parent: arrayParent
            },
            {
                name: '[b]',
                parent: arrayParent
            },
            {
                name: 'c'
            }
        ].reduce(delimitate, '')).toBe('c[b][a]');
    });
});
