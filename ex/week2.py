from Crypto import Random
from Crypto.Cipher import AES
from Crypto.Cipher.AES import block_size


def byte_add(a, b):
    res = a + b
    return [res % 256, res / 256]


def increment_str(string):
    asList = list(string)
    remainder = 1
    for i in reversed(xrange(len(asList))):
        summary = ord(asList[i]) + remainder
        remainder = summary / 256
        asList[i] = chr(summary % 256)
        if remainder == 0:
            break
    return ''.join(asList)


def xor_strings(str1, str2):
    return ''.join(chr(ord(x) ^ ord(y)) for x, y in zip(str1, str2))


def add_pad(text):
    pad_length = (len(text) / block_size + 1) * block_size - len(text)
    return text + chr(pad_length) * pad_length


def remove_pad(text):
    return text[:-ord(text[-1])]


def AES_CBC_encode(key, pt):
    aes = AES.new(key)

    padded = add_pad(pt)

    iv = Random.new().read(block_size)
    previous = iv
    cipher = ''

    for i in xrange(0, len(padded), block_size):
        block = padded[i:i + block_size]
        previous = aes.encrypt(xor_strings(previous, block))
        cipher += previous

    return iv + cipher


def AES_CBC_decode(key, ct):
    aes = AES.new(key)

    iv = ct[:block_size]
    previous = iv
    cipher = ct[block_size:]
    plain = ''

    for i in xrange(0, len(cipher), block_size):
        block = cipher[i:i + block_size]
        plain += xor_strings(previous, aes.decrypt(block))
        previous = block

    return remove_pad(plain)


def AES_CTR_enc_dec(key, text, iv):
    aes = AES.new(key)
    res = ''
    for i in xrange(0, len(text), block_size):
        block = text[i:i + block_size]
        res += xor_strings(block, aes.encrypt(iv))
        iv = increment_str(iv)
    return res


def AES_CTR_encode(key, pt):
    iv = Random.new().read(block_size)
    return iv + AES_CTR_enc_dec(key, pt, iv)


def AES_CTR_decode(key, ct):
    cipher = ct[block_size:]
    iv = ct[:block_size]
    return AES_CTR_enc_dec(key, cipher, iv)

