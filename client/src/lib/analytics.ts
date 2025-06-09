// Define the gtag function globally
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Initialize Google Analytics 4 and GTM
export const initAnalytics = () => {
  // Use provided IDs directly
  const measurementId = 'G-RPQJ1F6JV1';
  const gtmId = 'GTM-5MD3G9XS';

  // Initialize GTM first
  initGTM(gtmId);
  
  // Initialize GA4
  initGA4(measurementId);
  
  console.log('Analytics initialized successfully');
};

// Initialize Google Tag Manager
const initGTM = (gtmId: string) => {
  // GTM script in head
  const gtmScript = document.createElement('script');
  gtmScript.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}');
  `;
  document.head.appendChild(gtmScript);

  // GTM noscript fallback
  const noscript = document.createElement('noscript');
  noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
  document.body.insertBefore(noscript, document.body.firstChild);

  console.log('GTM initialized with ID:', gtmId);
};

// Initialize Google Analytics 4
const initGA4 = (measurementId: string) => {
  // Add Google Analytics script to the head
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialize gtag
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      page_title: document.title,
      page_location: window.location.href
    });
  `;
  document.head.appendChild(script2);

  console.log('GA4 initialized with ID:', measurementId);
};

// Track page views - useful for single-page applications
export const trackPageView = (url: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  const measurementId = 'G-RPQJ1F6JV1';
  
  window.gtag('config', measurementId, {
    page_path: url,
    page_title: document.title,
    page_location: window.location.href
  });
};

// Track form submission events
export const trackFormSubmit = (formName: string, additionalData?: Record<string, any>) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'form_submit', {
    event_category: 'engagement',
    event_label: formName,
    form_name: formName,
    ...additionalData
  });

  console.log('Tracked form_submit event:', formName);
};

// Track phone click events
export const trackPhoneClick = (phoneNumber: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'phone_click', {
    event_category: 'engagement',
    event_label: phoneNumber,
    phone_number: phoneNumber,
    contact_method: 'phone'
  });

  console.log('Tracked phone_click event:', phoneNumber);
};

// Track email click events
export const trackMailClick = (emailAddress: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'mail_click', {
    event_category: 'engagement',
    event_label: emailAddress,
    email_address: emailAddress,
    contact_method: 'email'
  });

  console.log('Tracked mail_click event:', emailAddress);
};

// Generic event tracking
export const trackEvent = (
  action: string, 
  category?: string, 
  label?: string, 
  value?: number,
  additionalParams?: Record<string, any>
) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category || 'engagement',
    event_label: label,
    value: value,
    ...additionalParams
  });

  console.log('Tracked custom event:', action, { category, label, value });
};