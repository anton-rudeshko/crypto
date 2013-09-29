var CU = module.exports = require('./CryptoUtils.js');

/**
 * @returns {String}
 */
Array.prototype.toHex = function() {
    return CU.arrayToHex(this);
};

/**
 * @param {Number[]} array
 * @returns {Number[]}
 */
Array.prototype.xor = function(array) {
    return CU.xorArrays(this, array);
};

/**
 * @returns {String}
 */
String.prototype.toHex = function() {
    return CU.stringToHex(this);
};

/**
 * @param {Boolean} [isHexEncoded]
 * @returns {Number[]}
 */
String.prototype.toCharCodes = function(isHexEncoded) {
    return isHexEncoded ? CU.arrayFromHex(this) : CU.arrayFromString(this);
};
