var _ = require('./lodash.min.js');

module.exports = {

    englishLetters: function() {
        var start = 'a'.charCodeAt(0);
        var startCapital = 'A'.charCodeAt(0);

        var letters = ' .,()"\'-:0123456789'.split('');
        var i;

        for (i = 0; i < 26; ++i) {
            letters.push(String.fromCharCode(start + i));
        }

        for (i = 0; i < 26; ++i) {
            letters.push(String.fromCharCode(startCapital + i));
        }

        return letters;
    },

    xorAlphabet: function() {
        return this._alphabetCache || (this._alphabetCache = this.cartesianProduct(this.englishLetters()).reduce(function(result, item) {
            var xor = item[0].charCodeAt(0) ^ item[1].charCodeAt(0);
            result[xor] || (result[xor] = []);
            result[xor].push(item);
            return result;
        }, { '0': ['same'] }));
    },

    printXorAlphabet: function() {
        _.each(this.xorAlphabet(), function(val, letter) {
            console.log('## %s', letter);
            val.forEach(function(v) {
                console.log('  * %s', v);
            });
            console.log();
        });
    },

    /**
     * @param {Number[]} array
     * @returns {Number[]}
     */
    decipherArray: function(array) {
        return array.map(this.decipherNum, this);
    },

    /**
     * @param {Number} num
     * @returns {Number[]}
     */
    decipherNum: function(num) {
        return this.xorAlphabet()[num] || ['unknown'];
    },

    /**
     * @param {Array} arr1
     * @param {Array} [arr2]
     */
    cartesianProduct: function(arr1, arr2) {
        arr2 || (arr2 = arr1);
        if (arr1.length !== arr2.length) throw 'Arrays length not equal';

        var len = arr1.length;

        return arr1.reduce(function(result, item, index) {
            for (var i = index + 1; i < len; ++i) {
                result.push([item, arr2[i]])
            }
            return result;
        }, []);
    },

    /**
     * @param {Number[]} array
     */
    arrayToString: function(array) {
        return array.reduce(function(res, item) {
            return res + String.fromCharCode(item);
        });
    },

    /**
     * @param {Number[]} array
     */
    arrayToHex: function(array) {
        return array.reduce(function(res, item) {
            return res + item.toString(16);
        });
    },

    /**
     * @param {String} input
     * @returns {Number[]}
     */
    arrayFromString: function(input) {
        return input.split('').map(function(oneChar) {
            return oneChar.charCodeAt(0);
        });
    },

    /**
     * @param {String} input
     * @returns {Number[]}
     */
    arrayFromHex: function(input) {
        return input.match(/.{2}/g).map(function(twoChars) {
            return parseInt(twoChars, 16);
        });
    },

    /**
     * @param {String} arr1
     * @param {String} arr2
     * @returns {Number[]}
     */
    xorStrings: function(arr1, arr2) {
        return this.xorArrays(this.arrayFromString(arr1), this.arrayFromString(arr2));
    },

    /**
     * @param {String} char1
     * @param {String} char2
     * @returns {Number}
     */
    xorChar: function(char1, char2) {
        return char1.charCodeAt(0) ^ char2.charCodeAt(0)
    },

    /**
     * @param {String} arr1
     * @param {String} arr2
     * @returns {Number[]}
     */
    xorHex: function(arr1, arr2) {
        return this.xorArrays(this.arrayFromHex(arr1), this.arrayFromHex(arr2));
    },

    /**
     * @param {Number[]} arr1
     * @param {Number[]} arr2
     * @returns {Number[]}
     */
    xorArrays: function(arr1, arr2) {
        if (arr2.length > arr1.length) return this.xorArrays(arr2, arr1);

        return _(arr1).head(arr2.length).zip(arr2).map(function(item) {
            return item[0] ^ item[1];
        }).value();
    },

    /**
     * @param {Number[]} array
     * @returns {Number[]}
     */
    arrayStats: function(array) {
        var stats = _.countBy(array);
        return _.groupBy(_.keys(stats), function(val) {
            return stats[val];
        });
    }
};
