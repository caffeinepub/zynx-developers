import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { InquiryForm } from "./components/InquiryForm";
import { Navbar } from "./components/Navbar";
import { PricingSection } from "./components/PricingSection";
import { SmallBusinessSection } from "./components/SmallBusinessSection";
import { AdminPanel } from "./pages/AdminPanel";

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setTimeout(() => {
      document
        .getElementById("inquiry")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  if (showAdmin) {
    return (
      <>
        <AdminPanel onBack={() => setShowAdmin(false)} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <Navbar onAdminClick={() => setShowAdmin(true)} />
      <main>
        <HeroSection />
        <PricingSection onSelectPlan={handleSelectPlan} />
        <SmallBusinessSection />
        <InquiryForm selectedPlan={selectedPlan} />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
