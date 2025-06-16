import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { trackFormSubmit } from "@/lib/analytics";

// Simplified form schema with only required fields
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Namn måste vara minst 2 tecken",
  }),
  email: z.string().email({
    message: "Ange en giltig e-postadress",
  }),
  phone: z.string().min(8, {
    message: "Ange ett giltigt telefonnummer",
  }),
  registrationNumber: z.string().min(6, {
    message: "Ange ett giltigt registreringsnummer",
  }),
});

// Define step types
type FormStep = 1 | 2;
type FormValues = z.infer<typeof formSchema>;

export default function QuickQuoteForm() {
  const [step, setStep] = useState<FormStep>(1);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  // Initialize the form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      registrationNumber: "",
    },
    mode: "onChange",
  });

  // Function to handle form submission
  async function onSubmit(data: FormValues) {
    setSubmitting(true);
    console.log("Form submitted with data:", data);

    try {
      // Call the API endpoint
      const response = await fetch('/api/quick-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          registrationNumber: data.registrationNumber
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Call Go high-level webhook
        try {
          const webhookResponse = await fetch('https://services.leadconnectorhq.com/hooks/CIzCoguKoPyPtO4svjnu/webhook-trigger/cfc5757e-c301-40ad-87c0-2a755a1bc9bf', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: data.name,
              email: data.email,
              phone: data.phone,
              registrationNumber: data.registrationNumber
            }),
          });
          if (!webhookResponse.ok) {
            console.error('Go high-level webhook error:', await webhookResponse.text());
          }
        } catch (webhookError) {
          console.error('Go high-level webhook error:', webhookError);
        }
        
        // Track form submission event
        trackFormSubmit('quick_quote', {
          form_location: 'quote_page',
          registration_number: data.registrationNumber
        });
        
        // Show success toast
        toast({
          title: "Offertförfrågan skickad!",
          description: "Vi kontaktar dig så snart som möjligt.",
        });
        
        // For development: Log the email preview URL
        if (result.previewUrl) {
          console.log("Email preview URL:", result.previewUrl);
        }
        
        // Move to thank you step
        setStep(2);
      } else {
        throw new Error(result.message || 'Unknown error');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Något gick fel!",
        description: "Försök igen senare eller kontakta oss direkt via telefon.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  // Form content
  const renderFormContent = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">Få en kostnadsfri värdering</h3>
        <p className="text-gray-600 mb-6">
          Fyll i uppgifterna nedan så kontaktar vi dig med ett erbjudande.
        </p>
      </div>
      
      <FormField
        control={form.control}
        name="registrationNumber"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel className="text-base">Registreringsnummer</FormLabel>
            <FormControl>
              <Input 
                placeholder="ABC123" 
                {...field} 
                className="h-12 text-base" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel className="text-base">Namn</FormLabel>
            <FormControl>
              <Input 
                placeholder="Ditt för- och efternamn" 
                {...field} 
                className="h-12 text-base" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">E-post</FormLabel>
              <FormControl>
                <Input 
                  placeholder="din@email.se" 
                  {...field} 
                  className="h-12 text-base" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Telefon</FormLabel>
              <FormControl>
                <Input 
                  placeholder="07X-XXX XX XX" 
                  {...field} 
                  className="h-12 text-base" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );

  // Thank You / Confirmation
  const renderThankYou = () => (
    <div className="text-center space-y-6 py-8 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <SendIcon className="h-10 w-10 text-primary" />
      </div>
      <h3 className="text-2xl md:text-3xl font-bold">Tack för din förfrågan!</h3>
      <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
        Vi har mottagit dina uppgifter och kommer att kontakta dig så snart som möjligt med ett värdeerbjudande.
      </p>
      <div className="pt-6">
        <p className="font-medium text-base md:text-lg">Har du brådskande frågor?</p>
        <p className="text-primary text-lg md:text-xl font-semibold mt-1">
          <a href="tel:+46736905042" className="hover:underline">
            073-690 50 42
          </a>
        </p>
      </div>
    </div>
  );

  // Submit button
  const renderButton = () => {
    if (step === 2) {
      return (
        <Button
          className="w-full h-12 text-base font-medium mt-4"
          onClick={() => setStep(1)}
        >
          Starta en ny förfrågan
        </Button>
      );
    }

    return (
      <Button
        type="button"
        onClick={form.handleSubmit(onSubmit)}
        disabled={submitting}
        className="w-full h-12 text-base font-medium mt-6"
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Skickar...
          </>
        ) : (
          "Skicka förfrågan"
        )}
      </Button>
    );
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        {step === 1 ? renderFormContent() : renderThankYou()}
        {renderButton()}
      </form>
    </Form>
  );
}