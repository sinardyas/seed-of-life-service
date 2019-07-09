const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const Verse = new Schema({
  verseBody: String,
  verseNumber: String
}, {
  _id: false
});

const Reflections = new Schema({
  title: String,
  body: String,
  verse: [Verse],
  author: String,
  publishDate: Date,
  status: Number
}, {
  timestamps: true,
  strict: true,
  collection: 'reflections'
});

Reflections.plugin(mongoosePaginate);
Reflections.index({
  title: 'text',
  body: 'text',
  author: 'text',
});

module.exports = mongoose.model('Reflections', Reflections);
