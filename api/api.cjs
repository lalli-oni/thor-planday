const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

const data = require('./data.json')

app.use(cors())

app.get('/', (req, res) => {
  // NOTE (LTJ): Cursor based data access
  //  If you pass both start and end cursor, API only uses start cursor
  // TODO (LTJ): Handle invalid pagination values
  // TODO (LTJ): Controllable page size
  const startCursor = req.query.startCursor
  const endCursor = req.query.endCursor
  
  let startIndex, endIndex
  if (endCursor && !startCursor) {
    endIndex = data.findIndex((d) => d.title === endCursor)
    startIndex = endIndex - 5
  } else {
    startIndex = startCursor ? data.findIndex((d) => d.title === startCursor) : 0
    endIndex = startIndex + 5
  }

  console.log(`${startIndex}-${endIndex}`)
  setTimeout(() => {
    res.send({
      payload: data.slice(startIndex, endIndex),
      meta: {
        previousCursor: startIndex > 0 ? data[startIndex - 1].title : null,
        nextCursor: endIndex < data.length ? data[startIndex + 1].title : null,
      }
  })
  }, 3000)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})