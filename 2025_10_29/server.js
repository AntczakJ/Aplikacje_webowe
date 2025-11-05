const express = require('express')
const fs = require('fs');
const app = express()
app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }));


const port = 3000


app.get('/', (req, res) => {
    fs.readFile('Strona_glowna.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).end();
            return;
        }
        res.type('text/html').send(data);
    });
});
app.get('/o-nas', (req, res) => {
    fs.readFile('o-nas.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).end();
            return;
        }
        res.type('text/html').send(data);
    });
});
app.all('/kontakt', (req, res) => {
    if (req.method === 'POST') {
        console.log(req.body);
        res.redirect('/');
    } else {
        fs.readFile('Kontakt.html', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                res.status(500).end();
                return;
            }
            res.type('text/html').send(data);
        });
    }
});

app.get('/oferta', (req, res) => {
    fs.readFile('oferta.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).end();
            return;
        }
        res.type('text/html').send(data);
    });
});




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
