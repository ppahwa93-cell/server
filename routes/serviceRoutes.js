import express from 'express'
import { Service } from '../models/Service.js'

const router = express.Router()

// Seed default services if collection is empty
const seedServicesIfEmpty = async (initialServices, initialConsultation) => {
  try {
    const count = await Service.countDocuments()
    if (count === 0 && Array.isArray(initialServices)) {
      const allToSeed = [...initialServices, initialConsultation]
      await Service.insertMany(allToSeed)
      console.log('🌱 Seeded initial services into MongoDB.')
    }
  } catch (error) {
    console.error('Error seeding initial services:', error)
  }
}

// GET /api/services - Fetch all services & consultation
router.get('/', async (req, res) => {
  try {
    const all = await Service.find()
    const services = all.filter(s => s.id !== 'consultation')
    const consultation = all.find(s => s.id === 'consultation') || null
    res.json({ success: true, services, consultation })
  } catch (error) {
    console.error('Error fetching services:', error)
    res.status(500).json({ success: false, message: 'Server error fetching services' })
  }
})

// PUT /api/services/:id - Update dynamic price & info for a service
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    let updatedSteps = updates.steps
    if (updates.consultationPrice && updates.hasSteps) {
      updatedSteps = [
        { step: 1, title: 'Step 1: Consultation', price: Number(updates.consultationPrice), duration: '30-45 Mins' },
        { step: 2, title: 'Step 2: Full Deep Session', price: Number(updates.price), duration: updates.duration || '2.5 Hours Deep Session' }
      ]
    }

    const payload = {
      ...updates,
      ...(updatedSteps && { steps: updatedSteps }),
      ...(updates.price && { formattedPrice: `₹${Number(updates.price).toLocaleString('en-IN')}` })
    }

    const updated = await Service.findOneAndUpdate(
      { id },
      { $set: payload },
      { new: true, upsert: true }
    )

    res.json({ success: true, message: 'Service updated successfully in MongoDB', data: updated })
  } catch (error) {
    console.error('Error updating service:', error)
    res.status(500).json({ success: false, message: 'Server error updating service' })
  }
})

// POST /api/services/seed - Seed or reset services to initial defaults
router.post('/seed', async (req, res) => {
  try {
    const { services, consultation } = req.body
    if (services && consultation) {
      await Service.deleteMany({})
      const all = [...services, consultation]
      await Service.insertMany(all)
      return res.json({ success: true, message: 'Reset all services to defaults in MongoDB' })
    }
    res.status(400).json({ success: false, message: 'Invalid payload for seeding' })
  } catch (error) {
    console.error('Error seeding services:', error)
    res.status(500).json({ success: false, message: 'Server error seeding services' })
  }
})

export default router
