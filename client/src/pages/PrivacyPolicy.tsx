import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tillbaka till startsidan
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Integritetspolicy</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Senast uppdaterad:</strong> {new Date().toLocaleDateString('sv-SE')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-autora-green">1. Allmän information</h2>
              <p className="mb-4">
                Husbilsköparna Syd ("vi", "oss", "vår") respekterar din integritet och är engagerade i att skydda dina personuppgifter. 
                Denna integritetspolicy förklarar hur vi samlar in, använder och skyddar din information när du besöker vår webbplats 
                eller använder våra tjänster.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-autora-green">2. Personuppgiftsansvarig</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Husbilsköparna Syd</strong></p>
                <p>E-post: info@husbilskoparna.se</p>
                <p>Telefon: 073-690 50 42</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-autora-green">3. Vilka personuppgifter samlar vi in?</h2>
              <p className="mb-4">Vi kan samla in följande typer av personuppgifter:</p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Kontaktuppgifter:</strong> Namn, e-postadress, telefonnummer</li>
                <li><strong>Fordonsuppgifter:</strong> Registreringsnummer och information om din husbil</li>
                <li><strong>Teknisk information:</strong> IP-adress, webbläsartyp, besökstid</li>
                <li><strong>Kommunikation:</strong> Meddelanden och korrespondens med oss</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-autora-green">4. Hur använder vi dina personuppgifter?</h2>
              <p className="mb-4">Vi använder dina personuppgifter för följande ändamål:</p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Att ge dig värderingar och erbjudanden för din husbil</li>
                <li>Att kommunicera med dig angående våra tjänster</li>
                <li>Att genomföra köp- och säljprocesser</li>
                <li>Att förbättra vår webbplats och våra tjänster</li>
                <li>Att uppfylla rättsliga förpliktelser</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-autora-green">5. Rättslig grund för behandling</h2>
              <p className="mb-4">Vi behandlar dina personuppgifter baserat på:</p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Samtycke:</strong> När du frivilligt lämnar uppgifter via våra formulär</li>
                <li><strong>Avtal:</strong> För att fullfölja våra tjänster och avtal</li>
                <li><strong>Berättigat intresse:</strong> För att förbättra våra tjänster och kommunikation</li>
                <li><strong>Rättslig förpliktelse:</strong> När lagen kräver det</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-autora-green">6. Delning av personuppgifter</h2>
              <p className="mb-4">
                Vi säljer, uthyr eller delar inte dina personuppgifter med tredje parter för marknadsföringsändamål. 
                Vi kan dela uppgifter med:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Myndigheter när det krävs enligt lag</li>
                <li>Våra betrodda leverantörer som hjälper oss leverera våra tjänster</li>
                <li>Juridiska rådgivare när det är nödvändigt</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-autora-green">7. Lagring av personuppgifter</h2>
              <p className="mb-4">
                Vi lagrar dina personuppgifter endast så länge det är nödvändigt för de ändamål som beskrivs i denna policy. 
                Som regel lagrar vi:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Kontaktuppgifter: 2 år efter senaste kontakt</li>
                <li>Transaktionsdata: 7 år enligt bokföringslagen</li>
                <li>Webbplatsdata: 13 månader</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-autora-green">8. Dina rättigheter</h2>
              <p className="mb-4">Enligt GDPR har du följande rättigheter:</p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Rätt till information:</strong> Få information om hur vi behandlar dina uppgifter</li>
                <li><strong>Rätt till tillgång:</strong> Begära en kopia av dina personuppgifter</li>
                <li><strong>Rätt till rättelse:</strong> Korrigera felaktiga uppgifter</li>
                <li><strong>Rätt till radering:</strong> Begära att vi raderar dina uppgifter</li>
                <li><strong>Rätt till begränsning:</strong> Begränsa behandlingen av dina uppgifter</li>
                <li><strong>Rätt till dataportabilitet:</strong> Få dina uppgifter i ett strukturerat format</li>
                <li><strong>Rätt att invända:</strong> Invända mot vår behandling av dina uppgifter</li>
              </ul>
              <p className="mb-4">
                För att utöva dina rättigheter, kontakta oss på info@husbilskoparna.se
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-autora-green">9. Säkerhet</h2>
              <p className="mb-4">
                Vi vidtar lämpliga tekniska och organisatoriska säkerhetsåtgärder för att skydda dina personuppgifter 
                mot obehörig åtkomst, förlust, förstöring eller ändring. Detta inkluderar:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Kryptering av känslig data</li>
                <li>Säkra servrar och nätverk</li>
                <li>Begränsad åtkomst till personuppgifter</li>
                <li>Regelbundna säkerhetsuppdateringar</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-autora-green">10. Cookies och spårning</h2>
              <p className="mb-4">
                Vår webbplats kan använda cookies för att förbättra användarupplevelsen. Cookies är små textfiler 
                som lagras på din enhet. Du kan hantera cookie-inställningar i din webbläsare.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-autora-green">11. Ändringar av integritetspolicyn</h2>
              <p className="mb-4">
                Vi kan uppdatera denna integritetspolicy från tid till annan. Väsentliga ändringar kommer att meddelas 
                på vår webbplats. Vi rekommenderar att du regelbundet granskar denna policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-autora-green">12. Kontakt</h2>
              <p className="mb-4">
                Om du har frågor om denna integritetspolicy eller hur vi behandlar dina personuppgifter, 
                kontakta oss gärna:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>E-post:</strong> info@husbilskoparna.se</p>
                <p><strong>Telefon:</strong> 073-690 50 42</p>
              </div>
              <p className="mt-4">
                Du har också rätt att lämna in ett klagomål till Integritetsskyddsmyndigheten (IMY) om du anser 
                att vi behandlar dina personuppgifter på ett felaktigt sätt.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}