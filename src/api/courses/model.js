import mongoose, { Schema } from 'mongoose'

const coursesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  garden_id: {
    type: String,
    required: true
  },
  teacher_id: {
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

coursesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      garden_id: this.garden_id,
      teacher_id: this.teacher_id
    }

    return full ? {
      ...view,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    } : view
  }
}

const model = mongoose.model('Courses', coursesSchema)

export const schema = model.schema
export default model
