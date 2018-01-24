import mongoose, { Schema } from 'mongoose'

const tagsSchema = new Schema({
  activity_id: {
    type: String,
    required: true
  },
  tagged_id: {
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

tagsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      activity_id: this.activity_id,
      tagged_id: this.tagged_id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Tags', tagsSchema)

export const schema = model.schema
export default model
