const express = require("express");
const fs = require("fs");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Load CV data
const cvData = JSON.parse(fs.readFileSync("cv.json", "utf-8"));

// Simple CV query endpoint
app.post("/cv-query", (req, res) => {
  const { question } = req.body;
  const q = question.toLowerCase();
  let answer = "Sorry, I couldn't find an answer to that.";

  // Check last job
  if (
    q.includes("last position") ||
    q.includes("last job") ||
    q.includes("current role")
  ) {
    const lastJob = cvData.employment[0];
    if (lastJob) {
      answer = `Your last role was ${lastJob.title} at ${lastJob.company} (${lastJob.duration}).`;
    }
  }

  // Check responsibilities
  else if (
    q.includes("responsibilities") ||
    q.includes("tasks") ||
    q.includes("duties")
  ) {
    const lastJob = cvData.employment[0];
    if (lastJob && lastJob.responsibilities) {
      answer = `At ${
        lastJob.company
      }, your responsibilities included: ${lastJob.responsibilities.join(
        ", "
      )}.`;
    }
  }

  // Check projects
  else if (
    q.includes("project") ||
    q.includes("built") ||
    q.includes("developed")
  ) {
    const projects = cvData.projects.map((p) => p.name).join(", ");
    answer = `You have worked on projects such as: ${projects}.`;
  }

  // Check skills
  else if (
    q.includes("skill") ||
    q.includes("technology") ||
    q.includes("tools") ||
    q.includes("languages")
  ) {
    const skills = [
      ...cvData.skills.programmingLanguages,
      ...cvData.skills.frameworks,
      ...cvData.skills.tools,
    ].join(", ");
    answer = `Your technical skills include: ${skills}.`;
  }

  // Education
  else if (
    q.includes("education") ||
    q.includes("degree") ||
    q.includes("studied")
  ) {
    const edu = cvData.education
      .map((e) => `${e.degree} at ${e.institution} (${e.duration})`)
      .join("; ");
    answer = `Your education includes: ${edu}.`;
  }

  res.json({ answer });
});

// Email sending endpoint
app.post("/send-email", async (req, res) => {
  const { recipient, subject, body } = req.body;

  try {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    let info = await transporter.sendMail({
      from: "MCP Server <test@mcp.com>",
      to: recipient,
      subject: subject,
      text: body,
    });

    res.json({
      status: "success",
      message: "Email sent (preview URL below)",
      preview: nodemailer.getTestMessageUrl(info),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Failed to send email." });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` MCP server running on port ${PORT}`));
