const mongoose = require('mongoose')

const types = mongoose.SchemaTypes

const PostSchema = new mongoose.Schema({
  title: types.String,
  description: types.String,

  slug: types.String,
  tags: [types.String],
  image: types.String,
  short: types.String,
  content: types.String,

  date: types.Date,
  mailed: types.Boolean,
  scratch: types.Boolean
})

PostSchema.virtual('id').get(function () {
  return this._id.toString()
})

module.exports = mongoose.model('Post', PostSchema)
