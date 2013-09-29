require('../lib/PrototypeExtensions.js');

var plainText = 'attack at dawn';
var cipherText = '09e1c5f70a65ac519458e7e53f36';
var targetText = 'attack at dusk';

var plainTextArray = plainText.toCharCodes();
var cipherTextArray = cipherText.toCharCodes(true);
var targetTextArray = targetText.toCharCodes();

var cipherKey = plainTextArray.xor(cipherTextArray);

console.log('"%s" => %s', targetText, targetTextArray.xor(cipherKey).toHex());
