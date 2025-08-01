import { PhoneCall, Mail, ClipboardList } from "lucide-react";
import { Link } from "wouter";
import ctaImage from "@/assets/motorhome_beachside_cta.jpg";
import { trackPhoneClick, trackMailClick } from "@/lib/analytics";

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-autora-green rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-64 md:h-auto">
              <img 
                src={ctaImage} 
                alt="Husbil" 
                className="absolute w-full h-full object-cover"
              />
            </div>
            
            {/* Content Section */}
            <div className="p-8 md:p-12 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Sälja din husbil?</h2>
              <p className="mb-6 text-lg">
                Vi gör det enkelt för dig att sälja din husbil. Kontakta oss idag för en snabb och smidig affär.
              </p>
              
              <div className="mb-8">
                <div className="flex items-center mb-3">
                  <PhoneCall className="h-5 w-5 mr-2" />
                  <a 
                    href="tel:+46736905042" 
                    className="font-bold hover:underline"
                    onClick={() => trackPhoneClick('+46736905042')}
                  >
                    Ring oss: 073-690 50 42
                  </a>
                </div>
                <div className="flex items-center mb-3">
                  <Mail className="h-5 w-5 mr-2" />
                  <a 
                    href="mailto:mats105@me.com" 
                    className="font-bold hover:underline"
                    onClick={() => trackMailClick('mats105@me.com')}
                  >
                    E-post: mats105@me.com
                  </a>
                </div>
                <p className="text-sm opacity-90">
                  Öppettider: Måndag-Fredag 09:00-18:00
                </p>
              </div>
              
              <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <Link href="/quote">
                  <button className="inline-flex items-center justify-center bg-white text-autora-green font-bold py-3 px-6 rounded hover:bg-gray-100 transition-colors duration-200">
                    <ClipboardList className="h-5 w-5 mr-2" />
                    Kontakta oss nu
                  </button>
                </Link>
                
                <a 
                  href="tel:+46736905042" 
                  className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm text-white border border-white/30 font-bold py-3 px-6 rounded hover:bg-white/30 transition-colors duration-200"
                  onClick={() => trackPhoneClick('+46736905042')}
                >
                  <PhoneCall className="h-5 w-5 mr-2" />
                  Ring direkt
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* More Info Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-light p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Snabb process</h3>
            <p className="text-gray-700">
              Vi arbetar snabbt och effektivt för att ge dig ett bra erbjudande inom 24 timmar.
            </p>
          </div>
          
          <div className="bg-gray-light p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Säker affär</h3>
            <p className="text-gray-700">
              Med Husbilsköparna Syd får du en trygg och transparent affär utan dolda avgifter.
            </p>
          </div>
          
          <div className="bg-gray-light p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Kundservice</h3>
            <p className="text-gray-700">
              Vi finns alltid tillgängliga för att svara på dina frågor och ge professionell service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
