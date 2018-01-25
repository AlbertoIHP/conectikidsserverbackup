import mongoose, { Schema } from 'mongoose'

const messagesSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: Object,
    required: true
  },
  chat_id: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

messagesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      text: this.text,
      user: this.user,
      chat_id: this.chat_id,
      createdAt: this.createdAt,
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Messages', messagesSchema)

export const schema = model.schema
export default model
