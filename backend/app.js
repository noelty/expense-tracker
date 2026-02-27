import express from 'express'
import cors from 'cors'
import multer from 'multer'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors({
  origin: [
    "http://localhost:8080",
    "https://localhost:8080",
    "https://192.168.1.106:8080",
    "http://192.168.1.106:8080"
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
    res.json({ message: `expense recieved` })
  } catch (error) {
    console.error('Error handling POST:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
