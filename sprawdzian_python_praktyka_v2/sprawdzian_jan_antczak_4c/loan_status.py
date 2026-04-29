__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Jan Antczak 4C"


def loan_status(days: int) -> str:
    if days <= 14:
        return "OK"
    if days <= 30:
        return "WARNING"
    return "OVERDUE"
