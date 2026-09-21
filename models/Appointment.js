import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    serviceId: {
      type: String,
      required: true
    },
    serviceTitle: {
      type: String,
      required: true
    },
    step: {
      type: Number,
      default: null
    },
    stepTitle: {
      type: String,
      default: ''
    },
    customerName: {
      type: String,
      required: true,
      trim: true
    },
    customerPhone: {
      type: String,
      required: true,
      trim: true
    },
    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    preferredDate: {
      type: String,
      default: ''
    },
    preferredTime: {
      type: String,
      default: ''
    },
    notes: {
      type: String,
      default: ''
    },
    amount: {
      type: Number,
      required: true
    },
    formattedAmount: {
      type: String,
      default: ''
    },
    paymentId: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Completed', 'Rescheduled', 'Cancelled'],
      default: 'Confirmed'
    },
    bookedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
)

export const Appointment = mongoose.model('Appointment', appointmentSchema)
