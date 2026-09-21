import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../.env') })
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI
    if (!uri || uri.includes('<db_password>')) {
      console.warn('⚠️ MongoDB URI is not set or contains <db_password> placeholder. Running in fallback mode.')
      return false
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    })

    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`)
    return true
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`)
    return false
  }
}
