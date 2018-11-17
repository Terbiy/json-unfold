const types = require('./types');

function wrapArrayChildName(named) {
    const { parent } = named;

    if (parent && parent.type === types.ARRAY) {
        named.name = `[${named.name}]`;
    }
}

function buildNamesDelimitator(delimiter) {
    return (accumulatedName, node) => {
        let upgradedName = accumulateName(accumulatedName, node);

        if (isLeaf(node)) {
            upgradedName = `${upgradedName}: ${node.type}`;
        }

        if (hasParentButNotArray(node)) {
            upgradedName = `${delimiter}${upgradedName}`;
        }

        return upgradedName;
    }
}

function isLeaf(node) {
    return node.children.length === 0;
}

function hasParentButNotArray({ parent}) {
    return parent && parent.name && parent.type !== types.ARRAY;
}

function accumulateName(accumulatedName, node) {
    return `${node.name}${accumulatedName}`;
}

module.exports = {
    wrapArrayChildName,
    accumulateName,
    buildNamesDelimitator
};
