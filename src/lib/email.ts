import nodemailer from 'nodemailer';

// Reuse a single transporter instance
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'mkagrilandprojects@gmail.com',
    pass: process.env.EMAIL_PASS || '',
  },
});

export async function sendVisitRequestEmail(
  clientEmail: string,
  clientName: string,
  listingTitle: string,
  preferredDate: string
) {
  if (!process.env.EMAIL_PASS) {
    console.warn("EMAIL_PASS not configured. Skipping email send.");
    return;
  }

  const mailOptions = {
    from: `"MK Group Real Estate" <${process.env.EMAIL_USER || 'mkagrilandprojects@gmail.com'}>`,
    to: clientEmail,
    subject: `Site Visit Request Received - ${listingTitle}`,
    html: `
      <div style="font-family: sans-serif; max-w-lg; margin: 0 auto; color: #333;">
        <h2 style="color: #065f46;">Site Visit Request Received</h2>
        <p>Dear ${clientName},</p>
        <p>Thank you for your interest in MK Group. We have received your request for a site visit for <strong>${listingTitle}</strong>.</p>
        <p><strong>Requested Date:</strong> ${preferredDate || 'Not specified'}</p>
        <p>Our team is currently reviewing your request. We will contact you shortly to confirm the appointment.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>MK Group Team</strong></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send request email", error);
  }
}

export async function sendVisitConfirmationEmail(
  clientEmail: string,
  clientName: string,
  listingTitle: string
) {
  if (!process.env.EMAIL_PASS) {
    console.warn("EMAIL_PASS not configured. Skipping email send.");
    return;
  }

  const mailOptions = {
    from: `"MK Group Real Estate" <${process.env.EMAIL_USER || 'mkagrilandprojects@gmail.com'}>`,
    to: clientEmail,
    subject: `Site Visit Confirmed - ${listingTitle}`,
    html: `
      <div style="font-family: sans-serif; max-w-lg; margin: 0 auto; color: #333;">
        <h2 style="color: #065f46;">Site Visit Confirmed!</h2>
        <p>Dear ${clientName},</p>
        <p>Your site visit for <strong>${listingTitle}</strong> has been successfully confirmed by our team.</p>
        <p>One of our representatives will be in touch with you shortly (if they haven't already) to provide the exact meeting details and location directions.</p>
        <p>We look forward to showing you the property!</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>MK Group Team</strong></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send confirmation email", error);
  }
}
