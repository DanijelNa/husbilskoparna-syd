// GoHighLevel Integration Module
interface GHLContact {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  customFields?: Record<string, string>;
  tags?: string[];
  source?: string;
}

interface GHLWebhookData {
  name: string;
  email: string;
  phone: string;
  registrationNumber: string;
  timestamp: string;
  source: string;
}

// Send contact to GoHighLevel via API
export async function sendToGHL(data: {
  name: string;
  email: string;
  phone: string;
  registrationNumber: string;
}): Promise<{ success: boolean; error?: string; contactId?: string }> {
  const GHL_API_KEY = process.env.GHL_API_KEY;
  const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
  
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    console.log('GHL API credentials not configured, skipping GHL integration');
    return { success: true }; // Don't fail the form if GHL isn't configured
  }

  try {
    const [firstName, ...lastNameParts] = data.name.split(' ');
    const lastName = lastNameParts.join(' ') || '';

    const ghlContact: GHLContact = {
      firstName,
      lastName,
      email: data.email,
      phone: data.phone,
      customFields: {
        'registration_number': data.registrationNumber,
        'lead_source': 'Website Quick Quote',
        'submission_date': new Date().toISOString()
      },
      tags: ['Website Lead', 'Quick Quote'],
      source: 'Husbilsköparna Syd Website'
    };

    const response = await fetch(`https://services.leadconnectorhq.com/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      },
      body: JSON.stringify({
        locationId: GHL_LOCATION_ID,
        ...ghlContact
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GHL API Error:', response.status, errorText);
      return { 
        success: false, 
        error: `GHL API returned ${response.status}: ${errorText}` 
      };
    }

    const result = await response.json();
    console.log('Successfully sent contact to GHL:', result.contact?.id);
    
    return { 
      success: true, 
      contactId: result.contact?.id 
    };

  } catch (error) {
    console.error('Error sending to GHL:', error);
    return { 
      success: false, 
      error: (error as Error).message 
    };
  }
}

// Send data to custom webhook (alternative to API)
export async function sendToWebhook(data: {
  name: string;
  email: string;
  phone: string;
  registrationNumber: string;
}): Promise<{ success: boolean; error?: string }> {
  const WEBHOOK_URL = process.env.GHL_WEBHOOK_URL;
  
  if (!WEBHOOK_URL) {
    console.log('Webhook URL not configured, skipping webhook integration');
    return { success: true }; // Don't fail the form if webhook isn't configured
  }

  try {
    const webhookData: GHLWebhookData = {
      ...data,
      timestamp: new Date().toISOString(),
      source: 'Husbilsköparna Syd Website'
    };

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Husbilskoparna-Syd-Website'
      },
      body: JSON.stringify(webhookData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Webhook Error:', response.status, errorText);
      return { 
        success: false, 
        error: `Webhook returned ${response.status}: ${errorText}` 
      };
    }

    console.log('Successfully sent data to webhook');
    return { success: true };

  } catch (error) {
    console.error('Error sending to webhook:', error);
    return { 
      success: false, 
      error: (error as Error).message 
    };
  }
}

// Combined function to try both API and webhook
export async function integrateWithGHL(data: {
  name: string;
  email: string;
  phone: string;
  registrationNumber: string;
}): Promise<{ success: boolean; method?: string; error?: string }> {
  
  // Try GHL API first (preferred method)
  const apiResult = await sendToGHL(data);
  if (apiResult.success && apiResult.contactId) {
    return { success: true, method: 'GHL API' };
  }

  // Fallback to webhook if API fails or isn't configured
  const webhookResult = await sendToWebhook(data);
  if (webhookResult.success) {
    return { success: true, method: 'Webhook' };
  }

  // Both failed
  return { 
    success: false, 
    error: `API: ${apiResult.error || 'Not configured'}, Webhook: ${webhookResult.error || 'Not configured'}` 
  };
}