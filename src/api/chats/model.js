import mongoose, { Schema } from 'mongoose'

const chatsSchema = new Schema({
  course_id: {
    type: String
  },
  name: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

chatsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      course_id: this.course_id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Chats', chatsSchema)

export const schema = model.schema
export default model
