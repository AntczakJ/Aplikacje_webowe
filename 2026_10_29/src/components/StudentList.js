function StudentList({ students, onlyAboveThree }) {
    return (
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Imię i nazwisko</th>
                    <th>Ocena</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student) =>
                    (!onlyAboveThree || student.grade > 3) && (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.grade}</td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    );
}

export default StudentList;
