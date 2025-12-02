require('dotenv').config({ path: './.env' });
const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://user:haslo@cluster0.hl5ksig.mongodb.net/ExampleDB?appName=Cluster0';
const client = new MongoClient(url);
let db;

console.log('DATABASE_URL=', process.env.DATABASE_URL);
const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const port = 3000;

app.use(express.json());

async function connectDB() {
    try {
        await client.connect();
        console.log('Połączono z MongoDB Atlas - ExampleDB');
        db = client.db('ExampleDB');
    } catch (err) {
        console.error('Błąd MongoDB:', err);
    }
}

connectDB();

app.use(async (req, res, next) => {
    const startTime = Date.now();

    res.on('finish', async () => {
        if (!db) return;

        try {
            const collection = db.collection('accessLogs');

            const logEntry = {
                method: req.method,
                url: req.originalUrl,
                status: res.statusCode,
                ip: req.ip || req.connection.remoteAddress,
                userAgent: req.get('User-Agent') || 'unknown',
                responseTime: Date.now() - startTime,
                timestamp: new Date()
            };

            await collection.insertOne(logEntry);

        } catch (err) {
            console.error('Błąd logowania:', err);
        }
    });

    next();
});


app.get('/', (req, res) => {
    res.type('text/plain; charset=utf8');
    res.send('Strona główna\n');
});

// Kategorie CRUD
app.get('/kategorie', async (req, res) => {
    const kategorie = await prisma.kategoria.findMany();
    res.json(kategorie);
});

app.get('/kategorie/:id', async (req, res) => {
    const id = Number(req.params.id);
    const kategoria = await prisma.kategoria.findUnique({ where: { id } });
    res.json(kategoria);
});

app.post('/kategorie', async (req, res) => {
    const { kategoria } = req.body;
    const newKategoria = await prisma.kategoria.create({ data: { kategoria } });
    res.json(newKategoria);
});

app.put('/kategorie/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { kategoria } = req.body;
    const updated = await prisma.kategoria.update({
        where: { id },
        data: { kategoria },
    });
    res.json(updated);
});

app.delete('/kategorie/:id', async (req, res) => {
    const id = Number(req.params.id);
    await prisma.kategoria.delete({ where: { id } });
    res.json({ message: 'Deleted' });
});

// Komentarze CRUD
app.get('/komentarze', async (req, res) => {
    const komentarze = await prisma.komentarze.findMany();
    res.json(komentarze);
});

app.get('/komentarze/:id', async (req, res) => {
    const id = Number(req.params.id);
    const komentarz = await prisma.komentarze.findUnique({ where: { id } });
    res.json(komentarz);
});

app.post('/komentarze', async (req, res) => {
    const { komentarz, wpisId } = req.body;
    const newKomentarz = await prisma.komentarze.create({
        data: { komentarz, wpisId },
    });
    res.json(newKomentarz);
});

app.put('/komentarze/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { komentarz, wpisId } = req.body;
    const updated = await prisma.komentarze.update({
        where: { id },
        data: { komentarz, wpisId },
    });
    res.json(updated);
});

app.delete('/komentarze/:id', async (req, res) => {
    const id = Number(req.params.id);
    await prisma.komentarze.delete({ where: { id } });
    res.json({ message: 'Deleted' });
});

// Wpisy CRUD
app.get('/wpisy', async (req, res) => {
    const wpisy = await prisma.wpis.findMany();
    res.json(wpisy);
});

app.get('/wpisy/:id', async (req, res) => {
    const id = Number(req.params.id);
    const wpis = await prisma.wpis.findUnique({ where: { id } });
    res.json(wpis);
});

app.post('/wpisy', async (req, res) => {
    const { wpis, kategoriaId } = req.body;
    const newWpis = await prisma.wpis.create({
        data: { wpis, kategoriaId },
    });
    res.json(newWpis);
});

app.put('/wpisy/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { wpis, kategoriaId } = req.body;
    const updated = await prisma.wpis.update({
        where: { id },
        data: { wpis, kategoriaId },
    });
    res.json(updated);
});

app.delete('/wpisy/:id', async (req, res) => {
    const id = Number(req.params.id);
    await prisma.wpis.delete({ where: { id } });
    res.json({ message: 'Deleted' });
});

app.get('/error-test', (req, res, next) => {
    const err = new Error('Testowy błąd');
    err.status = 400;
    next(err);
});

app.use(async (err, req, res, next) => {
    console.error('Error middleware:', err);

    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Internal server error';

    try {
        if (db) {
            const errorCollection = db.collection('errorLogs');
            await errorCollection.insertOne({
                message,
                status,
                stack: err.stack,
                method: req.method,
                url: req.originalUrl,
                ip: req.ip || req.connection.remoteAddress,
                timestamp: new Date()
            });
        }
    } catch (dbErr) {
        console.error('Nie udało się zapisać błędu do MongoDB:', dbErr);
    }

    res.status(status).json({
        error: message
    });
});




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
