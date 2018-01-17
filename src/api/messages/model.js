import mongoose, { Schema } from 'mongoose'

const messagesSchema = new Schema({
  content: {
    type: String
  },
  sender_id: {
    type: String
  },
  chat_id: {
    type: String
  }
}, {
  timestamps: true,
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
      content: this.content,
      sender_id: this.sender_id,
      chat_id: this.chat_id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
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
