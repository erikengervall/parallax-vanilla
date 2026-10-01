// Serves the demo page with the local build at http://localhost:3000
import express from 'express'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const app = express()

app.use('/dist', express.static(root + 'dist'))
app.use('/test', express.static(root + 'test'))
app.get('/', (_req, res) => res.sendFile(root + 'index.html'))

const port = Number(process.env.PORT) || 3000
app.listen(port, () => console.log(`Demo running on http://localhost:${port}`))
