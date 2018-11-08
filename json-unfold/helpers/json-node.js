const { getType } = require('./types-helper');

class JsonNode {
    constructor(name, value, parent = null) {
        this.name = name;
        this.type = getType(value);
        this.parent = parent;
        // expect(_transformToTree(...)).toEqual(expected); fails with Maximum call stack error possibly due to
        // unhandled circular link inside Set. Thus I've decided to switch to Array.
        this.children = [];
    }

    addChild(child) {
        this.children.push(child);

        return this;
    }
}

module.exports = JsonNode;
