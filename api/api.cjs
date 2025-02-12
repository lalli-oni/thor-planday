const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

const data = require('./data.json')

app.use(cors())

app.get('/', (req, res) => {
  // Id/Title of the first item in page
  // TODO (LTJ): Handle invalid pagination values
  // TODO (LTJ): Controllable page size
  const startCursor = req.params.cursor

  const startIndex = Math.max(data.findIndex((d) => d.title === startCursor), 0)
  const endIndex = startIndex + 10
  console.log(`${startIndex}-${endIndex}`)
  setTimeout(() => {
    res.send(data.slice(startIndex, endIndex))
  }, 3000)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})