import mongoose, { Schema } from 'mongoose'

const chatsSchema = new Schema({
  course_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  picture: {
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

chatsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      course_id: this.course_id,
      name: this.name,
      description: this.description,
      picture: this.picture,
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
