import { useState } from 'react';
import './App.css';
import { students as initialStudents } from './data/students';
import AddStudentForm from './components/AddStudentForm';
import StudentList from './components/StudentList';

function App() {
    const [students, setStudents] = useState(initialStudents);
    const [onlyAboveThree, setOnlyAboveThree] = useState(false);

    const addStudent = (name, grade) => {
        const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;
        setStudents([...students, { id: newId, name, grade }]);
    };

    return (
        <div className="container app">
            <h1>Lista uczniów:</h1>

            <AddStudentForm onAdd={addStudent} />

            <div className="form-check form-switch">
                <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="filter"
                    checked={onlyAboveThree}
                    onChange={(e) => setOnlyAboveThree(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="filter">
                    Pokaż tylko uczniów z oceną powyżej 3
                </label>
            </div>

            <StudentList students={students} onlyAboveThree={onlyAboveThree} />
        </div>
    );
}

export default App;
