const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

const data = require('./data.json')

app.use(cors())

app.get('/', (req, res) => {
  setTimeout(() => {
    res.send(data.slice(0, 3))
  }, 3000)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})