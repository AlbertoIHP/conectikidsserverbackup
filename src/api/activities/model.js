import mongoose, { Schema } from 'mongoose'

const activitiesSchema = new Schema({
  createdAt: {
    type: String
  },
  description: {
    type: String
  },
  createdBy_id: {
    type: String
  },
  course_id: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

activitiesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdAt: this.createdAt,
      description: this.description,
      createdBy_id: this.createdBy_id,
      course_id: this.course_id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Activities', activitiesSchema)

export const schema = model.schema
export default model
