const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  email: { type: String, unique: true },
  authId: { type: Number, unique: true },
  role: { type: String, default: 'regular' },
  avatar: { type: String, default: '' },
  firstName: { type: String, default: '', min: 1, max: 100 },
  lastName: { type: String, default: '', min: 1, max: 100 },
  team: { type: String, default: 'none' }
});

module.exports = mongoose.model(' User', UserSchema);
