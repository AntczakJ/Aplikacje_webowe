import express from 'express'
import { prisma } from '../../../lib/prisma'

const komentarzRouter = express.Router()

komentarzRouter.get('/', async (req, res) => {
  const komentarze = await prisma.komentarz.findMany()
  res.json(komentarze)
})

komentarzRouter.get('/wpis/:wpisId', async (req, res) => {
  const komentarze = await prisma.komentarz.findMany({
    where: { WpisId: parseInt(req.params.wpisId) }
  })
  res.json(komentarze)
})

komentarzRouter.post('/', async (req, res) => {
  const { comm, WpisId } = req.body
  try {
    const k = await prisma.komentarz.create({
      data: { Komentarz: comm, WpisId: parseInt(WpisId) }
    })
    res.json(k)
  } catch (err) {
    res.status(400).json({ error: err })
  }
})

// usuń komentarz
komentarzRouter.delete('/:id', async (req, res) => {
  try {
    await prisma.komentarz.delete({ where: { id: parseInt(req.params.id) } })
    res.json({ ok: true })
  } catch {
    res.status(404).json({ error: 'Nie znaleziono' })
  }
})

export { komentarzRouter }
