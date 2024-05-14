// index.js
import express from 'express'
import { generateToken, verifyToken } from './auth.js'
import { PORT } from './config/config.js'
const users = [
  { id: 1, username: 'marco', password: 'marco123' },
  { id: 2, username: 'luis', password: 'luis123' }
]
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi aplicación Express con JWT!')
})

app.post('/login', (req, res) => {
  const { username, password } = req.body
  const user = users.find((user) => user.username === username && user.password === password)

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = generateToken({ username, password })

  res.json({ token })
})

app.get('/verify', (req, res) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' })
  }

  try {
    const decoded = verifyToken(token.split(' ')[1])
    res.json({ message: `Bienvenido, ${decoded.username}!` })
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`)
})
