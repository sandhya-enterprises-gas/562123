import React, { useState, useEffect } from 'react';
import { Language, ActivePortalTab } from './types';
import { Header } from './components/Header';
import { RateAlertBanner } from './components/RateAlertBanner';
import { Hero } from './components/Hero';
import { BrandShowcase } from './components/BrandShowcase';
import { CustomerSegments } from './components/CustomerSegments';
import { ServicesSpecialties } from './components/ServicesSpecialties';
import { OrderQuoteCalculator } from './components/OrderQuoteCalculator';
import { CommercialAccessories } from './components/CommercialAccessories';
import { SafetyGuide } from './components/SafetyGuide';
import { ContactAndLocation } from './components/ContactAndLocation';
import { GoogleMapsLocator } from './components/GoogleMapsLocator';
import { Footer } from './components/Footer';
import { RateInquiryModal } from './components/RateInquiryModal';
import { FloatingActions } from './components/FloatingActions';
import { SandhyaAiAdvisorModal } from './components/SandhyaAiAdvisorModal';
import { PortalNavigation } from './components/portal/PortalNavigation';
import { CustomerPortal } from './components/portal/CustomerPortal';
import { DistributorDesk } from './components/portal/DistributorDesk';
import { AdminCommandCenter } from './components/portal/AdminCommandCenter';
import { GmailHub } from './components/gmail/GmailHub';
import { OfficialCustomerShowcase } from './components/OfficialCustomerShowcase';
import { OfficialDistributorShowcase } from './components/OfficialDistributorShowcase';
import { OfficialFAQ } from './components/OfficialFAQ';

export default function App() {
  // Default to Kannada (or stored preference)
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('sandhya_lang');
    return (saved === 'en' || saved === 'kn') ? saved : 'kn';
  });

  const [activePortalTab, setActivePortalTab] = useState<ActivePortalTab>('website');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [aiAdvisorModalOpen, setAiAdvisorModalOpen] = useState(false);
  const [selectedBrandForModal, setSelectedBrandForModal] = useState<string | undefined>();

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('sandhya_lang', newLang);
  };

  const handleOpenInquiry = (brandName?: string) => {
    setSelectedBrandForModal(brandName);
    setInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 antialiased selection:bg-amber-500 selection:text-white">
      {/* Universal Multi-Portal Navigation Bar */}
      <PortalNavigation
        lang={lang}
        activeTab={activePortalTab}
        onSelectTab={setActivePortalTab}
      />

      {/* Rate Alert Notification Banner at Top (Visible on public portal) */}
      {activePortalTab === 'website' && (
        <RateAlertBanner
          lang={lang}
          onOpenInquiryModal={() => handleOpenInquiry()}
        />
      )}

      {/* Main Sticky Header */}
      <Header
        lang={lang}
        onLanguageChange={handleLanguageChange}
        onOpenInquiryModal={() => handleOpenInquiry()}
        onOpenAiAdvisor={() => setAiAdvisorModalOpen(true)}
        activePortalTab={activePortalTab}
        onNavigatePortal={setActivePortalTab}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* VIEW 1: Public Website Portal */}
        {activePortalTab === 'website' && (
          <>
            {/* Hero Section */}
            <Hero
              lang={lang}
              onOpenInquiryModal={() => handleOpenInquiry()}
            />

            {/* Major Brands Portfolio (Bharat Gas, Go Gas, Power Gas) */}
            <BrandShowcase
              lang={lang}
              onOpenInquiryModal={(brandId) => handleOpenInquiry(brandId)}
            />

            {/* Official Pillar 1: FOR CUSTOMERS (ಗ್ರಾಹಕರಿಗೆ - ತಕ್ಷಣದ ಕನೆಕ್ಷನ್, 100% ತೂಕ, GoGas Elite) */}
            <OfficialCustomerShowcase
              lang={lang}
              onOpenCustomerPortal={() => setActivePortalTab('customer')}
            />

            {/* Official Pillar 2: FOR DISTRIBUTORS & DELIVERY PARTNERS (ಡಿಸ್ಟ್ರಿಬ್ಯೂಟರ್ಸ್ ಮತ್ತು ಡೆಲಿವರಿ ಪಾರ್ಟ್ನೆರ್ಗೆ) */}
            <OfficialDistributorShowcase
              lang={lang}
              onOpenDistributorDesk={() => setActivePortalTab('distributor')}
            />

            {/* Who We Serve / Customer Verticals (Hotels, Dhabas, Kalyana Mantapa, Factories) */}
            <CustomerSegments
              lang={lang}
              onOpenInquiryModal={() => handleOpenInquiry()}
            />

            {/* Our Special Services & Pipeline Installation */}
            <ServicesSpecialties
              lang={lang}
              onOpenInquiryModal={() => handleOpenInquiry()}
            />

            {/* Interactive Order & Quote Calculator */}
            <OrderQuoteCalculator
              lang={lang}
            />

            {/* Commercial Kitchen Accessories & Equipment */}
            <CommercialAccessories
              lang={lang}
              onOpenInquiryModal={() => handleOpenInquiry()}
            />

            {/* 24/7 Safety Protocols & FAQs */}
            <SafetyGuide
              lang={lang}
            />

            {/* Live Google Maps Platform Depot Locator */}
            <GoogleMapsLocator
              lang={lang}
            />

            {/* Official Contact, Social Profiles & Location Hub */}
            <ContactAndLocation
              lang={lang}
            />

            {/* Official FAQ Component (Delivery Timelines, Payment Terms, Installation, Security) */}
            <OfficialFAQ
              lang={lang}
            />
          </>
        )}

        {/* VIEW 2: Commercial Customer Portal */}
        {activePortalTab === 'customer' && (
          <CustomerPortal lang={lang} />
        )}

        {/* VIEW 3: Distributor Dispatch & Delivery Desk */}
        {activePortalTab === 'distributor' && (
          <DistributorDesk lang={lang} />
        )}

        {/* VIEW 4: Admin Command Center & Change Audit */}
        {activePortalTab === 'admin' && (
          <AdminCommandCenter lang={lang} />
        )}

        {/* VIEW 5: Official Gmail Communications & Invoicing Desk */}
        {activePortalTab === 'gmail' && (
          <GmailHub lang={lang} />
        )}
      </main>

      {/* Official Footer */}
      <Footer
        lang={lang}
        onOpenInquiryModal={() => handleOpenInquiry()}
      />

      {/* Floating Action Buttons (WhatsApp & Call) */}
      <FloatingActions
        lang={lang}
        onOpenInquiryModal={() => handleOpenInquiry()}
        onOpenAiAdvisor={() => setAiAdvisorModalOpen(true)}
      />

      {/* Live Rate & Quote Modal */}
      <RateInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        lang={lang}
        initialBrand={selectedBrandForModal}
      />

      {/* Official Sandhya AI Advisor Modal (Powered by Gemini 3.5 & Google Search Grounding) */}
      <SandhyaAiAdvisorModal
        isOpen={aiAdvisorModalOpen}
        onClose={() => setAiAdvisorModalOpen(false)}
        lang={lang}
        onOpenOrderModal={() => handleOpenInquiry()}
      />
    </div>
  );
}

