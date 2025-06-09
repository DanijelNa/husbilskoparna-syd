import Navbar from "@/components/Navbar";
import QuickQuotePage from "@/components/QuickQuote/QuickQuotePage";
import Footer from "@/components/Footer";

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <QuickQuotePage />
      <Footer />
    </div>
  );
}