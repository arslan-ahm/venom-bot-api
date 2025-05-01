# Venom Bot WhatsApp API

A TypeScript-based WhatsApp messaging API built with venom-bot, integrated with Express.js, and designed to send messages via a RESTful endpoint. This project provides a scalable, modular solution for automating WhatsApp messaging, with a browser-based QR code authentication flow.
Table of Contents

### Features

- Prerequisites
- Installation
- Project Structure
- Environment Variables
- Usage
- API Endpoints
- Troubleshooting
- Contributing
- License

### Workings

Send WhatsApp messages programmatically via a REST API.
Browser-based QR code authentication (non-headless mode).
Modular folder structure with types/, controllers/, and routes/.
Environment variable support for configuration.
Automatic phone number formatting (e.g., 0346... to 92346...).
TypeScript for type safety and better development experience.

### Prerequisites

Node.js (v16+ recommended) or Bun runtime.
TypeScript installed globally (npm install -g typescript) if using Node.js.
A WhatsApp account and a phone to scan the QR code.
Internet connection (WhatsApp Web requires WebSocket access).

### Installation

##### Clone the Repository:

```
git clone https://github.com/your-username/venom-bot-app.git
cd venom-bot-app
```

##### Install Dependencies:Using Bun:

```
bun install
// OR
npm install
```

##### Set Up Environment Variables:

**Create a .env file in the root directory:**

```
PORT=3001
SESSION_NAME=techloset-onboarding
```

**PORT:** The port for the Express server (default: 3001).
**SESSION_NAME:** Name of the Venom Bot session (default: techloset-onboarding).

##### Run the Application:

**Using Bun:**

```
bun run start
```

**Using Node.js:**

```
npm run start:node
```

> A Chromium browser window will open displaying a QR code. Scan it with your WhatsApp app (Settings > Linked Devices > Link a Device) to authenticate.

### Project Structure

```
venom-bot-app/
├── src/                    # Source code
│   ├── controllers/        # Business logic
│   │   └── whatsappController.ts
│   ├── routes/            # API routes
│   │   └── whatsappRoutes.ts
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
├── index.ts               # Main entry point
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```



> Wait for ✅ Venom Bot is ready. in the console after scanning the QR code.

###### Test the API

(POST) "http://localhost:3001/api/test"

Response: {"message": "Hello from Venom API"}

###### Send a Message:

(POST) "http://localhost:3001/api/send"
WITH: '{"to": "923460177886", "message": "Hello, World"}'

Response: {"status": "✅ Message sent"}

Numbers can be provided in local format (e.g., 03001234567), and the app will convert them to international format (923001234567).

#### Troubleshooting

**QR Code Not Appearing:**

Delete the techloset-onboarding folder in the project root (session cache) and restart the server.
Ensure no firewall blocks WebSocket connections.

"The number does not exist" Error:

Verify the recipient number is registered on WhatsApp (e.g., 923460177886).
Use the full international format without spaces or dashes.

**Server Not Starting:**

Check .env file for correct syntax.
Ensure dependencies are installed (bun install or npm install).

**Browser Window Not Opening**:

Confirm headless: false in whatsappController.ts.
Try running with Node.js if Bun has compatibility issues (npm run start:node).

#### Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request.

#### License

This project is licensed under the MIT License. See LICENSE for details.

Built with ❤️ by [ARslan Ahmad](https://github.com/arslan-ahm) Updated: May 2025

