import gmpy2
from gmpy2 import mpz

p = '1340780792994259709957402499820584612747936582059239' \
    '3377723561443721764030073546976801874298166903427690' \
    '031858186486050853753882811946569946433649006084171'

g = '1171782988036620700951611759633536708855808499999895' \
    '2205599979459063929499736583746670572176471460312928' \
    '594829675428279466566527115212748467589894601965568'

h = '3239475104050450443565264378728065788649097520952449' \
    '5278347924529719819761432925580738569379585531805328' \
    '78928001494706097394108577585732452307673444020333'

p = mpz(p)
g = mpz(g)
h = mpz(h)

B = gmpy2.powmod(mpz('2'), mpz('20'), p)
step = B / 100
i = 0

gB = gmpy2.powmod(g, B, p)

left_side = {}

print 'Building hash table...'
for x1 in xrange(0, B):
    if x1 > step * i:
        print '%s%%' % i
        i += 1

    gx1 = gmpy2.powmod(g, x1, p)
    val = gmpy2.t_mod(gmpy2.mul(h, gmpy2.invert(gx1, p)), p)
    left_side[val] = x1

print 'Performing lookup...'
for x0 in xrange(0, B):
    gBx0 = gmpy2.powmod(gB, x0, p)
    if gBx0 in left_side:
        x1 = left_side[gBx0]
        x = x0 * B + x1
        h_guess = gmpy2.powmod(g, x, p)

        print 'x0 = %s, x1 = %s\nx = %s' % (x0, x1, x)
        print 'Guess is', h_guess == h
        break
