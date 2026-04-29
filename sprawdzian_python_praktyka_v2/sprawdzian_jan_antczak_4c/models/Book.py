__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Jan Antczak 4C"

from models.Author import Author


class Book:
    def __init__(self, _id: int, title: str, author: Author, year: int):
        self._id: int = _id
        self.title: str = title
        self.author: Author = author
        self.year: int = year

    def __str__(self) -> str:
        return f"{self.title} ({self.year}) {self.author}"
