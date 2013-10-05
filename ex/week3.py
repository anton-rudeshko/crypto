from Crypto.Hash import SHA256

block_size = 1024  # bytes
example_file = '../assets/example.mp4'
target_file = '../assets/target.mp4'


def compute_hash(file_name):
    with open(file_name, 'rb') as file_:
        file_contents = file_.read()

        blocks = [file_contents[i:i + block_size] for i in xrange(0, len(file_contents), block_size)]
        result = ''
        for block in reversed(blocks):
            result = SHA256.new(block + result).digest()

        return result.encode('hex')


print compute_hash(example_file)
print compute_hash(target_file)
