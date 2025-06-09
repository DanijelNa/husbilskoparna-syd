import nodemailer from 'nodemailer';

// Create a test account using Ethereal - a fake SMTP service for testing
// This creates a temporary email account that can receive emails
// You can view the emails in the Ethereal web interface (link will be logged to console)
async function createTestAccount() {
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

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
    // Create test account (free ethereal email)
    const transporter = await createTestAccount();
    
    // Send email
    const info = await transporter.sendMail({
      from: '"Husbilsköparna Syd Webbplats" <no-reply@husbilskoparna.se>',
      to: 'info@husbilskoparna.se', // This would be the actual recipient in production
      subject: `Ny värderingsförfrågan från ${data.name}`,
      html: createEmailTemplate(data),
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
    return {
      success: true,
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info)
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: (error as Error).message 
    };
  }
}