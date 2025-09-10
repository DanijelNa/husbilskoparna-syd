import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendQuickQuoteEmail } from "./mailer";
import { integrateWithGHL } from "./ghl-integration";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { blogPosts } from '@shared/schema';
import { eq, desc } from 'drizzle-orm';

// Initialize database connection
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog API endpoints
  app.get('/api/blog/posts', async (req: Request, res: Response) => {
    try {
      const posts = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.published, true))
        .orderBy(desc(blogPosts.publishedAt));
      
      res.json({ posts });
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
  });

  app.get('/api/blog/posts/:slug', async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const post = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.slug, slug))
        .limit(1);
      
      if (post.length === 0) {
        return res.status(404).json({ error: 'Blog post not found' });
      }

      res.json({ post: post[0] });
    } catch (error) {
      console.error('Error fetching blog post:', error);
      res.status(500).json({ error: 'Failed to fetch blog post' });
    }
  });

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

      // Temporarily disable email sending
      // const emailResult = await sendQuickQuoteEmail({
      //   name,
      //   email,
      //   phone,
      //   registrationNumber
      // });

      // Success if GHL works
      if (ghlResult.success) {
        console.log('Form processed successfully:');
        if (ghlResult.success) {
          console.log(`- GHL integration: Success via ${ghlResult.method}`);
        }
        // if (emailResult.success) {
        //   console.log('- Email notification: Success');
        //   console.log('- Email preview URL:', emailResult.previewUrl);
        // }
        
        return res.status(200).json({ 
          success: true, 
          message: 'Form submitted successfully',
          ghl: ghlResult.success ? ghlResult.method : 'Failed',
          // email: emailResult.success ? 'Sent' : 'Failed',
          // previewUrl: emailResult.previewUrl 
        });
      } else {
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to process form submission',
          ghlError: ghlResult.error,
          // emailError: emailResult.error 
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
