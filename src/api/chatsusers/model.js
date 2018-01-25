import mongoose, { Schema } from 'mongoose'

const chatsusersSchema = new Schema({
  chat_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

chatsusersSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      chat_id: this.chat_id,
      user_id: this.user_id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Chatsusers', chatsusersSchema)

export const schema = model.schema
export default model
