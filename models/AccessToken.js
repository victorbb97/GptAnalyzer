import mongoose from 'mongoose';
const accessTokenSchema = new mongoose.Schema({
 email: String,
 token: String,
 createdAt: { type: Date, default: Date.now },
 used: { type: Boolean, default: false }
});

export default mongoose.model('AccessToken', accessTokenSchema);