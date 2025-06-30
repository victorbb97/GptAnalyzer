import mongoose from 'mongoose';

const UsedTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  email: { type: String },
  usedAt: { type: Date, default: Date.now },
});

export default mongoose.model('UsedToken', UsedTokenSchema);
