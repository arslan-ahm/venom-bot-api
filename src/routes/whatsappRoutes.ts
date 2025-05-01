import { Router, type Request, type Response } from 'express';
import { sendMessage, testEndpoint } from '../controllers/whatsappController';

const router = Router();

router.post('/test', (req: Request, res: Response) => testEndpoint(req, res));
router.post('/send', async (req: Request, res: Response) => sendMessage(req, res));

export default router;