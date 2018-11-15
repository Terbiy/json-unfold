const DELIMITERS = [
    '.',
    '\\'
];

function calculateDelimiter(strings) {
    if (stringsContainDelimiter(strings, DELIMITERS[0])) {
        return DELIMITERS[1];
    }

    return DELIMITERS[0];
}

function stringsContainDelimiter(strings, delimiter) {
    return strings.some((string) => string.includes(delimiter));
}

module.exports = {
    calculateDelimiter
};
