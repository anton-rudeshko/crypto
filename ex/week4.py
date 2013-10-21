import urllib2

TARGET = 'http://crypto-class.appspot.com/po?er='

hex_char_size = 2
aes_block_size = 16
aes_hex_block_size = aes_block_size * hex_char_size


def query(q):
    path = TARGET + urllib2.quote(q)

    request = urllib2.Request(path)
    try:
        urllib2.urlopen(request)
        print '===========> OK!'
        return True
    except urllib2.HTTPError, e:
        if e.code == 404:
            return True
        return False


def split_blocks(text, block_size):
    return [text[i:i + block_size] for i in xrange(0, len(text), block_size)]


def split_hex(hex_text):
    return [hex_text[i:i + 2] for i in reversed(xrange(0, len(hex_text), 2))]


def to_hex(n):
    return '%.2x' % n


class PaddingOracle:
    def __init__(self, prev, target):
        self.decoded = []
        self.prev = prev
        self.target = target
        self.prev_hex = split_hex(prev)

    def decoded_with_padding(self, padding):
        return [to_hex(int(self.prev_hex[i], 16) ^ self.decoded[i] ^ padding) for i in xrange(0, len(self.decoded))]

    def decoded_part(self, padding):
        return ''.join(reversed(self.decoded_with_padding(padding)))

    def guess_char(self, char_num, current_char_num, padding):
        guess_char_hex = to_hex(current_char_num ^ char_num ^ padding)

        guess = self.prev[:-(hex_char_size * padding)] + guess_char_hex + self.decoded_part(padding)

        print '   %d:\t%s %s' % (char_num, guess, self.target)
        if guess == self.prev and padding == 1:
            print 'Self padded'
            return False
        return query(guess + self.target)

    def decipher_char(self, char_index):
        current_char_hex = self.prev_hex[char_index]
        current_char_num = int(current_char_hex, 16)

        padding = char_index + 1

        print 'Decoding "%s" at index %s' % (current_char_hex, char_index)
        print 'Decoded so far:', self.decoded, 'Padding: %s' % padding

        for guess_char_num in [32, 0, 1, 2, 9]:
            if self.guess_char(guess_char_num, current_char_num, padding):
                return guess_char_num

        for guess_char_num in xrange(97, 123):
            if self.guess_char(guess_char_num, current_char_num, padding):
                return guess_char_num

        for guess_char_num in xrange(65, 97):
            if self.guess_char(guess_char_num, current_char_num, padding):
                return guess_char_num

        for guess_char_num in xrange(3, 65):
            if self.guess_char(guess_char_num, current_char_num, padding):
                return guess_char_num

        for guess_char_num in xrange(123, 256):
            if self.guess_char(guess_char_num, current_char_num, padding):
                return guess_char_num

    def decipher_block(self):
        for char_index in xrange(0, 16):
            deciphered_char = self.decipher_char(char_index)
            print '  ===> Decoded "%s" (%d)' % (chr(deciphered_char), deciphered_char)
            self.decoded.append(deciphered_char)

        rev = reversed(self.decoded)
        print 'Deciphered "%s"' % ''.join([chr(c) for c in rev])
        print 'reversed:', rev


def decipher():
    cipher = 'f20bdba6ff29eed7b046d1df9fb70000' \
             '58b1ffb4210a580f748b4ac714c001bd' \
             '4a61044426fb515dad3f21f18aa577c0' \
             'bdf302936266926ff37dbf7035d5eeb4'

    # 'The Magic Words '
    # 'are Squeamish Os'
    # 'sifrage' + 9 bytes padding

    cipher_blocks = split_blocks(cipher, aes_hex_block_size)

    po = PaddingOracle(cipher_blocks[2], cipher_blocks[3])
    po.decipher_block()

decipher()
