import mongoose, { Schema } from 'mongoose'

const tasksSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  selectedDate: {
    type: String,
    required: true
  },
  timeof: {
    type: String,
    required: true
  },
  course_id: {
    type: String,
    required: true
  },
  createdBy_id: {
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

tasksSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      description: this.description,
      selectedDate: this.selectedDate,
      timeof: this.timeof,
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

const model = mongoose.model('Tasks', tasksSchema)

export const schema = model.schema
export default model
