import unittest
from week2 import remove_pad, add_pad, block_size, AES_CBC_decode, AES_CBC_encode, increment_str, AES_CTR_encode, AES_CTR_decode

key = '0123456789abcdef'


class StrIncrementTest(unittest.TestCase):

    def test_one_char_inc(self):
        self.failUnlessEqual(increment_str('1'), '2')

    def test_two_char_inc(self):
        self.failUnlessEqual(increment_str('aa'), 'ab')

    def test_multi_char_inc(self):
        self.failUnlessEqual(increment_str('01ff'.decode('hex')), '0200'.decode('hex'))


class PaddingTest(unittest.TestCase):

    def test_not_modify_short_input(self):
        text = 'qwe'
        self.failUnlessEqual(remove_pad(add_pad(text)), text)

    def test_not_modify_long_input(self):
        text = 'qwe123qwe123qwe123'
        self.failUnlessEqual(remove_pad(add_pad(text)), text)

    def test_pad_till_block_size(self):
        self.failUnlessEqual(len(add_pad('qwe')), block_size)


class EncodingCBCTest(unittest.TestCase):

    def test_not_modify_short_input(self):
        text = 'qwe'
        self.failUnlessEqual(AES_CBC_decode(key, AES_CBC_encode(key, text)), text)

    def test_not_modify_long_input(self):
        text = 'qwe123qwe123qwe123'
        self.failUnlessEqual(AES_CBC_decode(key, AES_CBC_encode(key, text)), text)


class EncodingCTRTest(unittest.TestCase):

    def test_not_modify_short_input(self):
        text = 'qwe'
        self.failUnlessEqual(AES_CTR_decode(key, AES_CTR_encode(key, text)), text)

    def test_not_modify_long_input(self):
        text = 'qwe123qwe123qwe123'
        self.failUnlessEqual(AES_CTR_decode(key, AES_CTR_encode(key, text)), text)


class Week02Assignment(unittest.TestCase):

    def decipher_CBC(self, key, cipher):
        return AES_CBC_decode(key.decode('hex'), cipher.decode('hex'))

    def decipher_CTR(self, key, cipher):
        return AES_CTR_decode(key.decode('hex'), cipher.decode('hex'))

    def test_CBC_Q1(self):
        key = '140b41b22a29beb4061bda66b6747e14'
        cipher = '4ca00ff4c898d61e1edbf1800618fb2828a226d160dad07883d04e008a7897ee' \
                 '2e4b7465d5290d0c0e6c6822236e1daafb94ffe0c5da05d9476be028ad7c1d81'
        plain = 'Basic CBC mode encryption needs padding.'

        self.failUnlessEqual(self.decipher_CBC(key, cipher), plain)

    def test_CBC_Q2(self):
        key = '140b41b22a29beb4061bda66b6747e14'
        cipher = '5b68629feb8606f9a6667670b75b38a5b4832d0f26e1ab7da33249de7d4afc48' \
                 'e713ac646ace36e872ad5fb8a512428a6e21364b0c374df45503473c5242a253'
        plain = 'Our implementation uses rand. IV'

        self.failUnlessEqual(self.decipher_CBC(key, cipher), plain)

    def test_CTR_Q3(self):
        key = '36f18357be4dbd77f050515c73fcf9f2'
        cipher = '69dda8455c7dd4254bf353b773304eec0ec7702330098ce7f7520d1cbbb20fc3' \
                 '88d1b0adb5054dbd7370849dbf0b88d393f252e764f1f5f7ad97ef79d59ce29f5f51eeca32eabedd9afa9329'
        plain = 'CTR mode lets you build a stream cipher from a block cipher.'

        self.failUnlessEqual(self.decipher_CTR(key, cipher), plain)

    def test_CTR_Q4(self):
        key = '36f18357be4dbd77f050515c73fcf9f2'
        cipher = '770b80259ec33beb2561358a9f2dc617e46218c0a53cbeca695ae45faa8952aa' \
                 '0e311bde9d4e01726d3184c34451'
        plain = 'Always avoid the two time pad!'

        self.failUnlessEqual(self.decipher_CTR(key, cipher), plain)


def main():
    unittest.main()

if __name__ == '__main__':
    main()
