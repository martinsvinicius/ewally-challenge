import express from 'express'
import 'express-async-errors'
import { globalErrorHandler } from './errors/globalErrorHandler'
import { router } from './routes/index.routes'

const APP_PORT = 8080

const app = express()

app.use(express.json())

app.use(router)

app.use(globalErrorHandler)

app.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`)
})
