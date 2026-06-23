# KASUS 2 : Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut, jika ada kata dengan panjang yang sama silahkan ambil salah satu

kalimat = input("Silahkan Masukan Kalimat :")


def longest(data: str):
    hasil = ""
    for kata in data.split():
        if len(kata) > len(hasil):
            hasil = kata

    print(f"\nKata Terpanjang Dari Input : {data}")
    print(f"{hasil} : {len(hasil)} character")


longest(kalimat)
