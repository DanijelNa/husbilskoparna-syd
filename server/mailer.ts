import { Resend } from 'resend';

// Remove the createTestAccount function as we will use Resend directly
// // Create a test account using Ethereal - a fake SMTP service for testing
// // This creates a temporary email account that can receive emails
// // You can view the emails in the Ethereal web interface (link will be logged to console)
// async function createTestAccount() {
//   const testAccount = await nodemailer.createTestAccount();
//   return nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false,
//     auth: {
//       user: testAccount.user,
//       pass: testAccount.pass,
//     },
//   });
// }

// Email template for quick quote form submissions
function createEmailTemplate(data: {
  name: string;
  email: string;
  phone: string;
  registrationNumber: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #49B265; margin: 0;">Husbilsköparna Syd - Ny värderingsförfrågan</h2>
      </div>
      
      <p style="margin-bottom: 20px;">En ny värderingsförfrågan har skickats via webbplatsen:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <th style="text-align: left; padding: 8px; background-color: #f2f2f2; border: 1px solid #ddd;">Fält</th>
          <th style="text-align: left; padding: 8px; background-color: #f2f2f2; border: 1px solid #ddd;">Värde</th>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Namn</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">E-post</td>
          <td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${data.email}" style="color: #49B265;">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Telefon</td>
          <td style="padding: 8px; border: 1px solid #ddd;"><a href="tel:${data.phone}" style="color: #49B265;">${data.phone}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">Registreringsnummer</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${data.registrationNumber}</td>
        </tr>
      </table>
      
      <div style="font-size: 14px; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
        <p>Detta är ett automatiskt genererat meddelande från Husbilsköparna Syd webbplats.</p>
      </div>
    </div>
  `;
}

// Send an email with the quick quote form data
export async function sendQuickQuoteEmail(data: {
  name: string;
  email: string;
  phone: string;
  registrationNumber: string;
}) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Ensure the sender details are correctly configured for production
    const senderName = process.env.EMAIL_SENDER_NAME || 'Husbilsköparna Syd';
    const senderAddress = process.env.EMAIL_SENDER_ADDRESS || 'noreply@husbilskoparna.se';
    
    // Send email
    const info = await resend.emails.send({
      from: `${senderName} <${senderAddress}>`,
      to: 'mats105@me.com', // This would be the actual recipient in production
      subject: `Ny värderingsförfrågan från ${data.name}`,
      html: createEmailTemplate(data),
    });

    if (info.error) {
      console.error("Error sending email from Resend:", info.error);
    }
    console.log('Message sent: %s', (info as any).id);
    
    return {
      success: true,
      messageId: (info as any).id,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}