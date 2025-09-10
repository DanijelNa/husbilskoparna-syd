import { useState } from "react";
import { Link } from "wouter";
import { X, Menu, Phone, ClipboardList } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import husbilskoparnaLogo from "@/assets/husbilskoparna-logo-black.png";
import { trackPhoneClick } from "@/lib/analytics";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <img 
                src={husbilskoparnaLogo} 
                alt="Husbilsköparna Syd" 
                className="h-10"
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/blog" 
              className="text-gray-700 hover:text-[#49B265] font-medium transition-colors"
            >
              Blogg
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/quote">
              <button className="bg-autora-green hover:bg-autora-green/90 text-white py-2 px-4 rounded-md flex items-center font-medium">
                <ClipboardList className="h-4 w-4 mr-2" />
                Kontakta oss för en smidig affär
              </button>
            </Link>
            <a 
              href="tel:+46736905042" 
              className="flex items-center text-autora-green font-bold"
              onClick={() => trackPhoneClick('+46736905042')}
            >
              <Phone className="h-5 w-5 mr-2" />
              <span>RING NU</span>
            </a>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden text-black">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <Link href="/">
                    <img 
                      src={husbilskoparnaLogo} 
                      alt="Husbilsköparna Syd" 
                      className="h-8"
                    />
                  </Link>
                </div>
                <nav className="flex flex-col space-y-4">
                  <SheetClose asChild>
                    <Link 
                      href="/blog" 
                      className="text-gray-700 hover:text-[#49B265] font-medium py-2 transition-colors"
                    >
                      Blogg
                    </Link>
                  </SheetClose>
                  <div className="border-t border-gray-200 pt-4 mt-2"></div>
                  <SheetClose asChild>
                    <Link href="/quote" className="flex items-center justify-center bg-autora-green text-white py-3 px-4 rounded-md mb-2">
                      <ClipboardList className="h-4 w-4 mr-2" />
                      Kontakta oss för en smidig affär
                    </Link>
                  </SheetClose>
                </nav>
                <div className="mt-8">
                  <SheetClose asChild>
                    <a 
                      href="tel:+46736905042" 
                      className="flex items-center text-autora-green font-bold"
                      onClick={() => trackPhoneClick('+46736905042')}
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      <span>RING NU</span>
                    </a>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
