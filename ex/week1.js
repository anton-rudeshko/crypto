var CU = require('../lib/CryptoUtils');
var _ = require('../lib/lodash.min.js');

var charPos = 83;
var selectedCol = 0;

var xor = CU.xorHex('f5', '1d');
var gl = 'i';

console.log('xor: ' + xor);

console.log('Pair ["%s", "%s"]', gl, String.fromCharCode(gl.charCodeAt(0) ^ xor));

console.log(CU.decipherArray(xor));
console.log();

var ciphers = [
//   0 1       5         10        15        20        25        30        35        40        45        50        55        60        65        70        75        80
    '315c4eeaa8b5f8aaf9174145bf43e1784b8fa00dc71d885a804e5ee9fa40b16349c146fb778cdf2d3aff021dfff5b403b510d0d0455468aeb98622b137dae857553ccd8883a7bc37520e06e515d22c954eba5025b8cc57ee59418ce7dc6bc41556bdb36bbca3e8774301fbcaa3b83b220809560987815f65286764703de0f3d524400a19b159610b11ef3e',
//   W e   c a n   f a c t o r   t h e   n u m b e r   1 5   w i t h _ q u a n t u m _ c o m p u t e r s . _ W e _ c a n _ a l s o _ f a c t o r _ t h e _ n u m b e r _ 1

    '234c02ecbbfbafa3ed18510abd11fa724fcda2018a1a8342cf064bbde548b12b07df44ba7191d9606ef4081ffde5ad46a5069d9f7f543bedb9c861bf29c7e205132eda9382b0bc2c5c4b45f919cf3a9f1cb74151f6d551f4480c82b2cb24cc5b028aa76eb7b4ab24171ab3cdadb8356f',
//   E u l e r   w o u l d   p r o b a b l y   e n j o y   t h a t _ n o w _ h i s _ t h e o r e m _ b e c o m e s _ a _ c o r n e r _ s t o n e _ o f _ c r y p t o _ - _

    '32510ba9a7b2bba9b8005d43a304b5714cc0bb0c8a34884dd91304b8ad40b62b07df44ba6e9d8a2368e51d04e0e7b207b70b9b8261112bacb6c866a232dfe257527dc29398f5f3251a0d47e503c66e935de81230b59b7afb5f41afa8d661cb',
//   T h e   n i c e   t h i n g   a b o u t   K e e y l o q   i s _ n o w _ w e _ c r y p t o g r a p h e r s _ c a n _ d r i v e _ a _ l o t _ o f _ f a n c y _ c a r s

    '32510ba9aab2a8a4fd06414fb517b5605cc0aa0dc91a8908c2064ba8ad5ea06a029056f47a8ad3306ef5021eafe1ac01a81197847a5c68a1b78769a37bc8f4575432c198ccb4ef63590256e305cd3a9544ee4160ead45aef520489e7da7d835402bca670bda8eb775200b8dabbba246b130f040d8ec6447e2c767f3d30ed81ea2e4c1404e1315a1010e7229be6636aaa',
//   T h e   c i p h e r t e x t   p r o d u c e d   b y   a   w e a k _ e n c r y p t i o n _ a l g o r i t h m _ l o o k s _ a s _ g o o d _ a s _ c i p h e r t e x t _

    '3f561ba9adb4b6ebec54424ba317b564418fac0dd35f8c08d31a1fe9e24fe56808c213f17c81d9607cee021dafe1e001b21ade877a5e68bea88d61b93ac5ee0d562e8e9582f5ef375f0a4ae20ed86e935de81230b59b73fb4302cd95d770c65b40aaa065f2a5e33a5a0bb5dcaba43722130f042f8ec85b7c2070',
//   Y o u   d o n ' t   w a n t   t o   b u y   a   s e t   o f _ c a r _ k e y s _ f r o m _ a _ g u y _ w h o _ s p e c i a l i z e s _ i n _ s t e a l i n g _ c a r s

    '32510bfbacfbb9befd54415da243e1695ecabd58c519cd4bd2061bbde24eb76a19d84aba34d8de287be84d07e7e9a30ee714979c7e1123a8bd9822a33ecaf512472e8e8f8db3f9635c1949e640c621854eba0d79eccf52ff111284b4cc61d11902aebc66f2b2e436434eacc0aba938220b084800c2ca4e693522643573b2c4ce35050b0cf774201f0fe52ac9f26d71b6cf61a711cc229f77ace7aa88a2f19983122b11be87a59c355d25f8e4',
//   T h e r e   a r e   t w o   t y p e s   o f   c r y p t o g r a p h y _ - _ t h a t _ w h i c h _ w i l l _ k e e p _ s e c r e t s _ s a f e _ f r o m _ y o u r _ l

    '32510bfbacfbb9befd54415da243e1695ecabd58c519cd4bd90f1fa6ea5ba47b01c909ba7696cf606ef40c04afe1ac0aa8148dd066592ded9f8774b529c7ea125d298e8883f5e9305f4b44f915cb2bd05af51373fd9b4af511039fa2d96f83414aaaf261bda2e97b170fb5cce2a53e675c154c0d9681596934777e2275b381ce2e40582afe67650b13e72287ff2270abcf73bb028932836fbdecfecee0a3b894473c1bbeb6b4913a536ce4f9b13f1efff71ea313c8661dd9a4ce',
//   T h e r e   a r e   t w o   t y p e s   o f   c y p t o g r a p h y : _ o n e _ t h a t _ a l l o w s _ t h e _ G o v e r n m e n t _ t o _ u s e _ b r u t e _ f o r

    '315c4eeaa8b5f8bffd11155ea506b56041c6a00c8a08854dd21a4bbde54ce56801d943ba708b8a3574f40c00fff9e00fa1439fd0654327a3bfc860b92f89ee04132ecb9298f5fd2d5e4b45e40ecc3b9d59e9417df7c95bba410e9aa2ca24c5474da2f276baa3ac325918b2daada43d6712150441c2e04f6565517f317da9d3',
//   W e   c a n   s e e   t h e   p o i n t   w h e r e   t h e _ c h i p _ i s _ u n h a p p y _ i f _ a _ w r o n g _ b i t _ i s _ s e n t _ a n d _ c o n s u m e s _

    '271946f9bbb2aeadec111841a81abc300ecaa01bd8069d5cc91005e9fe4aad6e04d513e96d99de2569bc5e50eeeca709b50a8a987f4264edb6896fb537d0a716132ddc938fb0f836480e06ed0fcd6e9759f40462f9cf57f4564186a2c1778f1543efa270bda5e933421cbe88a4a52222190f471e9bd15f652b653b7071aec59a2705081ffe72651d08f822c9ed6d76e48b63ab15d0208573a7eef027',
//   A   ( p r i v a t e - k e y )     e n c r y p t i o n   s c h e m e _ s t a t e s _ 3 _ a l g o r i t h m s , _ n a m e l y _ a _ p r o c e d u r e _ f o r _ g e n e

    '466d06ece998b7a2fb1d464fed2ced7641ddaa3cc31c9941cf110abbf409ed39598005b3399ccfafb61d0315fca0a314be138a9f32503bedac8067f03adbf3575c3b8edc9ba7f537530541ab0f9f3cd04ff50d66f1d559ba520e89a2cb2a83',
//     T h e   C o n c i s e   O x f o r d D i c t i o n a r y _ ( 2 0 0 6 ) _ d e ï ¬ ? n e s _ c r y p t o _ a s _ r h e _ a r t _ o f _ _ w r i t i n g _ o _ r _ s o l

    '32510ba9babebbbefd001547a810e67149caee11d945cd7fc81a05e9f85aac650e9052ba6a8cd8257bf14d13e6f0a803b54fde9e77472dbff89d71b57bddef121336cb85ccb8f3315f4b52e301d16e9f52f904'
//      =)
];

var cipherArrays = ciphers.map(CU.arrayFromHex);

function uniqueCharCodes(charPos) {
    return _(cipherArrays).pluck(charPos).unique().value();
}

function decipherSymbol(charPos) {
    var charCodes = uniqueCharCodes(charPos);

    var guesses = charCodes.map(function(code1) {
        var guess = charCodes.reduce(function(result, code2) {
            if (code2 !== code1) {
                result.push(_.flatten(CU.decipherNum(code1 ^ code2)));
            }
            return result;
        }, []);

        return { code: code1, values: _.intersection.apply(_, guess) };
    });

    var guess0 = guesses[0];
    for (var i = 1; i < guesses.length; i++) {
        var guess1 = guesses[i],
            xor = guess0.code ^ guess1.code;

        guess1.values = guess0.values.map(function(val0) {
            return guess1.values.filter(function(val1) {
                return CU.xorChar(val0, val1) === xor;
            })
        });
    }

    console.log('Char at ' + charPos);
    guesses.forEach(function(guess) {
        var str = guess.code.toString(16);
        console.log('%s = %s', str.length === 1 ? '0' + str : str, guess.values.join(' | '));
    });
    console.log();

    return guesses;
}

var guesses = decipherSymbol(charPos);
cipherArrays.forEach(function(cipher) {
    var filter = guesses.filter(function(guess) {
        return guess.code === cipher[charPos];
    });

    console.log(filter[0].values[selectedCol] + '');
});
