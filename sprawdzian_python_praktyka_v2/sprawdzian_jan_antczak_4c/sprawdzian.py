__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Jan Antczak 4C"

import datetime
import json
import os
import sys

sys.stdout.reconfigure(encoding="utf-8")

from models.Author import Author
from models.Book import Book
from models.Reader import Reader
from models.Loan import Loan
from loan_status import loan_status


authors: list[Author] = []
books: list[Book] = []
readers: list[Reader] = []
loans: list[Loan] = []

folder: str = os.path.dirname(__file__)

with open(os.path.join(folder, "authors.txt"), "r", encoding="utf-8") as f:
    for line in f:
        dane = line.strip().split()
        if len(dane) < 3:
            continue
        a_id = int(dane[0])
        first_name = dane[1]
        last_name = dane[2]
        authors.append(Author(a_id, first_name, last_name))

with open(os.path.join(folder, "books.txt"), "r", encoding="utf-8") as f:
    for line in f:
        dane = line.strip().split()
        if len(dane) < 4:
            continue
        b_id = int(dane[0])
        title = dane[1].replace("_", " ")
        author_id = int(dane[2])
        year = int(dane[3])

        autor = None
        for a in authors:
            if a._id == author_id:
                autor = a
                break
        if autor is None:
            continue
        books.append(Book(b_id, title, autor, year))

with open(os.path.join(folder, "readers.txt"), "r", encoding="utf-8") as f:
    for line in f:
        dane = line.strip().split()
        if len(dane) < 4:
            continue
        r_id = int(dane[0])
        first_name = dane[1]
        last_name = dane[2]
        birth_date = datetime.datetime.strptime(dane[3], "%Y-%m-%d").date()
        readers.append(Reader(r_id, first_name, last_name, birth_date))

with open(os.path.join(folder, "loans.txt"), "r", encoding="utf-8") as f:
    for line in f:
        dane = line.strip().split()
        if len(dane) < 3:
            continue
        reader_id = int(dane[0])
        book_id = int(dane[1])
        days = int(dane[2])

        czytelnik = None
        for r in readers:
            if r._id == reader_id:
                czytelnik = r
                break

        ksiazka = None
        for b in books:
            if b._id == book_id:
                ksiazka = b
                break

        if czytelnik is None or ksiazka is None:
            continue
        loans.append(Loan(czytelnik, ksiazka, days))


print("Historia wypożyczeń")
print()

readers_json: list = []

for r in readers:
    print(f"{r}:")
    wypozyczenia_json: list = []
    for l in loans:
        if l.reader._id == r._id:
            print(f"Książka: {l.book.title}")
            print(f"Dni: {l.days}")
            print(f"Status: {loan_status(l.days)}")
            print(f"Opłata: {l.get_fee()} zł")
            wypozyczenia_json.append({
                "Tytuł": l.book.title,
                "Dni": l.days,
                "Status": loan_status(l.days),
                "Opłata": l.get_fee()
            })
    print()
    readers_json.append({str(r): wypozyczenia_json})

with open(os.path.join(folder, "readers.json"), "w", encoding="utf-8") as f:
    json.dump(readers_json, f, indent=4, ensure_ascii=False)

print("=" * 30)
print()

books_json: list = []

for b in books:
    wypozyczenia_ksiazki: list[Loan] = []
    for l in loans:
        if l.book._id == b._id:
            wypozyczenia_ksiazki.append(l)

    liczba: int = len(wypozyczenia_ksiazki)
    if liczba > 0:
        suma: int = 0
        for l in wypozyczenia_ksiazki:
            suma += l.days
        srednia: float = round(suma / liczba, 2)
    else:
        srednia = 0.0

    print(f"{b.title}:")
    print(f"Autor: {b.author}")
    print(f"Liczba wypożyczeń: {liczba}")
    print(f"Średni czas: {srednia} dni")
    print()

    dni_lista: list[int] = []
    for l in wypozyczenia_ksiazki:
        dni_lista.append(l.days)

    books_json.append({
        b.title: {
            "Autor": str(b.author),
            "Wypożyczenia": dni_lista,
            "Średnia": srednia
        }
    })

with open(os.path.join(folder, "books.json"), "w", encoding="utf-8") as f:
    json.dump(books_json, f, indent=4, ensure_ascii=False)
