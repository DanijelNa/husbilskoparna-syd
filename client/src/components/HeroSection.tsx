import { Link } from "wouter";
import heroImage from "@/assets/motorhome_hero_image.jpg";
import { ClipboardList, PhoneCall } from "lucide-react";
import { trackPhoneClick } from "@/lib/analytics";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Banner - Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Vi köper <span className="text-autora-green">husbilar</span> i hela Sverige
            </h1>
            <p className="text-lg mb-8">
              Husbilsköparna Syd erbjuder er en smidig och säker process när ni vill sälja er husbil. 
              Vi köper alla typer av husbilar, oavsett årsmodell, märke eller skick.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/quote">
                <button className="autora-btn-primary flex items-center justify-center">
                  <ClipboardList className="h-5 w-5 mr-2" />
                  Få en snabb värdering
                </button>
              </Link>
              <a 
                href="tel:+46736905042" 
                className="autora-btn-secondary flex items-center justify-center"
                onClick={() => trackPhoneClick('+46736905042')}
              >
                <PhoneCall className="h-5 w-5 mr-2" />
                RING NU
              </a>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center space-x-4 mt-6">
              <div className="flex items-center text-sm font-medium">
                <svg className="w-5 h-5 text-autora-green mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Snabb process</span>
              </div>
              <div className="flex items-center text-sm font-medium">
                <svg className="w-5 h-5 text-autora-green mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Säker betalning</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={heroImage} 
              alt="Husbil" 
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
        
        {/* Services Section */}
        <div className="mt-16 md:mt-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Våra tjänster
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="autora-card p-6">
              <div className="bg-autora-green text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">
                Vi köper husbilar i hela Sverige
              </h3>
              <p className="text-gray-700 mb-4">
                Vi erbjuder ett enkelt och tryggt sätt att sälja er husbil. Direktbetalning utan mellanhänder.
              </p>
              <Link href="/quote">
                <button className="text-autora-green font-medium inline-flex items-center">
                  Få en värdering
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </Link>
            </div>
            
            {/* Service Card 2 */}
            <div className="autora-card p-6">
              <div className="bg-autora-green text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Garanti & försäkring</h3>
              <p className="text-gray-700 mb-4">
                Vi erbjuder förmånliga garantier och försäkringar för alla husbilar vi säljer.
              </p>
              <Link href="/quote">
                <button className="text-autora-green font-medium inline-flex items-center">
                  Få en värdering
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </Link>
            </div>
            
            {/* Service Card 3 */}
            <div className="autora-card p-6">
              <div className="bg-autora-green text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Kostnadsfri värdering</h3>
              <p className="text-gray-700 mb-4">
                Vi erbjuder en kostnadsfri värdering av er husbil. Kontakta oss redan idag.
              </p>
              <Link href="/quote">
                <button className="text-autora-green font-medium inline-flex items-center">
                  Få en värdering
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
