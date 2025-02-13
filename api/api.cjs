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

  console.log(`${startIndex}-${endIndex}`)

  let payload

  try {
    payload = data.slice(startIndex, endIndex)
    setTimeout(() => {
      res.send({
        payload: data.slice(startIndex, endIndex),
        meta: {
          previousCursor: startIndex > 0 ? startIndex - 1 : null,
          nextCursor: endIndex < data.length ? endIndex : null,
        }
    })}, 3000)
  } catch (error) {
    // TODO (LTJ): Error responsse
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})