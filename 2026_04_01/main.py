class Student:
    def __init__(self, id_studenta: int, imie: str, nazwisko: str, wiek: int):
        self.id = id_studenta
        self.imie = imie
        self.nazwisko = nazwisko
        self.wiek = wiek
        self.kursy = []

class Course:
    def __init__(self, nazwa: str):
        self.nazwa = nazwa

studenci = {}
with open("students.txt", "r", encoding="utf-8") as plik:
    for linia in plik:
        czesci = linia.strip().split(",")
        if len(czesci) == 4:
            s_id = int(czesci[0])
            im = czesci[1].strip()
            nz = czesci[2].strip()
            wk = int(czesci[3])
            studenci[s_id] = Student(s_id, im, nz, wk)

with open("courses.txt", "r", encoding="utf-8") as plik:
    for linia in plik:
        czesci = linia.strip().split(",")
        if len(czesci) == 2:
            s_id = int(czesci[0])
            nazwa_kursu = czesci[1].strip()
            if s_id in studenci:
                studenci[s_id].kursy.append(Course(nazwa_kursu))

for osoba in studenci.values():
    nazwy_kursow = [k.nazwa for k in osoba.kursy]
    print(f"{osoba.imie} {osoba.nazwisko} ({osoba.wiek} lat): {', '.join(nazwy_kursow)}")
    nazwa_pliku = f"{osoba.imie.lower()}_{osoba.nazwisko.lower()}.txt"
    with open(nazwa_pliku, "w", encoding="utf-8") as plik_wy:
        plik_wy.write("Kursy:\n")
        for i, kurs in enumerate(nazwy_kursow):
            if i == len(nazwy_kursow) - 1:
                plik_wy.write(f"- {kurs}\n")
            else:
                plik_wy.write(f"- {kurs},\n")