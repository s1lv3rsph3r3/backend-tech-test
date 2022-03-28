/**
 * Utility function designed to remove
 * "bound" from the beginning of bound functions.
 * Makes for cleaner and easier logging.
 * @param functionName
 * @returns {T[]}
 */
const formatFunctionName = (functionName) =>
    functionName.split(' ').filter((value) => value !== 'bound')[0];

module.exports = {
    formatFunctionName,
};
