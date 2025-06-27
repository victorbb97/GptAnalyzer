import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AccessToken from './models/AccessToken.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const tokens = await AccessToken.find().limit(50);
    console.log('=== TOKENS ===');
    tokens.forEach((t, i) => {
      console.log(`${i + 1}. ${t.token} | usado: ${t.used} | email: ${t.email || '---'}`);
    });
    process.exit();
  })
  .catch(err => console.error('Erro Mongo:', err));
