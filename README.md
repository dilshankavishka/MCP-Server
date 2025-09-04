# MCP Server – Coding Challenge

This project implements a **Model Context Protocol (MCP) server** with two key features:

1. **Chat about CV** – Parse a structured CV (`cv.json`) and answer queries like:

   - “What role did I have at my last position?”
   - “What projects have you built?”
   - “What skills do you know?”

2. **Send Email Notifications** – Expose an endpoint to send emails (recipient, subject, body).

3. _(Optional)_ **Next.js Playground** – A minimal frontend (to be added) for chatting with the server and sending emails.

---

## Tech Stack

- Backend: Node.js, Express
- Email: Nodemailer (Ethereal for demo/testing)
- Data: Structured JSON CV
- Deployment (planned): Render (Backend), Vercel (Frontend)

---

## Project Structure

mcp-server/
│── server.js # Main Express server
│── cv.json # Resume data in JSON format
│── .env # Environment variables
│── package.json # Dependencies

---

## Setup

### 1. Clone repo

```bash
git clone https://github.com/your-username/mcp-server.git
cd mcp-server

2. Install dependencies
npm install

3. Environment variables

Create a .env file in the root:

PORT=5000


(No email credentials needed for Ethereal, it’s auto-generated each run.)

4. Run server
node server.js


You should see:

🚀 MCP server running on port 5000

Testing the Endpoints
1. CV Query

POST http://localhost:5000/cv-query
Body (JSON):

{
  "question": "What role did I have at my last position?"
}


Response:

{
  "answer": "Your last role was Software Engineer Intern at SimpliFy Labs (LK) (Feb 2025 - Jul 2025)."
}


You can also ask:

"What projects have you built?"

"What skills do you know?"

"What’s your education?"

Send Email (Demo via Ethereal)

POST http://localhost:5000/send-email
Body (JSON):

{
  "recipient": "test@example.com",
  "subject": "Hello from MCP",
  "body": "This is a test email via Ethereal 🚀"
}


Response:

{
  "status": "success",
  "message": "Email sent (preview URL below)",
  "preview": "https://ethereal.email/message/YOUR-PREVIEW-LINK"
}


👉 Open the preview link to view the email in Ethereal’s inbox.
```
