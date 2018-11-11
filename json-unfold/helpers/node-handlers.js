const types = require('./types');

function wrapArrayChildName(named) {
    const { parent } = named;

    if (parent && parent.type === types.ARRAY) {
        named.name = `[${named.name}]`;
    }
}

module.exports = {
    wrapArrayChildName
};
