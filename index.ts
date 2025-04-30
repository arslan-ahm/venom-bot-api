import express from 'express';
import dotenv from 'dotenv';
import whatsappRoutes from './src/routes/whatsappRoutes';
import { initializeWhatsappClient } from './src/controllers/whatsappController';

dotenv.config();

const app = express();
app.use(express.json());

initializeWhatsappClient();

app.use('/message', whatsappRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Venom API running at ${process.env.BASE_URL}:${PORT}`);
});