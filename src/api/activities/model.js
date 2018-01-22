import mongoose, { Schema } from 'mongoose'

const activitiesSchema = new Schema({
  name: {
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
  },
  picture: {
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
      name: this.name,
      id: this.id,
      description: this.description,
      createdBy_id: this.createdBy_id,
      course_id: this.course_id,
      picture: this.picture,
      createdAt: this.createdAt,
    }

    return full ? {
      ...view,
      createdBy_id: this.createdBy_id,
      updatedAt: this.updatedAt
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Activities', activitiesSchema)

export const schema = model.schema
export default model
