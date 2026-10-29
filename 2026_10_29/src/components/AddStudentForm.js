import { useState } from 'react';

function AddStudentForm({ onAdd }) {
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name.trim() === '' || grade.trim() === '') {
            alert('Pola muszą być wypełnione!');
            return;
        }

        const gradeNumber = Number(grade);
        if (!Number.isInteger(gradeNumber) || gradeNumber < 1 || gradeNumber > 6) {
            alert('Ocena musi być z zakresu <1;6>');
            return;
        }

        onAdd(name.trim(), gradeNumber);
        setName('');
        setGrade('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-2">
                <label htmlFor="name" className="form-label">Imię i nazwisko:</label>
                <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-2">
                <label htmlFor="grade" className="form-label">Ocena:</label>
                <select
                    id="grade"
                    className="form-select"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                >
                    <option value=""></option>
                    {[1, 2, 3, 4, 5, 6].map((g) => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Dodaj ucznia</button>
        </form>
    );
}

export default AddStudentForm;
