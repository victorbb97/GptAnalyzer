import mongoose from 'mongoose';
import dotenv from 'dotenv';
import crypto from 'crypto';
import AccessToken from './models/AccessToken.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB conectado.');

    const quantidade = 50; // Você pode mudar esse número
    const tokens = Array.from({ length: quantidade }).map(() => ({
      token: crypto.randomBytes(4).toString('hex').toUpperCase(),
      used: false
    }));

    await AccessToken.insertMany(tokens);
    console.log(`✅ ${quantidade} tokens inseridos com sucesso.`);
    process.exit();
  })
  .catch(err => console.error('Erro ao conectar MongoDB:', err));


  await AccessToken.updateMany({}, { $set: { used: true } });