import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  storedArrays: {
    type: Array,
    required: false,
  }
});

export default mongoose.model('user', User);
