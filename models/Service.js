import mongoose from 'mongoose'

const stepSchema = new mongoose.Schema({
  step: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, default: '' }
}, { _id: false })

const serviceSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    title: {
      type: String,
      required: true
    },
    shortTitle: {
      type: String,
      default: ''
    },
    badge: {
      type: String,
      default: ''
    },
    badgeClass: {
      type: String,
      default: 'badge-purple'
    },
    image: {
      type: String,
      default: ''
    },
    duration: {
      type: String,
      default: '60 Mins'
    },
    price: {
      type: Number,
      required: true
    },
    originalPrice: {
      type: Number,
      default: null
    },
    formattedPrice: {
      type: String,
      default: ''
    },
    consultationPrice: {
      type: Number,
      default: null
    },
    hasSteps: {
      type: Boolean,
      default: false
    },
    steps: [stepSchema],
    tagline: {
      type: String,
      default: ''
    },
    summary: {
      type: String,
      default: ''
    },
    whoNeedsThis: [{ type: String }],
    sessionProcess: [
      {
        step: { type: String },
        title: { type: String },
        desc: { type: String }
      }
    ],
    benefits: [{ type: String }],
    faqs: [
      {
        question: { type: String },
        answer: { type: String }
      }
    ]
  },
  {
    timestamps: true
  }
)

export const Service = mongoose.model('Service', serviceSchema)
