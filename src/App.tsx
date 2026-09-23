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
      default:
        navigate('/');
    }
  };

  // Common Public Home Page View
  const HomePageView = () => (
    <>
      {/* Hero Section */}
      <Hero lang={lang} onOpenInquiryModal={() => handleOpenInquiry()} />

      {/* Core Commercial Trust Strip (100% Weight, Express Fleet, PESO, GST) */}
      <HomeTrustStrip
        lang={lang}
        onOpenCustomerPortal={() => navigate('/customer')}
        onSelectSection={(sec) => {
          setActiveHomeSection(sec);
          navigate(`/${sec}`);
        }}
      />

      {/* Official Distributor & Delivery Partner Banner */}
      <OfficialDistributorShowcase
        lang={lang}
        onOpenDistributorDesk={() => navigate('/distributor')}
      />

      {/* Main Interactive Sections Hub (PAGES: Brands, Services, Customers, Booking & Rate, Accessories, Agency Location) */}
      <div id="home-sections-hub">
        <HomePageSectionsHub
          lang={lang}
          activeSection={activeHomeSection}
          onSelectSection={(sec) => {
            setActiveHomeSection(sec);
            navigate(`/${sec}`);
          }}
          onOpenInquiryModal={(brandId) => handleOpenInquiry(brandId)}
          onOpenCustomerPortal={() => navigate('/customer')}
        />
      </div>

      {/* Official FAQ Component (Delivery Timelines, Payment Terms, Installation, Security) */}
      <OfficialFAQ lang={lang} />
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
          {/* ROUTE 1: Home and Deep Sections */}
          <Route path="/" element={<HomePageView />} />
          <Route path="/home" element={<HomePageView />} />
          <Route path="/brands" element={<HomePageView />} />
          <Route path="/services" element={<HomePageView />} />
          <Route path="/customers" element={<HomePageView />} />
          <Route path="/calculator" element={<HomePageView />} />
          <Route path="/accessories" element={<HomePageView />} />
          <Route path="/safety" element={<HomePageView />} />
          <Route path="/contact" element={<HomePageView />} />

          {/* ROUTE 2: Dedicated Cylinder Booking Page */}
          <Route path="/booking" element={<CylinderBookingPage lang={lang} />} />
          <Route path="/cylinder-booking" element={<CylinderBookingPage lang={lang} />} />

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
