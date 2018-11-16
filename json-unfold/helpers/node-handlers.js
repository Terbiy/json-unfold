const types = require('./types');

function wrapArrayChildName(named) {
    const { parent } = named;

    if (parent && parent.type === types.ARRAY) {
        named.name = `[${named.name}]`;
    }
}

function accumulateName(accumulatedName, node) {
    return `${node.name}${accumulatedName}`;
}

function buildNamesDelimitator(delimiter) {
    return (accumulatedName, node) => {
        const { parent } = node;

        if (parent && parent.name && parent.type !== types.ARRAY) {
            return `${delimiter}${accumulateName(accumulatedName, node)}`;
        }

        return accumulateName(accumulatedName, node);
    }
}

module.exports = {
    wrapArrayChildName,
    accumulateName,
    buildNamesDelimitator
};
