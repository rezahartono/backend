# KASUS 4 : Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN


input = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]


def selisih_diagonal(matriks):
    n = len(matriks)

    jumlah_diagonal_utama = 0
    jumlah_diagonal_kedua = 0

    for i in range(n):
        jumlah_diagonal_utama += matriks[i][i]
        jumlah_diagonal_kedua += matriks[i][n - 1 - i]

    return jumlah_diagonal_utama - jumlah_diagonal_kedua


print(selisih_diagonal(input))
