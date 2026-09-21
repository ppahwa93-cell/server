import express from 'express'
import { Appointment } from '../models/Appointment.js'

const router = express.Router()

// GET /api/appointments - Fetch all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 })
    res.json({ success: true, count: appointments.length, data: appointments })
  } catch (error) {
    console.error('Error fetching appointments:', error)
    res.status(500).json({ success: false, message: 'Server error fetching appointments' })
  }
})

// POST /api/appointments - Create a new appointment
router.post('/', async (req, res) => {
  try {
    const {
      id,
      serviceId,
      serviceTitle,
      step,
      stepTitle,
      customerName,
      customerPhone,
      customerEmail,
      preferredDate,
      preferredTime,
      notes,
      amount,
      paymentId,
      status
    } = req.body

    const appointmentId = id || `apt_${Date.now()}`
    const formattedAmount = `₹${Number(amount || 0).toLocaleString('en-IN')}`

    const newAppointment = new Appointment({
      id: appointmentId,
      serviceId: serviceId || 'consultation',
      serviceTitle: serviceTitle || 'Spiritual Healing Session',
      step: step || null,
      stepTitle: stepTitle || '',
      customerName,
      customerPhone,
      customerEmail,
      preferredDate: preferredDate || '',
      preferredTime: preferredTime || '',
      notes: notes || '',
      amount: Number(amount || 0),
      formattedAmount,
      paymentId: paymentId || '',
      status: status || 'Confirmed'
    })

    const saved = await newAppointment.save()
    res.status(201).json({ success: true, message: 'Appointment created successfully', data: saved })
  } catch (error) {
    console.error('Error creating appointment:', error)
    res.status(500).json({ success: false, message: error.message || 'Server error creating appointment' })
  }
})

// PATCH /api/appointments/:id - Update appointment status / details
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    const updated = await Appointment.findOneAndUpdate(
      { id },
      { $set: updates },
      { new: true }
    )

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Appointment not found' })
    }

    res.json({ success: true, message: 'Appointment updated successfully', data: updated })
  } catch (error) {
    console.error('Error updating appointment:', error)
    res.status(500).json({ success: false, message: 'Server error updating appointment' })
  }
})

// DELETE /api/appointments/:id - Delete an appointment
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Appointment.findOneAndDelete({ id })

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Appointment not found' })
    }

    res.json({ success: true, message: 'Appointment deleted successfully' })
  } catch (error) {
    console.error('Error deleting appointment:', error)
    res.status(500).json({ success: false, message: 'Server error deleting appointment' })
  }
})

export default router
