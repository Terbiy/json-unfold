const JsonTree = require('./json-tree');
const JsonNode = require('./json-node');
const { wrapArrayChildName } = require('./node-handlers');

function getFlatFullObject() {
    return {
        a: 12,
        b: 'asd',
        c: null,
        d: {},
        e: [],
        f: false
    };
}

function getFlatFullFakeTree() {
    const root = new JsonNode('', {});
    return root
        .addChild(new JsonNode('a', 12, root))
        .addChild(new JsonNode('b', 'asd', root))
        .addChild(new JsonNode('c', null, root))
        .addChild(new JsonNode('d', {}, root))
        .addChild(new JsonNode('e', [], root))
        .addChild(new JsonNode('f', false, root));
}

function getDeepObject() {
    return {
        a: {
            b: 12,
            c: null,
            d: [1, {}, true]
        },
        e: 'test'
    };
}

function getDeepFakeStructure() {
    const tree = new JsonNode('', {});
    const dArray = [1, {}, true];
    const aObject = {
        b: 12,
        c: null,
        d: dArray
    };
    const aJsonNode = new JsonNode('a', aObject, tree);
    const bJsonNode = new JsonNode('b', 12, aJsonNode);
    const cJsonNode = new JsonNode('c', null, aJsonNode);
    const dJsonNode = new JsonNode('d', dArray, aJsonNode);
    const d0JsonNode = new JsonNode('0', 1, dJsonNode);
    const d1JsonNode = new JsonNode('1', {}, dJsonNode);
    const d2JsonNode = new JsonNode('2', true, dJsonNode);
    const eJsonNode = new JsonNode('e', 'test', tree);

    const leaves = [
        bJsonNode,
        cJsonNode,
        d0JsonNode,
        d1JsonNode,
        d2JsonNode,
        eJsonNode
    ];

    const all = [
        tree,
        aJsonNode,
        bJsonNode,
        cJsonNode,
        dJsonNode,
        d0JsonNode,
        d1JsonNode,
        d2JsonNode,
        eJsonNode
    ];

    tree
        .addChild(aJsonNode)
        .addChild(eJsonNode);
    tree.children[0]
        .addChild(bJsonNode)
        .addChild(cJsonNode)
        .addChild(dJsonNode);

    tree.children[0].children[2]
        .addChild(d0JsonNode)
        .addChild(d1JsonNode)
        .addChild(d2JsonNode);

    return {
        tree,
        leaves,
        all
    };
}

describe('Converting object to tree', () => {
    it('Should transform empty object to single node with no name', () => {
        const tree = new JsonTree({});

        expect(tree.tree).toEqual(new JsonNode('', {}));
    });

    it('Should transform every property to corresponding tree nodes', () => {
        expect(new JsonTree(getFlatFullObject()).tree).toEqual(getFlatFullFakeTree());
    });

    it('Should transform nested properties properly', () => {
        const tree = new JsonTree({
            a: {
                a: 1,
                b: null
            },
            b: 'asdf'
        });

        const expectedTree = (() => {
            const root = new JsonNode('', {});

            root.addChild(new JsonNode('a', { a: 1, b: null }, root))
                .addChild(new JsonNode('b', 'asdf', root));

            root.children[0]
                .addChild(new JsonNode('a', 1, root.children[0]))
                .addChild(new JsonNode('b', null, root.children[0]));

            return root;
        })();

        expect(tree.tree).toEqual(expectedTree);
    });

    it('Should transform empty array to single node with no name', () => {
        expect(new JsonTree([]).tree).toEqual(new JsonNode('', []));
    });

    it('Should transform array with primitive items to corresponding tree nodes', () => {
        const expectedTree = new JsonNode('', []);
        expectedTree
            .addChild(new JsonNode('0', 1, expectedTree))
            .addChild(new JsonNode('1', '2', expectedTree))
            .addChild(new JsonNode('2', true, expectedTree))
            .addChild(new JsonNode('3', {}, expectedTree))
            .addChild(new JsonNode('4', [], expectedTree))
            .addChild(new JsonNode('5', null, expectedTree));

        expect(new JsonTree([1, '2', true, {}, [], null]).tree).toEqual(expectedTree);
    });

    it('Should transform array with nested items to corresponding tree nodes', () => {
        const expectedTree = new JsonNode('', []);
        expectedTree
            .addChild(new JsonNode('0', { a: [1, 2] }, expectedTree))
            .addChild(new JsonNode('1', null, expectedTree));

        const innerObject = expectedTree.children[0];
        innerObject.addChild(new JsonNode('a', [1, 2], innerObject));

        const innerArray = innerObject.children[0];
        innerArray.addChild(new JsonNode('0', 1, innerArray));
        innerArray.addChild(new JsonNode('1', 2, innerArray));

        expect(new JsonTree([
            { a: [1, 2] },
            null
        ]).tree).toEqual(expectedTree);
    });
});

describe('Gathering leaves', () => {
    it('Should result into empty leaves set for empty object', () => {
        expect(new JsonTree({}).leaves).toEqual([]);
    });

    it('Should result into several leaves for one-layered object', () => {
        const root = new JsonNode('', {});
        const leaves = [
            new JsonNode('a', 12, root),
            new JsonNode('b', 'asd', root),
            new JsonNode('c', null, root),
            new JsonNode('d', {}, root),
            new JsonNode('e', [], root),
            new JsonNode('f', false, root)
        ];

        leaves.forEach((leave) => {
            root.addChild(leave);
        });

        expect(new JsonTree(getFlatFullObject()).leaves).toEqual(leaves);
    });

    it('Should result into several leaves for multilayered object', () => {
        expect(new JsonTree(getDeepObject()).leaves).toEqual(getDeepFakeStructure().leaves);
    });
});

describe('Traversing and modifying nodes', () => {
    it('Should traverse every node in flat tree', () => {
        const flatFullFakeTree = getFlatFullFakeTree();
        wrapArrayChildName(flatFullFakeTree);
        flatFullFakeTree.children.forEach(wrapArrayChildName);

        const flatFullTree = new JsonTree(getFlatFullObject());
        flatFullTree.forEach(wrapArrayChildName);

        expect(flatFullTree.tree).toEqual(flatFullFakeTree);
    });

    it('Should traverse every node in deep tree', () => {
        const deepTree = new JsonTree(getDeepObject());
        deepTree.forEach(wrapArrayChildName);

        const deepFakeStructure = getDeepFakeStructure();
        deepFakeStructure.all.forEach(wrapArrayChildName);

        expect(deepTree.tree).toEqual(deepFakeStructure.tree);
    });
});

const accumulateNames = (accumulatedName, node) => {
    return `${node.name}${accumulatedName}`;
};

describe('Accumulating value when applying reduce', () => {
    it('Should build the array of chained names for flat object', () => {
        const flatFullTree = new JsonTree(getFlatFullObject());

        expect(flatFullTree.reduceByLeaf(accumulateNames, '')).toEqual([
            'a',
            'b',
            'c',
            'd',
            'e',
            'f'
        ]);
    });

    it('Should build the array of chained names for deep object', () => {
        const deepTree = new JsonTree(getDeepObject());

        expect(deepTree.reduceByLeaf(accumulateNames, '')).toEqual([
            'ab',
            'ac',
            'ad0',
            'ad1',
            'ad2',
            'e'
        ]);
    })
});
