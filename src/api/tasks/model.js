import mongoose, { Schema } from 'mongoose'

const tasksSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  selectedDate: {
    type: String
  },
  timeof: {
    type: String
  },
  course_id: {
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
