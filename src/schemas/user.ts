import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    unique: true,
    required: true
  },
  staff: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

export default model('User', UserSchema)
