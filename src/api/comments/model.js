import mongoose, { Schema } from 'mongoose'

const commentsSchema = new Schema({
  content: {
    type: String
  },
  activity_id: {
    type: String
  },
  createdBy_id: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

commentsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      content: this.content,
      activity_id: this.activity_id,
      createdBy_id: this.createdBy_id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Comments', commentsSchema)

export const schema = model.schema
export default model
