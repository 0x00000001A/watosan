const mongoose = require('mongoose')

const types = mongoose.SchemaTypes

const FileSchema = new mongoose.Schema({
  filename: types.String,
  mimetype: types.String,
  encoding: types.String
})

FileSchema.virtual('id').get(function () {
  return this._id
})

module.exports = mongoose.model('File', FileSchema)
