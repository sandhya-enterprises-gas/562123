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
import { PortalNavigation } from './components/portal/PortalNavigation';
import { CustomerPortal } from './components/portal/CustomerPortal';
import { DistributorDesk } from './components/portal/DistributorDesk';
import { AdminCommandCenter } from './components/portal/AdminCommandCenter';
import { GmailHub } from './components/gmail/GmailHub';
import { OfficialCustomerShowcase } from './components/OfficialCustomerShowcase';
import { OfficialDistributorShowcase } from './components/OfficialDistributorShowcase';
import { OfficialFAQ } from './components/OfficialFAQ';
import { PortalAccessGuard } from './components/portal/PortalAccessGuard';

export default function App() {
  // Default to Kannada (or stored preference)
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('sandhya_lang');
    return (saved === 'en' || saved === 'kn') ? saved : 'kn';
  });

  const [activePortalTab, setActivePortalTab] = useState<ActivePortalTab>('website');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
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
          <PortalAccessGuard
            requiredRole="customer"
            portalTitleEn="Commercial Customer Portal"
            portalTitleKn="ವಾಣಿಜ್ಯ ಗ್ರಾಹಕರ ಪೋರ್ಟಲ್"
            portalSubtitleEn="Self-service commercial cylinder booking, passbook ledger, and digital GST receipts."
            portalSubtitleKn="ವಾಣಿಜ್ಯ ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್, ಪಾಸ್‌ಬುಕ್ ಲೆಡ್ಜರ್ ಮತ್ತು ಡಿಜಿಟಲ್ ಜಿಎಸ್‌ಟಿ ರಸೀದಿಗಳು."
            lang={lang}
            onNavigateToRole={(role) => setActivePortalTab(role as ActivePortalTab)}
          >
            <CustomerPortal lang={lang} />
          </PortalAccessGuard>
        )}

        {/* VIEW 3: Distributor Dispatch & Delivery Desk */}
        {activePortalTab === 'distributor' && (
          <PortalAccessGuard
            requiredRole="distributor"
            portalTitleEn="Distributor Operations & Delivery Desk"
            portalTitleKn="ವಿತರಕರ ಕಾರ್ಯಾಚರಣೆ ಮತ್ತು ಡೆಲಿವರಿ ಡೆಸ್ಕ್"
            portalSubtitleEn="Restricted to authorized Sandhya Enterprises delivery personnel and route supervisors."
            portalSubtitleKn="ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ಅಧಿಕೃತ ಡೆಲಿವರಿ ಸಿಬ್ಬಂದಿಗೆ ಮಾತ್ರ ಸೀಮಿತ."
            lang={lang}
            onNavigateToRole={(role) => setActivePortalTab(role as ActivePortalTab)}
          >
            <DistributorDesk lang={lang} />
          </PortalAccessGuard>
        )}

        {/* VIEW 4: Admin Command Center & Change Audit */}
        {activePortalTab === 'admin' && (
          <PortalAccessGuard
            requiredRole="admin"
            portalTitleEn="Executive Management Command Center"
            portalTitleKn="ಆಡಳಿತ ಮಂಡಳಿ ಕಮಾಂಡ್ ಸೆಂಟರ್"
            portalSubtitleEn="Master control for cylinder pricing, ledger balance audits, staff allocations, and official correspondence."
            portalSubtitleKn="ಸಿಲಿಂಡರ್ ದರ ಪರಿಷ್ಕರಣೆ, ಲೆಡ್ಜರ್ ಆಡಿಟ್ ಮತ್ತು ಅಧಿಕೃತ ವ್ಯವಹಾರಗಳ ಮಾಸ್ಟರ್ ನಿಯಂತ್ರಣ."
            lang={lang}
            onNavigateToRole={(role) => setActivePortalTab(role as ActivePortalTab)}
          >
            <AdminCommandCenter lang={lang} />
          </PortalAccessGuard>
        )}

        {/* VIEW 5: Official Gmail Communications & Invoicing Desk */}
        {activePortalTab === 'gmail' && (
          <PortalAccessGuard
            requiredRole="admin"
            portalTitleEn="Official Gmail Communications Desk"
            portalTitleKn="ಅಧಿಕೃತ ಜಿಮೇಲ್ ಸಂವಹನ ಡೆಸ್ಕ್"
            portalSubtitleEn="Dispatches from official email address works.with.sandhya.enterprises@gmail.com"
            portalSubtitleKn="ಅಧಿಕೃತ works.with.sandhya.enterprises@gmail.com ಇಮೇಲ್ ಸಂವಹನ."
            lang={lang}
            onNavigateToRole={(role) => setActivePortalTab(role as ActivePortalTab)}
          >
            <GmailHub lang={lang} />
          </PortalAccessGuard>
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
      />

      {/* Live Rate & Quote Modal */}
      <RateInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        lang={lang}
        initialBrand={selectedBrandForModal}
      />
    </div>
  );
}

