import mongoose, { Schema } from 'mongoose'

const coursesSchema = new Schema({
  name: {
    type: String
  },
  garden_id: {
    type: String
  },
  teacher_id: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

coursesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      garden_id: this.garden_id,
      teacher_id: this.teacher_id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Courses', coursesSchema)

export const schema = model.schema
export default model
