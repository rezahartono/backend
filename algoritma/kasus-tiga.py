# KASUS 3 : Terdapat dua buah array yaitu array INPUT dan array QUERY, silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT

input = ["xc", "dz", "bbb", "dz"]
query = ["bbb", "ac", "dz"]

frekuensi = {}

for kata in input:
    frekuensi[kata] = frekuensi.get(kata, 0) + 1

result = [frekuensi.get(kata, 0) for kata in query]

print(result)
