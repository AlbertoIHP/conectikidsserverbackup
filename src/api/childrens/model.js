import mongoose, { Schema } from 'mongoose'

const childrensSchema = new Schema({
  rut: {
    type: String
  },
  name: {
    type: String
  },
  parent_id: {
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

childrensSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      rut: this.rut,
      name: this.name,
      parent_id: this.parent_id,
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

const model = mongoose.model('Childrens', childrensSchema)

export const schema = model.schema
export default model
