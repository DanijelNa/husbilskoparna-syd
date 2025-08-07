import { Mail, Phone } from "lucide-react";
import { Link } from "wouter";
import husbilskoparnaLogoWhite from "@/assets/husbilskoparna-logo-white.png";
import ucCreditBadge from "@/assets/uc-credit-badge.png";
import { trackPhoneClick, trackMailClick } from "@/lib/analytics";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <img 
                src={husbilskoparnaLogoWhite} 
                alt="Husbilsköparna Syd" 
                className="h-10"
              />
            </div>
            <p className="text-gray-300 mb-4">
              Husbilsköparna Syd köper och säljer husbilar över hela Sverige. Kontakta oss idag för en snabb och smidig affär.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white">Hem</Link></li>
              <li><Link href="/quote" className="text-gray-300 hover:text-white">Kontakta oss</Link></li>
              <li><Link href="/integritetspolicy" className="text-gray-300 hover:text-white">Integritetspolicy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Kontakta oss</h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-autora-green" />
                <a 
                  href="tel:+46736905042" 
                  className="text-gray-300 hover:text-white"
                  onClick={() => trackPhoneClick('+46736905042')}
                >
                  073-690 50 42
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-autora-green" />
                <a 
                  href="mailto:mats105@me.com" 
                  className="text-gray-300 hover:text-white"
                  onClick={() => trackMailClick('mats105@me.com')}
                >
                  mats105@me.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Credit rating badge */}
        <div className="border-t border-gray-800 pt-8 pb-6 flex flex-col items-center">
          <p className="text-gray-300 text-sm mb-2">Högsta kreditvärdighet enligt UC</p>
          <img 
            src={ucCreditBadge} 
            alt="Högsta Kreditvärdighet UC" 
            className="h-20 mb-6"
            title="Husbilsköparna Syd har högsta kreditvärdighet enligt UC"
          />
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} Husbilsköparna Syd. Alla rättigheter förbehållna.</p>
          <div className="flex space-x-6 text-sm">
            <Link href="/integritetspolicy" className="text-gray-400 hover:text-white">Integritetspolicy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
