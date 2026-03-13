import express from 'express'
import 'dotenv/config'
import { prisma } from '../../../lib/prisma'
import { Kategoria_kategoria } from '../../../generated/prisma/enums'

const kategoriaRouter = express.Router()

kategoriaRouter.use(express.json())
kategoriaRouter.use(express.urlencoded({ extended: true }))

kategoriaRouter.get('/', async (req, res) => {
  const allKategoria = await prisma.kategoria.findMany()
  res.status(200).json(allKategoria)
})

kategoriaRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const kategoria = await prisma.kategoria.findUnique({
    where: {
      id: parseInt(id)
    }
  })
  res.status(200).json(kategoria)
})

kategoriaRouter.post('/', async (req, res) => {
  const { name, description } = req.body
  try {
    if (
      name &&
      !Object.values(Kategoria_kategoria).includes(name as Kategoria_kategoria)
    ) {
      return res.status(400).json({
        error: `Invalid category: ${name}`,
        validCategories: Object.values(Kategoria_kategoria)
      })
    }

    const newKategoria = await prisma.kategoria.create({
      data: {
        Kategoria: name,
        Opis: description
      }
    })
    res.status(200).json(newKategoria)
  } catch (err) {
    return res.status(400).json({ error: err })
  }
})

kategoriaRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const { name, description } = req.body

  try {
    if (
      name &&
      !Object.values(Kategoria_kategoria).includes(name as Kategoria_kategoria)
    ) {
      return res.status(400).json({
        error: `Invalid category: ${name}`,
        validCategories: Object.values(Kategoria_kategoria)
      })
    }

    const updatedKategoria = await prisma.kategoria.update({
      where: {
        id: parseInt(id)
      },
      data: {
        Kategoria: name,
        Opis: description
      }
    })

    res.status(200).json(updatedKategoria)
  } catch (error) {
    return res.status(404).json({ error: error })
  }
})

kategoriaRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const exists = await prisma.kategoria.findUnique({
    where: { id: parseInt(id) }
  })
  if (!exists) {
    return res.status(404).json({ error: 'wrong id was given' })
  }
  const delKategoria = await prisma.kategoria.delete({
    where: {
      id: parseInt(id)
    }
  })
  res.status(200).json(delKategoria)
})

export { kategoriaRouter }
