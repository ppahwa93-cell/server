import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB } from './config/db.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '.env') })
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

// Healthcheck Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    message: 'Past Life with Sonika Backend Server Running',
    timestamp: new Date().toISOString()
  })
})

// Mount API Routes
app.use('/api/appointments', appointmentRoutes)
app.use('/api/services', serviceRoutes)

// Start Server & Connect MongoDB
const startServer = async () => {
  await connectDB()
  
  app.listen(PORT, () => {
    console.log(`🚀 PastLife Backend Server running on http://localhost:${PORT}`)
  })
}

startServer()
