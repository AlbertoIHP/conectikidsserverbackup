import mongoose, { Schema } from 'mongoose'

const gardensSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  direction: {
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

gardensSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      direction: this.direction
    }

    return full ? {
      ...view,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    } : view
  }
}

const model = mongoose.model('Gardens', gardensSchema)

export const schema = model.schema
export default model
