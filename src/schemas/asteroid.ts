import { Schema, model } from 'mongoose'

const AsteroidSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },

  year: {
    type: String,
    required: true
  }
}, { timestamps: true })

export default model('Asteroid', AsteroidSchema) 
