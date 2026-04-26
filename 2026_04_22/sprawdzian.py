__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Jan Antczak 4C"

import datetime
import json

from models.Student import Student
from models.Teacher import Teacher
from models.Subject import Subject
from models.Grades import Grades
from year_grade import year_grade


teachers: list[Teacher] = []
subjects: list[Subject] = []
students: list[Student] = []
grades: list[Grades] = []


with open("teachers.txt", "r", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        parts = line.split()
        t_id: int = int(parts[0])
        t_name: str = parts[1]
        t_surname: str = parts[2]
        teachers.append(Teacher(t_id, t_name, t_surname))

with open("subjects.txt", "r", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        parts = line.split()
        s_id: int = int(parts[0])
        s_name: str = parts[1]
        teacher_id: int = int(parts[2])
        teacher_obj: Teacher | None = next((t for t in teachers if t._id == teacher_id), None)
        if teacher_obj is None:
            continue
        subjects.append(Subject(s_id, s_name, teacher_obj))

with open("students.txt", "r", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        parts = line.split()
        st_id: int = int(parts[0])
        first_name: str = parts[1]
        last_name: str = parts[2]
        birthdate_from_file: str = parts[3]
        birthdate: datetime.date = datetime.datetime.strptime(birthdate_from_file, '%Y-%m-%d').date()
        students.append(Student(st_id, first_name, last_name, birthdate))

with open("grades.txt", "r", encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        parts = line.split()
        student_id: int = int(parts[0])
        subject_id: int = int(parts[1])
        grades_str: str = parts[2]
        student_obj: Student | None = next((s for s in students if s._id == student_id), None)
        subject_obj: Subject | None = next((s for s in subjects if s._id == subject_id), None)
        if student_obj is None or subject_obj is None:
            continue
        grade_obj: Grades = Grades(student_obj, subject_obj)
        for g in grades_str.split(","):
            grade_obj.add_grade(int(g))
        grades.append(grade_obj)

print("Oceny i średnie poszczególnych uczniów")
students_export: list = []
for student in students:
    print(f"{student}:")
    student_data: dict = {str(student): {}}
    for subject in subjects:
        grade_obj = next(
            (g for g in grades if g.student._id == student._id and g.subject._id == subject._id),
            None
        )
        if grade_obj is None:
            continue
        grades_list: list[int] = grade_obj.get_grades()
        avg: float = round(grade_obj.get_average(), 2)
        yg: int = year_grade(avg)
        oceny_str: str = ", ".join(str(x) for x in grades_list)
        print(f"\t{subject.name}:")
        print(f"\t\tOceny: {oceny_str}")
        print(f"\t\tŚrednia: {avg}")
        print(f"\t\tOcena końcowa: {yg}")
        student_data[str(student)][subject.name] = {
            "Oceny": oceny_str,
            "Srednia": avg,
            "Ocena roczna": yg
        }
    print()
    students_export.append(student_data)

with open("students.json", "w", encoding="utf-8") as f:
    json.dump(students_export, f, indent=4, ensure_ascii=False)


subjects_export: list = []
for subject in subjects:
    all_grades: list[int] = []
    for g in grades:
        if g.subject._id == subject._id:
            all_grades.extend(g.get_grades())
    if not all_grades:
        continue
    avg = round(sum(all_grades) / len(all_grades), 2)
    oceny_str = ", ".join(str(x) for x in all_grades)
    print(f"{subject.name}:")
    print(f"\tNauczyciel: {subject.teacher}")
    print(f"\tOceny: {oceny_str}")
    print(f"\tŚrednia: {avg}")
    print()
    subjects_export.append({
        subject.name: {
            "Nauczyciel": str(subject.teacher),
            "Oceny": all_grades,
            "Srednia": avg
        }
    })

with open("subjects.json", "w", encoding="utf-8") as f:
    json.dump(subjects_export, f, indent=4, ensure_ascii=False)