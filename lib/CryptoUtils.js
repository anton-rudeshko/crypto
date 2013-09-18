var _ = require('./lodash.min.js');

var CryptoUtils = module.exports = {

    /**
     * @param {Number[]} array
     */
    arrayToString: function (array) {
        return array.reduce(function (res, item) {
            return res + String.fromCharCode(item);
        });
    },

    /**
     * @param {Number[]} array
     */
    arrayToHex: function (array) {
        return array.reduce(function (res, item) {
            return res + item.toString(16);
        });
    },

    /**
     * @param {String} input
     * @returns {Number[]}
     */
    arrayFromString: function (input) {
        return input.split('').map(function (oneChar) {
            return oneChar.charCodeAt(0);
        });
    },

    /**
     * @param {String} input
     * @returns {Number[]}
     */
    arrayFromHex: function (input) {
        return input.match(/.{2}/g).map(function (twoChars) {
            return parseInt(twoChars, 16);
        });
    },

    /**
     * @param {String} arr1
     * @param {String} arr2
     * @returns {Number[]}
     */
    xorStrings: function (arr1, arr2) {
        return this.xorArrays(this.arrayFromString(arr1), this.arrayFromString(arr2));
    },

    /**
     * @param {String} arr1
     * @param {String} arr2
     * @returns {Number[]}
     */
    xorHex: function (arr1, arr2) {
        return this.xorArrays(this.arrayFromHex(arr1), this.arrayFromHex(arr2));
    },

    /**
     * @param {Number[]} arr1
     * @param {Number[]} arr2
     * @returns {Number[]}
     */
    xorArrays: function (arr1, arr2) {
        if (arr2.length > arr1.length) return this.xorArrays(arr2, arr1);

        return _(arr1).head(arr2.length).zip(arr2).map(function (item) {
            return item[0] ^ item[1];
        }).value();
    }
};
