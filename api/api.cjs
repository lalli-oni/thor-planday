const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

const data = require('./data.json')

app.use(cors())

app.get('/', (req, res) => {
  res.send(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})