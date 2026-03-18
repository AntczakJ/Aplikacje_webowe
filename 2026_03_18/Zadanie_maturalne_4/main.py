import sys

plik = sys.argv[1] if len(sys.argv) > 1 else 'sygnaly.txt'

with open(plik, 'r') as f:
    slowa = [line.strip() for line in f if line.strip()]

wyniki = []

przeslanie = ''
for i in range(39, len(slowa), 40):
    przeslanie += slowa[i][9]

wyniki.append('4.1')
wyniki.append(przeslanie)

max_roznych = 0
najlepsze_slowo = ''
for slowo in slowa:
    roznych = len(set(slowo))
    if roznych > max_roznych:
        max_roznych = roznych
        najlepsze_slowo = slowo

wyniki.append('4.2')
wyniki.append(f'{najlepsze_slowo} {max_roznych}')

wyniki.append('4.3')
for slowo in slowa:
    litery = [ord(c) for c in slowo]
    if max(litery) - min(litery) <= 10:
        wyniki.append(slowo)

with open('wyniki4.txt', 'w') as f:
    f.write('\n'.join(wyniki) + '\n')

print('\n'.join(wyniki))