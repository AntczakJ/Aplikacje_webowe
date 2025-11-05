const express = require('express')
const fs = require('fs');
const app = express()
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'messages'
})

connection.connect()



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
        const message = req.body.message

        connection.query('INSERT INTO messages (message) VALUES (?)', [message], (err) => {
            if (err) {
                console.error('Database insert error:', err)
                res.status(500).send('Błąd przy dodawaniu wiadomości')
                return
            }
            res.redirect('/');
            console.log(req.body);
        })
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
app.get('/api/contact-messages', (req, res) => {
    connection.query('SELECT * FROM messages', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' })
        res.json(results)
    })
})

app.get('/api/contact-messages/:id', (req, res) => {
    const id = req.params.id
    connection.query('SELECT * FROM messages WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' })
        if (results.length === 0) return res.status(404).json({ error: 'Not Found' })
        res.json(results[0])
    })
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


