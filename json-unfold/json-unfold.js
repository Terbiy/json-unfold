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

function isTrivial(parsedJson) {
    return [
        isNumber,
        isBoolean,
        isNull,
        isEmptyArray,
        isEmptyObject
    ].some((check) => check(parsedJson));
}

function isBoolean(essence) {
    return typeof essence === typeof true;
}

function isNumber(essence) {
    return typeof essence === typeof 42;
}

function isNull(essence) {
    return essence === null;
}

function isEmptyArray(essence) {
    return (
        Array.isArray(essence) &&
        essence.length === 0
    );
}

function isEmptyObject(essence) {
    return Object.keys(essence).length === 0;
}

module.exports = jsonUnfold;