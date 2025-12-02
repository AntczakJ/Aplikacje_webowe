<<<<<<< HEAD
require('dotenv').config({ path: './.env' });
console.log('DATABASE_URL=', process.env.DATABASE_URL);
const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const port = 3000;

app.use(express.json());

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
=======
require('dotenv').config({ path: './.env' });
console.log('DATABASE_URL=', process.env.DATABASE_URL);
const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const port = 3000;

app.use(express.json());

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
>>>>>>> 7ee4744d8e8de7218f5f3947fc6fcf975d8992be
