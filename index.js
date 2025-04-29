import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import { OpenAI } from 'openai';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import pdfParse from 'pdf-parse'; // Corrigido aqui

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const port = 3000;

app.use(cors({
  origin: '*',
}));

// Servir o index.html corretamente
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Upload de currículo
app.post('/upload', upload.single('pdf'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }

    const dataBuffer = await pdfParse(req.file.buffer);
    const pdfText = dataBuffer.text;

    const prompt = `Avalie de forma profissional o seguinte currículo e forneça dicas para melhorias:\n\n${pdfText}`;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const feedback = completion.choices[0].message.content;
    res.json({ resultado: feedback });

  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({ error: error.message || 'Erro desconhecido.' });
  }
});

app.use((error, req, res, next) => {
  console.error('Erro geral:', error);
  res.status(500).json({
    message: 'Erro no servidor',
    error: error.message,
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
