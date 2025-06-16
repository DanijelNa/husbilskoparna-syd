import { CheckCircle, PhoneCall, Truck } from "lucide-react";
import { Link } from "wouter";
import ucCreditBadge from "@/assets/uc-credit-badge.png";

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hur det fungerar</h2>
          <p className="mx-auto max-w-2xl text-gray-700 text-lg">
            Vi har gjort processen enkel och smidig för dig som vill sälja din husbil.
            Här ser du hur du kommer igång.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-autora-green flex items-center justify-center mb-5 text-white">
              <PhoneCall className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">1. Kontakta oss</h3>
            <p className="text-gray-700 mb-4">
              Ring, mejla eller fyll i vårt formulär för att beskriva din husbil. Vi återkommer snabbt.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-autora-green flex items-center justify-center mb-5 text-white">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">2. Inga förpliktelser</h3>
            <p className="text-gray-700 mb-4">
              Vi kommer till er utan några förpliktelser helt kostnadsfritt.
              Vi går igenom husbilen kommer vi överens så köper vi husbilen i befintligt skick.
              Inga klagomål eller efter krav från vår sida.
              Enklare och tryggare kan det inte bli.
              <br /><br />
              Vårt moto är att kunden ska känna sig trygg igenom hela affären.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-autora-green flex items-center justify-center mb-5 text-white">
              <Truck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">3. Säker försäljning</h3>
            <p className="text-gray-700 mb-4">
              Om du accepterar erbjudandet sköter vi all pappershantering och betalar direkt via banköverföring.
            </p>
          </div>
        </div>
        
        {/* Trust Badge */}
        <div className="mt-12 mb-8 flex flex-col items-center justify-center">
          <div className="mb-4 text-center">
            <h3 className="text-xl font-bold">Certifierad kreditvärdighet</h3>
            <p className="text-gray-700 mt-1">Vi är stolta över att ha högsta kreditvärdighet från UC</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm inline-block">
            <img 
              src={ucCreditBadge} 
              alt="Högsta Kreditvärdighet UC" 
              className="h-32"
              title="Husbilsköparna Syd har högsta kreditvärdighet enligt UC"
            />
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-8 text-center">
          <Link href="/quote">
            <button className="autora-btn-primary inline-block">
              Kontakta oss idag
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
