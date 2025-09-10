# Overview

This is a Swedish motorhome (husbil) buying service website called "Husbilsköparna Syd". The application is a lead generation platform where potential sellers can submit their motorhome details for a quick quote. The business purchases motorhomes across Sweden, offering a streamlined and secure selling process for customers.

The application is built as a full-stack web application with a React frontend and Express backend, designed to capture leads through a contact form and integrate with external CRM and email services for lead management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system using green (#49B265) as primary color
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent design
- **State Management**: React Query (TanStack Query) for server state management
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Storage**: In-memory storage implementation (MemStorage) with interface for future database integration
- **API Design**: RESTful endpoints for form submissions and lead processing
- **Development**: Hot module replacement with Vite integration for seamless full-stack development

## Lead Processing Pipeline
- **Primary Integration**: GoHighLevel CRM integration for immediate lead capture
- **Email Notifications**: Resend service for email delivery (currently disabled)
- **Fallback Strategy**: Graceful degradation if external services are unavailable
- **Error Handling**: Comprehensive error tracking and user feedback system

## Analytics and Tracking
- **Google Analytics 4**: Page view tracking and user behavior analysis
- **Google Tag Manager**: Advanced event tracking and conversion monitoring
- **Custom Events**: Phone clicks, email clicks, and form submissions tracking
- **Privacy Compliance**: GDPR-compliant privacy policy and data handling

## SEO and Performance
- **Server-Side Rendering**: Static generation with proper meta tags for SEO
- **Internationalization**: Swedish language content with proper locale settings
- **Schema Markup**: Structured data for local business SEO
- **Performance**: Optimized images, code splitting, and lazy loading

# External Dependencies

## Database and ORM
- **Neon Database**: PostgreSQL-compatible serverless database
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect
- **Connection**: Database URL-based configuration with environment variables

## CRM Integration
- **GoHighLevel**: Primary lead management system for contact capture and follow-up automation
- **API Integration**: RESTful API calls for contact creation and lead tracking

## Email Services
- **Resend**: Modern email API for transactional emails and notifications
- **Email Templates**: HTML-based email templates for lead notifications

## Analytics Platforms
- **Google Analytics 4**: User behavior tracking and conversion measurement
- **Google Tag Manager**: Event tracking and marketing automation

## UI and Styling
- **Radix UI**: Accessible component primitives for complex UI elements
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **Vite**: Build tool and development server with hot reload
- **TypeScript**: Static type checking for better code quality
- **ESBuild**: Fast JavaScript bundler for production builds