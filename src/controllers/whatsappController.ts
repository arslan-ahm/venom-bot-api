import { Whatsapp, type CreateConfig } from 'venom-bot';
import { type SendRequestBody } from '../types';
import type { Request, Response } from 'express';

let client: Whatsapp | null = null;
let clientReady: Promise<void>;

const venomOptions = {
  session: process.env.SESSION_NAME || 'session-name',
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
        .catch((error) => {
          console.error('❌ Error starting Venom:', error);
          if (error instanceof Error) {
            reject(error);
          }
          return;
        });
    });
  });
};


export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  const { to, type, message, file, filename, contact, location }: SendRequestBody = req.body;
  // const { to, message }: SendRequestBody = req.body;

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
    const recipients = Array.isArray(to) ? to : [to];
    for (const recipient of recipients) {
      let jid = recipient;
      if (!jid.startsWith('92') && jid.startsWith('0')) {
        jid = '92' + jid.slice(1);
      }
      jid = `${jid}@c.us`;
      console.log('Sending to:', jid);

      switch (type) {
        case 'text':
          if (!message) throw new Error('Message is required for text type');
          await client.sendText(jid, message);
          break;

        case 'file':
          if (!file) throw new Error('File data is required for file type');
          const buffer = Buffer.from(file, 'base64');
          const base64File = `data:application/octet-stream;base64,${buffer.toString('base64')}`;
          await client.sendFile(jid, base64File, filename || 'attachment', message || '');
          break;

        case 'contact':
          if (!contact || !contact.name || !contact.phone) {
            throw new Error('Contact name and phone are required for contact type');
          }
          await client.sendContactVcard(jid, `${contact.phone}@c.us`, contact.name);
          break;

        case 'location':
          if (!location || !location.latitude || !location.longitude) {
            throw new Error('Latitude and longitude are required for location type');
          }
          await client.sendLocation(
            jid,
            location.latitude,
            location.longitude,
            location.description || ''
          );
          break;

        default:
          throw new Error('Invalid message type');
      }
    }

    res.send({ status: '✅ Message sent' });
  } catch (err) {
    console.error('❌ Error sending message:', err);
    if (err instanceof Error) {
      res.status(500).send({ error: err.message || 'Failed to send message' });
    }
    return;
  }
};

// Controller for test endpoint
export const testEndpoint = (req: Request, res: Response): void => {
  res.status(200).send({ message: 'Hello from Venom API' });
};