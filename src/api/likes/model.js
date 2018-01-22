import mongoose, { Schema } from 'mongoose'

const likesSchema = new Schema({
  user_id: {
    type: String
  },
  activity_id: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

likesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user_id: this.user_id,
      activity_id: this.activity_id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Likes', likesSchema)

export const schema = model.schema
export default model
