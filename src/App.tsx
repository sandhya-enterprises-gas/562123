import React, { useState, useEffect } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { Language, ActivePortalTab } from './types';
import { Header } from './components/Header';
import { RateAlertBanner } from './components/RateAlertBanner';
import { Hero } from './components/Hero';
import { BrandShowcase } from './components/BrandShowcase';
import { HomeFaqAccordion } from './components/HomeFaqAccordion';
import { FaqAndRulesPage } from './components/FaqAndRulesPage';
import { ServicesSpecialties } from './components/ServicesSpecialties';
import { CustomerSegments } from './components/CustomerSegments';
import { OrderQuoteCalculator } from './components/OrderQuoteCalculator';
import { CommercialAccessories } from './components/CommercialAccessories';
import { SafetyGuide } from './components/SafetyGuide';
import { ContactAndLocation } from './components/ContactAndLocation';
import { HomePageSectionsHub, HomeSectionId } from './components/HomePageSectionsHub';
import { HomeTrustStrip } from './components/HomeTrustStrip';
import { Footer } from './components/Footer';
import { RateInquiryModal } from './components/RateInquiryModal';
import { FloatingActions } from './components/FloatingActions';
import { PortalNavigation } from './components/portal/PortalNavigation';
import { CustomerPortal } from './components/portal/CustomerPortal';
import { DistributorDesk } from './components/portal/DistributorDesk';
import { AdminCommandCenter } from './components/portal/AdminCommandCenter';
import { GmailHub } from './components/gmail/GmailHub';
import { OfficialDistributorShowcase } from './components/OfficialDistributorShowcase';
import { OfficialFAQ } from './components/OfficialFAQ';
import { PortalAccessGuard } from './components/portal/PortalAccessGuard';
import { CylinderBookingPage } from './components/CylinderBookingPage';
import { TrackOrderPage } from './components/TrackOrderPage';
import { AppSheetPage } from './components/AppSheetPage';
import { FirebaseCylinderBookingApp } from './components/FirebaseCylinderBookingApp';
import { ArrowRight, ExternalLink } from 'lucide-react';

// Helper component to handle scroll behaviors on route changes
function ScrollManager({
  setActiveHomeSection
}: {
  setActiveHomeSection: (sec: HomeSectionId) => void;
}) {
  const location = useLocation();

  useEffect(() => {
    const p = location.pathname.replace(/^\//, '');

    const sectionMap: Record<string, HomeSectionId> = {
      brands: 'brands',
      services: 'services',
      customers: 'customers',
      calculator: 'calculator',
      accessories: 'accessories',
      contact: 'contact'
    };

    if (sectionMap[p]) {
      setActiveHomeSection(sectionMap[p]);
      // Allow DOM to settle before scrolling
      setTimeout(() => {
        const el = document.getElementById('home-sections-hub');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, setActiveHomeSection]);

  return null;
}

function MainAppLayout() {
  // Default to Kannada (or stored preference)
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('sandhya_lang');
    return saved === 'en' || saved === 'kn' ? saved : 'kn';
  });

  const [activeHomeSection, setActiveHomeSection] = useState<HomeSectionId>('brands');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedBrandForModal, setSelectedBrandForModal] = useState<string | undefined>();

  const location = useLocation();
  const navigate = useNavigate();

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('sandhya_lang', newLang);
  };

  const handleOpenInquiry = (brandName?: string) => {
    setSelectedBrandForModal(brandName);
    setInquiryModalOpen(true);
  };

  const isPortalWorkspace =
    location.pathname.startsWith('/customer') ||
    location.pathname.startsWith('/distributor') ||
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/gmail');

  const getActivePortalTab = (): ActivePortalTab => {
    if (location.pathname.startsWith('/customer')) return 'customer';
    if (location.pathname.startsWith('/distributor')) return 'distributor';
    if (location.pathname.startsWith('/admin')) return 'admin';
    if (location.pathname.startsWith('/gmail')) return 'gmail';
    if (location.pathname.startsWith('/appsheet')) return 'appsheet';
    return 'website';
  };

  const activePortalTab = getActivePortalTab();

  const handleNavigatePortal = (tab: ActivePortalTab) => {
    switch (tab) {
      case 'customer':
        navigate('/customer');
        break;
      case 'distributor':
        navigate('/distributor');
        break;
      case 'admin':
        navigate('/admin');
        break;
      case 'gmail':
        navigate('/gmail');
        break;
      case 'appsheet':
        navigate('/appsheet');
        break;
      default:
        navigate('/');
    }
  };

  // Clean, modern, high-converting Home Page View
  const HomePageView = () => (
    <>
      {/* 1. Hero Section with Primary Booking Buttons */}
      <Hero lang={lang} onOpenInquiryModal={() => handleOpenInquiry()} />

      {/* 2. Core Commercial Trust Badges (100% Weight, Express Fleet, PESO, GST) */}
      <HomeTrustStrip
        lang={lang}
        onOpenCustomerPortal={() => navigate('/customer')}
        onSelectSection={(sec) => {
          navigate(`/${sec}`);
        }}
      />

      {/* 3. Prominent Cylinder Brand Cards (Bharat Gas, GoGas, Power Gas) */}
      <div id="brands" className="py-2">
        <BrandShowcase
          lang={lang}
          onOpenInquiryModal={(brandId) => handleOpenInquiry(brandId)}
        />
      </div>

      {/* 4. Collapsible FAQs & Rules Accordion (Reduces Scroll Length + Read More Link) */}
      <HomeFaqAccordion lang={lang} />
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 antialiased selection:bg-amber-500 selection:text-white">
      <ScrollManager setActiveHomeSection={setActiveHomeSection} />

      {/* Top Portal Navigation Bar (When in restricted workspaces) */}
      {isPortalWorkspace && (
        <PortalNavigation
          lang={lang}
          activeTab={activePortalTab}
          onSelectTab={handleNavigatePortal}
        />
      )}

      {/* Rate Alert Banner (On public pages) */}
      {!isPortalWorkspace && (
        <RateAlertBanner lang={lang} onOpenInquiryModal={() => handleOpenInquiry()} />
      )}

      {/* Main Sticky Header (On public pages) */}
      {!isPortalWorkspace && (
        <Header
          lang={lang}
          onLanguageChange={handleLanguageChange}
          onOpenInquiryModal={() => handleOpenInquiry()}
          activePortalTab={activePortalTab}
          onNavigatePortal={handleNavigatePortal}
          onSelectHomeSection={(sec) => {
            setActiveHomeSection(sec);
            navigate(`/${sec}`);
          }}
        />
      )}

      {/* Main Routed Content Area */}
      <main className="flex-1">
        <Routes>
          {/* ROUTE 1: Clean, modern, high-converting Home */}
          <Route path="/" element={<HomePageView />} />
          <Route path="/home" element={<HomePageView />} />

          {/* ROUTE 1B: Dedicated FAQ & Rules Tab Page */}
          <Route path="/faq" element={<FaqAndRulesPage lang={lang} />} />
          <Route path="/faq-rules" element={<FaqAndRulesPage lang={lang} />} />
          <Route path="/rules" element={<FaqAndRulesPage lang={lang} />} />

          {/* Dedicated Sub-Pages */}
          <Route
            path="/brands"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <BrandShowcase lang={lang} onOpenInquiryModal={(b) => handleOpenInquiry(b)} />
              </div>
            }
          />
          <Route
            path="/services"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ServicesSpecialties lang={lang} onOpenInquiryModal={() => handleOpenInquiry()} />
              </div>
            }
          />
          <Route
            path="/customers"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CustomerSegments lang={lang} onOpenInquiryModal={() => handleOpenInquiry()} />
              </div>
            }
          />
          <Route
            path="/calculator"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <OrderQuoteCalculator lang={lang} onOpenInquiryModal={() => handleOpenInquiry()} />
              </div>
            }
          />
          <Route
            path="/accessories"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CommercialAccessories lang={lang} onOpenInquiryModal={() => handleOpenInquiry()} />
              </div>
            }
          />
          <Route
            path="/safety"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <SafetyGuide lang={lang} />
              </div>
            }
          />
          <Route
            path="/contact"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ContactAndLocation lang={lang} />
              </div>
            }
          />

          {/* ROUTE 2: Dedicated Cylinder Booking Page */}
          <Route path="/booking" element={<CylinderBookingPage lang={lang} />} />
          <Route path="/cylinder-booking" element={<CylinderBookingPage lang={lang} />} />

          {/* ROUTE 2-FB: Dedicated Firebase Live Cylinder Booking & Auth */}
          <Route
            path="/firebase-booking"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <FirebaseCylinderBookingApp lang={lang} />
              </div>
            }
          />
          <Route
            path="/firebase"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <FirebaseCylinderBookingApp lang={lang} />
              </div>
            }
          />
          <Route
            path="/firebase-app"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <FirebaseCylinderBookingApp lang={lang} />
              </div>
            }
          />

          {/* ROUTE 2B: Dedicated AppSheet Portal Page */}
          <Route path="/appsheet" element={<AppSheetPage lang={lang} />} />
          <Route path="/appsheet-booking" element={<AppSheetPage lang={lang} />} />
          <Route path="/appsheet-form" element={<AppSheetPage lang={lang} />} />

          {/* ROUTE 3: Dedicated Track Order Page */}
          <Route path="/track-order" element={<TrackOrderPage lang={lang} />} />
          <Route path="/tracking" element={<TrackOrderPage lang={lang} />} />

          {/* ROUTE 4: Commercial Customer Portal */}
          <Route
            path="/customer"
            element={
              <PortalAccessGuard
                requiredRole="customer"
                portalTitleEn="Commercial Customer Portal"
                portalTitleKn="ವಾಣಿಜ್ಯ ಗ್ರಾಹಕರ ಪೋರ್ಟಲ್"
                portalSubtitleEn="Self-service commercial cylinder booking, passbook ledger, and digital GST receipts."
                portalSubtitleKn="ವಾಣಿಜ್ಯ ಸಿಲಿಂಡರ್ ಬುಕಿಂಗ್, ಪಾಸ್‌ಬುಕ್ ಲೆಡ್ಜರ್ ಮತ್ತು ಡಿಜಿಟಲ್ ಜಿಎಸ್‌ಟಿ ರಸೀದಿಗಳು."
                lang={lang}
                onNavigateToRole={(role) => navigate(`/${role}`)}
              >
                <CustomerPortal lang={lang} />
              </PortalAccessGuard>
            }
          />
          <Route
            path="/customer-login"
            element={<Navigate to="/customer" replace />}
          />
          <Route
            path="/login"
            element={<Navigate to="/customer" replace />}
          />

          {/* ROUTE 5: Distributor Operations & Delivery Desk */}
          <Route
            path="/distributor"
            element={
              <PortalAccessGuard
                requiredRole="distributor"
                portalTitleEn="Distributor Operations & Delivery Desk"
                portalTitleKn="ವಿತರಕರ ಕಾರ್ಯಾಚರಣೆ ಮತ್ತು ಡೆಲಿವರಿ ಡೆಸ್ಕ್"
                portalSubtitleEn="Restricted to authorized Sandhya Enterprises delivery personnel and route supervisors."
                portalSubtitleKn="ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ಅಧಿಕೃತ ಡೆಲಿವರಿ ಸಿಬ್ಬಂದಿಗೆ ಮಾತ್ರ ಸೀಮಿತ."
                lang={lang}
                onNavigateToRole={(role) => navigate(`/${role}`)}
              >
                <DistributorDesk lang={lang} />
              </PortalAccessGuard>
            }
          />
          <Route
            path="/delivery-partner"
            element={<Navigate to="/distributor" replace />}
          />
          <Route
            path="/distributor-desk"
            element={<Navigate to="/distributor" replace />}
          />

          {/* ROUTE 6: Executive Admin Command Center */}
          <Route
            path="/admin"
            element={
              <PortalAccessGuard
                requiredRole="admin"
                portalTitleEn="Executive Management Command Center"
                portalTitleKn="ಆಡಳಿತ ಮಂಡಳಿ ಕಮಾಂಡ್ ಸೆಂಟರ್"
                portalSubtitleEn="Master control for cylinder pricing, ledger balance audits, staff allocations, and official correspondence."
                portalSubtitleKn="ಸಿಲಿಂಡರ್ ದರ ಪರಿಷ್ಕರಣೆ, ಲೆಡ್ಜರ್ ಆಡಿಟ್ ಮತ್ತು ಅಧಿಕೃತ ವ್ಯವಹಾರಗಳ ಮಾಸ್ಟರ್ ನಿಯಂತ್ರಣ."
                lang={lang}
                onNavigateToRole={(role) => navigate(`/${role}`)}
              >
                <AdminCommandCenter lang={lang} />
              </PortalAccessGuard>
            }
          />
          <Route
            path="/admin-portal"
            element={<Navigate to="/admin" replace />}
          />

          {/* ROUTE 7: Official Gmail Communications Desk */}
          <Route
            path="/gmail"
            element={
              <PortalAccessGuard
                requiredRole="admin"
                portalTitleEn="Official Gmail Communications Desk"
                portalTitleKn="ಅಧಿಕೃತ ಜಿಮೇಲ್ ಸಂವಹನ ಡೆಸ್ಕ್"
                portalSubtitleEn="Dispatches from official email address works.with.sandhya.enterprises@gmail.com"
                portalSubtitleKn="ಅಧಿಕೃತ works.with.sandhya.enterprises@gmail.com ಇಮೇಲ್ ಸಂವಹನ."
                lang={lang}
                onNavigateToRole={(role) => navigate(`/${role}`)}
              >
                <GmailHub lang={lang} />
              </PortalAccessGuard>
            }
          />
          <Route
            path="/mail"
            element={<Navigate to="/gmail" replace />}
          />

          {/* Catch-all: Redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Official Global Footer */}
      <Footer lang={lang} onOpenInquiryModal={() => handleOpenInquiry()} />

      {/* Floating Action Buttons (WhatsApp & Call) */}
      <FloatingActions lang={lang} onOpenInquiryModal={() => handleOpenInquiry()} />

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

export default function App() {
  return (
    <HashRouter>
      <MainAppLayout />
    </HashRouter>
  );
}
