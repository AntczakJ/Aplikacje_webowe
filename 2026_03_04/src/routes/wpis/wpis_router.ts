import express from 'express'
import { prisma } from '../../../lib/prisma'

const wpisRouter = express.Router()



wpisRouter.get('/', async (req, res) => {
  const wpisy = await prisma.wpis.findMany({ include: { Kategoria: true } })
  res.json(wpisy)
})

wpisRouter.get('/:id', async (req, res) => {
  const wpis = await prisma.wpis.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { Kategoria: true, Komentarze: true }
  })
  if (!wpis) return res.status(404).json({ error: 'Nie znaleziono' })
  res.json(wpis)
})

wpisRouter.post('/', async (req, res) => {
  console.log(req.body)
  const { txt, KatId } = req.body
  try {
    const wpis = await prisma.wpis.create({
      data: { Text: txt, KategoriaId: parseInt(KatId) }
    })
    res.json(wpis)
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err })
  }
})

wpisRouter.delete('/:id', async (req, res) => {
  try {
    await prisma.wpis.delete({ where: { id: parseInt(req.params.id) } })
    res.json({ ok: true })
  } catch {
    res.status(404).json({ error: 'Nie znaleziono' })
  }
})

export { wpisRouter }
