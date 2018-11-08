const { isTrivial } = require('./helpers/types-helper');

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

    return parsedJson;
}

module.exports = {
    jsonUnfold,
};
