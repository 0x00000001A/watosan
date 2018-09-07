const mongoose = require('mongoose')

const types = mongoose.SchemaTypes

const UserSchema = new mongoose.Schema({
  email: types.String,
  password: types.String
})

UserSchema.virtual('id').get(function () {
  return this._id.toString()
})

module.exports = mongoose.model('User', UserSchema)
