import { ThumbsUp, Award, TrendingUp } from "lucide-react";

export default function ProductShowcase() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Fördelar med Husbilsköparna Syd</h2>
          <p className="mx-auto max-w-2xl text-gray-700 text-lg">
            Vi erbjuder en rad fördelar när ni väljer att sälja er husbil till oss.
            Se nedan varför våra kunder väljer Husbilsköparna Syd.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Advantage 1 */}
          <div className="autora-card p-8 flex flex-col items-center text-center">
            <div className="bg-autora-green text-white w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <ThumbsUp className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Enkel process</h3>
            <p className="text-gray-700">
              Vi gör säljprocessen så enkel som möjligt för er. Från första kontakt till avslutad affär tar det oftast bara några dagar.
            </p>
          </div>
          
          {/* Advantage 2 */}
          <div className="autora-card p-8 flex flex-col items-center text-center">
            <div className="bg-autora-green text-white w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Award className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Bra betalt</h3>
            <p className="text-gray-700">
              Vi erbjuder marknadsmässiga priser för er husbil och betalar direkt via banköverföring när affären är klar.
            </p>
          </div>
          
          {/* Advantage 3 */}
          <div className="autora-card p-8 flex flex-col items-center text-center">
            <div className="bg-autora-green text-white w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Trygg affär</h3>
            <p className="text-gray-700">
              Vi har lång erfarenhet av husbilsmarknaden och erbjuder en säker affär med tydliga villkor och öppen kommunikation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
