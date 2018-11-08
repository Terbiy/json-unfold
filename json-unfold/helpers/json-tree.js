const JsonNode = require('./json-node');
const { isNonEmptyObjectOrArray } = require('./types-helper');

class JsonTree {
    constructor(parsedJson) {
        this.parsedJson = parsedJson;
        this.tree = new JsonNode('', parsedJson);
        this.leaves = [];
        this.iteratedNodes = new Set();
        this.handle = () => {};

        this._transformToTree();
    }

    forEach(handle) {
        this.handle = handle;

        this.leaves.forEach((leaf) => {
            this._handleYetToBeHandled(leaf);
        });

        this.iteratedNodes.clear();
    }

    _handleYetToBeHandled(leaf) {
        if (this._yetToBeHandled(leaf)) {
            this.handle(leaf);
            this._setHandled(leaf);
            this._handleYetToBeHandled(leaf.parent);
        }
    }

    _yetToBeHandled(leaf) {
        return leaf && !this.iteratedNodes.has(leaf);
    }

    _setHandled(leaf) {
        this.iteratedNodes.add(leaf);
    }

    _transformToTree() {
        const { parsedJson, tree } = this;

        this._transformToTreeNode(parsedJson, tree);
    }

    _transformToTreeNode(object, parentNode) {
        for (const [key, value] of Object.entries(object)) {
            const jsonNode = new JsonNode(key, value, parentNode);
            parentNode.addChild(jsonNode);

            if (isNonEmptyObjectOrArray(value)) {
                this._transformToTreeNode(value, jsonNode);
                continue;
            }

            this.leaves.push(jsonNode);
        }
    }
}

module.exports = JsonTree;
