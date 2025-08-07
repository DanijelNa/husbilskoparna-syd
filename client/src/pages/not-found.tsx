import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, Phone, Mail } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-lg mx-4">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <AlertCircle className="h-16 w-16 text-autora-green" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sidan hittades inte</h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Den sida du letar efter finns inte eller har flyttats.
          </p>

          <div className="space-y-4 mb-8">
            <Link href="/">
              <Button className="w-full bg-autora-green hover:bg-autora-green/90 text-white">
                <Home className="h-4 w-4 mr-2" />
                Tillbaka till startsidan
              </Button>
            </Link>
            
            <Link href="/quote">
              <Button variant="outline" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Kontakta oss för offert
              </Button>
            </Link>
          </div>

          <div className="text-sm text-gray-500 space-y-2">
            <p><strong>Behöver du hjälp?</strong></p>
            <p>Ring oss på <a href="tel:+46736905042" className="text-autora-green font-semibold">073-690 50 42</a></p>
            <p>eller maila till <a href="mailto:mats105@me.com" className="text-autora-green font-semibold">mats105@me.com</a></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
