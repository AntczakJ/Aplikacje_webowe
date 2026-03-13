import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { kategoriaRouter } from './routes/kategoria/kategoria_router'
import { komentarzRouter } from './routes/komentarz/komentarz_router'
import { wpisRouter } from './routes/wpis/wpis_router'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/kategoria', kategoriaRouter)
app.use('/komentarz', komentarzRouter)
app.use('/wpis', wpisRouter)

app.use(express.static(path.join(__dirname, '../frontend/dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

app.listen(3000, () => console.log('http://localhost:3000'))
