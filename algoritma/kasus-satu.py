# KASUS 1 : Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"

import re

input = "NEGIE1"
hasil = ""

valid = re.match(r"([A-Za-z]+)(\d+)$", input)

if valid:
    huruf = valid.group(1)
    nomor = valid.group(2)
    hasil = huruf[::-1] + nomor

print(hasil)
