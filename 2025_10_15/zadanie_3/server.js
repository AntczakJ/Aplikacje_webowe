const express = require('express');
const fs = require('fs');
const mime = require('mime-types');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.type('text/plain; charset=utf8').send('Strona główna\n');
});

app.get('/1', (req, res) => {
    const obj = { name: "John", age: 30, city: "New York" };
    res.json(obj);
});

app.get('/2', (req, res) => {
    res.type('text/html').send('<h1 style="color: orangered">Hello world!</h1>');
});

app.get('/3', (req, res) => {
    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).end();
            return;
        }
        res.type('text/html').send(data);
    });
});

app.get('/get_params', (req, res) => {
    const adr = 'http://localhost:8080/default.htm?year=2017&month=february';
    const urlObj = new URL(adr);
    const qdata = Object.fromEntries(urlObj.searchParams.entries());
    const timestamp = Date.now();
    const name = `params_${timestamp}.json`;

    fs.writeFile(name, JSON.stringify(qdata), 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            res.status(500).json({ error: 'File write error' });
            return;
        }
        console.log('File written successfully!');
        res.json({ ok: 'ok' });
    });
});

app.get('*', (req, res) => {
    const filePath = `assets${req.path}`;
    const mimeType = mime.lookup(filePath);

    if (!mimeType) {
        res.status(404).json({ error: `Pathname ${req.path} not found!` });
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.status(404).json({ error: `Pathname 'assets${req.path}' not found!` });
            return;
        }
        res.type(mimeType).send(data);
    });
});

app.listen(port, () => {
    console.log('Server started on port 3000');
});
