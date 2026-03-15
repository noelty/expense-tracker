import express from 'express'
import cors from 'cors'
import multer from 'multer'

import {processExpense} from './llm.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors({
  origin: [
    "http://localhost:8080",
    "https://localhost:8080",
    "https://192.168.1.36:8080",
    "http://192.168.1.36:8080",
    "https://10.145.202.50:8080/"
  ]
}))

const upload = multer({ dest: "uploads/" })


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', upload.single('image'), (req, res) => {
  try {
    console.log(req.body)
    console.log(req.file)
    processExpense(req.file)
    res.json({ message: `expense recieved` })
  } catch (error) {
    console.error('Error handling POST:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
