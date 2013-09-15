var CryptoUtils = module.exports = {
    fromHexString: function(input) {
        return input.match(/.{2}/g).map(function(twoChars) { return parseInt(twoChars, 16); });
    }
};
