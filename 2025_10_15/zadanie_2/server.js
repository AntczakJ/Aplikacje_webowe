const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.type('text/plain; charset=utf8');
    res.send('Strona główna\n');
});

app.get('/1', (req, res) => {
    const obj = {
        name: "John",
        age: 30,
        city: "New York"
    };
    res.json(obj);
});

app.get('/2', (req, res) => {
    res.type('text/html');
    res.send('<h1 style="color: orangered">Hello world!</h1>');
});

app.get('/3', (req, res) => {
    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.type('text/html');
        res.send(data);
    });
});

app.get('/get_params', (req, res) => {
    const qdata = req.query;

    console.log(qdata.month);
    console.log(qdata.year);

    const timestamp = Date.now();
    const name = `params_${timestamp}.json`;

    fs.writeFile(name, JSON.stringify(qdata), 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            res.status(500).json({ error: 'File write error' });
            return;
        }
        console.log('File written successfully!');
        res.json({ ok: "ok" });
    });
});

app.use((req, res) => {
    res.status(404).send('Not Found!');
});
app.use((req, res) => {
    res.status(404).send('Not Found!');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
