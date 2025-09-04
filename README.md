# MCP Server & Frontend – Coding Challenge

This project was built as part of a coding challenge to demonstrate API design, integration skills, and a simple frontend playground. It includes both a backend **MCP server** and a **Next.js frontend**.

---

## 🔹 Features

### Backend (MCP Server)

- **Chat about CV** – Answers questions about my resume from a structured JSON file (`cv.json`).

  - Example questions:

    - "What role did I have at my last position?"
    - "What projects have you built?"
    - "What skills do you know?"
    - "What’s your education?"

- **Send Email Notifications** – Provides an endpoint to send emails (recipient, subject, body) using Nodemailer with Ethereal (test inbox).

### Frontend (Next.js Playground)

- A minimal UI with two sections:

  1. **CV Query Box** – Enter a question and see the server’s response.
  2. **Email Form** – Fill in recipient, subject, and body, then send an email through the backend.

---

## 🔹 Tech Stack

- **Backend:** Node.js, Express
- **Email:** Nodemailer (Ethereal for testing)
- **Frontend:** Next.js (React)
- **Deployment:** Render (backend) + Vercel (frontend)

---

## 🔹 Live Links

- **Backend Repo:** [MCP-Server](https://github.com/dilshankavishka/MCP-Server.git)
- **Backend Live:** https://mcp-server-nze2.onrender.com
- **Frontend Repo:** [MCP-Frontend](https://github.com/dilshankavishka/MCP-Frontend.git)
- **Frontend Live:** https://mcp-frontend-two.vercel.app/

---

## 🔹 Local Setup

### 1. Clone repos

```bash
# Backend
git clone https://github.com/dilshankavishka/MCP-Server.git
cd MCP-Server

# Frontend
git clone https://github.com/dilshankavishka/MCP-Frontend.git
cd MCP-Frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run backend

```bash
cd MCP-Server
node server.js
```

Server should start on `http://localhost:5000`

### 4. Run frontend

```bash
cd MCP-Frontend
npm run dev
```

Frontend should start on `http://localhost:3000`

---

## 🔹 Example Usage

### CV Query

**POST** `http://localhost:5000/cv-query`

```json
{
  "question": "What role did I have at my last position?"
}
```

**Response:**

```json
{
  "answer": "Your last role was Software Engineer Intern at SimpliFy Labs (LK) (Feb 2025 - Jul 2025)."
}
```

### Send Email

**POST** `http://localhost:5000/send-email`

```json
{
  "recipient": "test@example.com",
  "subject": "Hello from MCP",
  "body": "This is a test email via Ethereal 🚀"
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Email sent (preview URL below)",
  "preview": "https://ethereal.email/message/YOUR-PREVIEW-LINK"
}
```

👉 Open the preview link to view the test email.

---

## 🔹 Notes on Approach

- The CV is stored in JSON for structured querying (instead of live parsing).
- A simple keyword-based matcher powers the `/cv-query` endpoint.
- Emails use Ethereal for testing (no real delivery, but full previews).
- Deployment handled via Render (API) and Vercel (frontend UI).

---

✅ With this setup, you can query my CV, send test emails, and interact with everything through a live frontend demo.
