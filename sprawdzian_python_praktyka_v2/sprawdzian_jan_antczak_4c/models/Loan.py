__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Jan Antczak 4C"

from models.Reader import Reader
from models.Book import Book


class Loan:
    def __init__(self, reader: Reader, book: Book, days: int):
        self.reader: Reader = reader
        self.book: Book = book
        self.days: int = days

    def get_fee(self) -> int:
        if self.days <= 14:
            return 0
        return self.days - 14
