const express = require('express')

const app = express()
const port = 3000

// Middleware
const bodyParser = require('body-parser')
const cors = require('cors')

let data = [...require('../data.json')]

app.use(cors())
app.use(bodyParser.json()) 

app.get('/', (req, res) => {
  // NOTE (LTJ): Cursor based data access
  //  If you pass both start and end cursor, API only uses start cursor
  // TODO (LTJ): Handle invalid pagination values
  // TODO (LTJ): Controllable page size
  const startCursor = parseInt(req.query.startCursor)
  const endCursor = parseInt(req.query.endCursor)

  if (startCursor === NaN || endCursor === NaN) {
    // TODO (LTJ): Error responsse
  }
  
  let startIndex, endIndex
  if (endCursor && !startCursor) {
    // BUG (LTJ): how about when endCursor < page size?
    endIndex = startCursor
    startIndex = endIndex - 5
  } else if (startCursor && !endCursor) {
    startIndex = startCursor
    endIndex = startIndex + 5
  } else {
    startIndex = 0
    endIndex = startIndex + 5
  }

  try {
    const payload = data.map((d, i) => ({ ...d, id: i })).slice(startIndex, endIndex)
    setTimeout(() => {
      res.send({
        payload: payload,
        meta: {
          previousCursor: startIndex > 0 ? startIndex - 1 : null,
          nextCursor: endIndex < data.length ? endIndex : null,
        }
    })}, 3000)
  } catch (error) {
    // TODO (LTJ): Error responsse
  }
})

// Image id's (for prosperity)
// level up: 1568659358810-bdbdb4decb5c
// burger: 1563191799-2c7e8c185bb3

app.post('/', (req, res) => {
  const imagePath = `https://images.unsplash.com/photo-${req.body.picture}?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8bmVvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`
  const newRecord = { title: req.body.title, description: req.body.title, imagePath: imagePath }
  data = [...data, newRecord]
  setTimeout(() => {
    res.send(req.body)
  }, 3000);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;