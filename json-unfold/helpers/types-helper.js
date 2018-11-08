const TYPES = require('./types');

function isTrivial(value) {
    return [
        isBoolean,
        isNumber,
        isString,
        isNull,
        isEmptyArray,
        isEmptyObject
    ].some((check) => check(value));
}

function isEmptyArray(essence) {
    return (
        isArray(essence) &&
        essence.length === 0
    );
}

function isEmptyObject(essence) {
    return Object.keys(essence).length === 0;
}

function getType(essence) {
    if (isBoolean(essence)) {
        return TYPES.BOOLEAN;
    }

    if (isNumber(essence)) {
        return TYPES.NUMBER;
    }

    if (isString(essence)) {
        return TYPES.STRING;
    }

    if (isArray(essence)) {
        return TYPES.ARRAY;
    }

    if (isNull(essence)) {
        return TYPES.NULL;
    }

    if (isObject(essence)) {
        return TYPES.OBJECT;
    }

    return '';
}

function isBoolean(essence) {
    return equalTypes(essence, true);
}

function isNumber(essence) {
    return equalTypes(essence, 42);
}

function isString(essence) {
    return equalTypes(essence, '');
}

function isArray(essence) {
    return Array.isArray(essence);
}

function isObject(essence) {
    return equalTypes(essence, {});
}

function equalTypes(one, another) {
    return typeof one === typeof another;
}

function isNull(essence) {
    return essence === null;
}

// todo: внедрить тесты.
function isNonEmptyObjectOrArray(essence) {
    return !isNull(essence) && isObject(essence) && Object.keys(essence).length;
}

module.exports = {
    isTrivial,
    getType,
    isNonEmptyObjectOrArray
};
