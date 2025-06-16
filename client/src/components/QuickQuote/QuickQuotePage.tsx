import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import QuickQuoteForm from "./QuickQuoteForm";

export default function QuickQuotePage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[80vh] bg-gray-50 py-12 md:py-16">
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

        <div className="space-y-6 text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">Kontakta oss nu</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ange registreringsnummer och dina kontaktuppgifter nedan för att få en kostnadsfri värdering. 
            Vi återkommer med ett erbjudande inom 24 timmar.
          </p>
        </div>

        <div className="bg-white border rounded-lg shadow-lg p-8 md:p-10 max-w-2xl mx-auto">
          <QuickQuoteForm />
        </div>
      </div>
    </div>
  );
}