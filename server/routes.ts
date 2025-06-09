import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendQuickQuoteEmail } from "./mailer";
import { integrateWithGHL } from "./ghl-integration";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for submitting quick quote form
  app.post('/api/quick-quote', async (req: Request, res: Response) => {
    try {
      const { name, email, phone, registrationNumber } = req.body;
      
      // Validate required fields
      if (!name || !email || !phone || !registrationNumber) {
        return res.status(400).json({ 
          success: false, 
          message: 'All fields are required' 
        });
      }
      
      // Send to GoHighLevel first (primary integration)
      const ghlResult = await integrateWithGHL({
        name,
        email,
        phone,
        registrationNumber
      });

      // Send email (backup/notification)
      const emailResult = await sendQuickQuoteEmail({
        name,
        email,
        phone,
        registrationNumber
      });

      // Success if either GHL or email works
      if (ghlResult.success || emailResult.success) {
        console.log('Form processed successfully:');
        if (ghlResult.success) {
          console.log(`- GHL integration: Success via ${ghlResult.method}`);
        }
        if (emailResult.success) {
          console.log('- Email notification: Success');
          console.log('- Email preview URL:', emailResult.previewUrl);
        }
        
        return res.status(200).json({ 
          success: true, 
          message: 'Form submitted successfully',
          ghl: ghlResult.success ? ghlResult.method : 'Failed',
          email: emailResult.success ? 'Sent' : 'Failed',
          previewUrl: emailResult.previewUrl 
        });
      } else {
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to process form submission',
          ghlError: ghlResult.error,
          emailError: emailResult.error 
        });
      }
    } catch (error) {
      console.error('Error processing form submission:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Server error',
        error: (error as Error).message 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
