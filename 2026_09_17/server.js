const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).end();
            return;
        }
        res.type('text/html').send(data);
    });
});

app.get('/css/style.css', (req, res) => {
    fs.readFile('css/style.css', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).end();
            return;
        }
        res.type('text/css').send(data);
    });
});

app.get('/kontakt', (req, res) => {
    if (Object.keys(req.query).length > 0) {
        const timestamp = Date.now();
        const name = `message_${timestamp}.json`;

        fs.writeFile(name, JSON.stringify(req.query), 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('File written successfully!');
        });
    }

    fs.readFile('contact.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).end();
            return;
        }
        res.type('text/html').send(data);
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
