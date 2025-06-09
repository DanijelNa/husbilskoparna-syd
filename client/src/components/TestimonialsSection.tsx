import { Star } from "lucide-react";
import { Link } from "wouter";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Import testimonial images
import hakanPetterssonImg from "@/assets/testimonials/Håkan Pettersson.jpg";
import mariaHagbergImg from "@/assets/testimonials/Maria Hagberg.jpg";
import patrikJonassonImg from "@/assets/testimonials/Patrik Jonasson.jpg";
import pontusStrandbergImg from "@/assets/testimonials/Pontus Strandberg.jpg";

export default function TestimonialsSection() {
  const testimonials = [
    {
      content: "Sålde vår \"plåtis\". De löste ut leasingen och jag fick mellanskillnaden inbetalt på kontot samma dag.",
      author: "Håkan Pettersson",
      image: hakanPetterssonImg
    },
    {
      content: "Mycket nöjd över hur affären gick till. Vi sålde vår fuktskadade husbil till ett pris vi vart nöjda med.",
      author: "Maria Hagberg",
      image: mariaHagbergImg
    },
    {
      content: "Sålde bort vår \"plåtis\" redan samma dag. Nöjd över hur smidigt allting gjort. Seriöst!",
      author: "Patrik Jonasson",
      image: patrikJonassonImg
    },
    {
      content: "De kom och hämtade bilen samma dag. Helt problemfritt",
      author: "Pontus Strandberg",
      image: pontusStrandbergImg
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Vad våra kunder säger</h2>
          <p className="mx-auto max-w-2xl text-gray-700 text-lg">
            Läs vad våra nöjda kunder säger om att sälja sin husbil till Husbilsköparna Syd.
          </p>
        </div>
        
        <div className="relative px-4 md:px-16">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                    <div className="relative h-56 md:h-72 w-full">
                      <img 
                        src={testimonial.image} 
                        alt={`${testimonial.author}'s motorhome`} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center mb-4">
                        <div className="flex text-autora-green">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-current" />
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4 flex-grow">
                        <p className="text-gray-700 text-lg">
                          "{testimonial.content}"
                        </p>
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <h4 className="font-bold text-lg">{testimonial.author}</h4>
                        <p className="text-sm text-autora-green">Nöjd kund</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 h-12 w-12 bg-white hover:bg-gray-100 border-2 border-autora-green shadow-md" />
            <CarouselNext className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 h-12 w-12 bg-white hover:bg-gray-100 border-2 border-autora-green shadow-md" />
          </Carousel>
        </div>
        
        <div className="mt-12 text-center">
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
