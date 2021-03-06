const { isTrivial } = require('./helpers/types-helper');
const JsonTree = require('./helpers/json-tree');
const { accumulateName, buildNamesDelimitator } = require("./helpers/node-handlers");
const { calculateDelimiter } = require("./helpers/delimiter-calculator");
const { wrapArrayChildName } = require('./helpers/node-handlers');

const DEFAULT_RETURN = '';

function jsonUnfold(json) {
    try {
        const parsedJson = JSON.parse(json);
        return handle(parsedJson);
    } catch (error) {
        console.log('Passed JSON is invalid.');
        return DEFAULT_RETURN;
    }
}

function handle(parsedJson) {
    if (isTrivial(parsedJson)) {
        console.log('Passed JSON is trivial.');
        return DEFAULT_RETURN;
    }

    const jsonTree = new JsonTree(parsedJson);

    jsonTree.forEach(wrapArrayChildName);
    const delimiter = calculateDelimiter(
        jsonTree
            .reduceByLeaf(accumulateName, '')
    );

    return jsonTree.reduceByLeaf(buildNamesDelimitator(delimiter), '');
}

module.exports = {
    jsonUnfold
};
