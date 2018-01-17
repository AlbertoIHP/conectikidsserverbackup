import mongoose, { Schema } from 'mongoose'

const gardensSchema = new Schema({
  name: {
    type: String
  },
  direction: {
    type: String
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
      direction: this.direction,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Gardens', gardensSchema)

export const schema = model.schema
export default model
