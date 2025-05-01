import { Whatsapp, type CreateConfig } from 'venom-bot';
import { type SendRequestBody } from '../types';

let client: Whatsapp | null = null;
let clientReady: Promise<void>;

const venomOptions = {
  session: process.env.SESSION_NAME || 'techloset-onboarding',
  headless: false,
  devtools: false,
  debug: false,
  autoClose: 0,
  browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
};

// Initialize WhatsApp client
export const initializeWhatsappClient = (): void => {
  clientReady = new Promise((resolve, reject) => {
    import('venom-bot').then(({ create }) => {
      create(
        venomOptions.session,
        (base64Qr: string, asciiQR: string, attempts: number | undefined) => {
          console.log('QR Code Generated:', asciiQR);
          console.log('Attempts:', attempts);
        },
        (statusSession: string, session: string) => {
          console.log('Session Status:', statusSession);
          console.log('Session Name:', session);
        },
        venomOptions as CreateConfig
      )
        .then((whatsappClient: Whatsapp) => {
          client = whatsappClient;
          console.log('✅ Venom Bot is ready.');
          resolve();
        })
        .catch((error: any) => {
          console.error('❌ Error starting Venom:', error);
          reject(error);
        });
    });
  });
};

// Controller for sending messages
export const sendMessage = async (req: any, res: any): Promise<void> => {
  const { to, message }: SendRequestBody = req.body;

  if (!client) {
    try {
      await clientReady;
    } catch (error) {
      res.status(503).send({ error: 'WhatsApp initialization failed' });
      return;
    }
  }

  if (!client) {
    res.status(503).send({ error: 'WhatsApp not ready' });
    return;
  }

  try {
    let jid = to;
    if (!jid.startsWith('92') && jid.startsWith('0')) {
      jid = '92' + jid.slice(1);
    }
    jid = `${jid}@c.us`;
    console.log('Sending message to:', jid);
    await client.sendText(jid, message);
    res.send({ status: '✅ Message sent' });
  } catch (err: any) {
    console.error('❌ Error sending message:', err);
    res.status(500).send({ error: err.message || 'Failed to send message' });
  }
};

// Controller for test endpoint
export const testEndpoint = (req: any, res: any): void => {
  res.status(200).send({ message: 'Hello from Venom API' });
};