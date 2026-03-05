import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // SSL (more reliable with Gmail App Passwords)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verify connection on startup
transporter.verify((error) => {
  if (error) {
    console.error("❌ Email setup failed:", error.message);
    console.error("   → Check SMTP_USER and SMTP_PASS in backend/.env");
  } else {
    console.log("✅ Email service connected! Ready to send notifications.");
  }
});

export const sendEnquiryEmail = async ({ name, phone, message }) => {
  const ownerEmail = process.env.OWNER_EMAIL;
  if (!ownerEmail || !process.env.SMTP_USER) {
    console.warn("⚠️  Email credentials not configured, skipping email.");
    return;
  }

  // Email to shop owner
  await transporter.sendMail({
    from: `"Lakshmi Fashion Portal" <${process.env.SMTP_USER}>`,
    to: ownerEmail,
    subject: `📩 New Enquiry from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #1a0810; color: #f5e6c8; border-radius: 12px;">
        <h2 style="color: #c9963e; border-bottom: 1px solid #c9963e33; padding-bottom: 12px;">
          🪡 New Customer Enquiry
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #c9963e; width: 120px;">Name:</td>
            <td style="padding: 10px; color: #f5e6c8;">${name}</td>
          </tr>
          <tr style="background: #2a1020;">
            <td style="padding: 10px; font-weight: bold; color: #c9963e;">Phone:</td>
            <td style="padding: 10px; color: #f5e6c8;">
              <a href="tel:${phone}" style="color: #c9963e;">${phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #c9963e; vertical-align: top;">Message:</td>
            <td style="padding: 10px; color: #f5e6c8;">${message}</td>
          </tr>
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #2a1020; border-radius: 8px; text-align: center;">
          <a href="https://wa.me/91${phone.replace(/\D/g, "")}" 
             style="background: #25d366; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
            💬 Reply on WhatsApp
          </a>
        </div>
        <p style="margin-top: 16px; font-size: 12px; color: #888; text-align: center;">
          Received via Lakshmi Fashion & Designers Portal
        </p>
      </div>
    `,
  });

  // Auto-reply to customer (only if they provided email)
};

export default transporter;
