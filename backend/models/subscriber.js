const mongoose = require('mongoose')

const types = mongoose.SchemaTypes

const SubscriberSchema = new mongoose.Schema({
  email: types.String,
  token: {
    type: types.String,
    unique: true
  }
})

SubscriberSchema.virtual('id').get(function () {
  return this._id.toString()
})

module.exports = mongoose.model('Subscriber', SubscriberSchema)
