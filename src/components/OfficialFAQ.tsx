import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  Wrench,
  ShieldCheck,
  Search,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  FileText
} from 'lucide-react';
import { Language } from '../types';
import { BUSINESS_INFO } from '../data/content';

interface OfficialFAQProps {
  lang: Language;
}

type FAQCategory = 'all' | 'delivery' | 'payment' | 'installation' | 'privacy';

interface FAQItem {
  id: string;
  category: 'delivery' | 'payment' | 'installation' | 'privacy';
  qEn: string;
  qKn: string;
  aEn: string;
  aKn: string;
  badgeEn: string;
  badgeKn: string;
}

export const OFFICIAL_FAQS: FAQItem[] = [
  // CATEGORY: DELIVERY TIMELINES
  {
    id: 'faq-del-1',
    category: 'delivery',
    badgeEn: 'Nelamangala Coverage',
    badgeKn: 'ನೆಲಮಂಗಲ ಕಾರ್ಯಾಚರಣೆ',
    qEn: 'What is the standard delivery timeline for Nelamangala Town and Rural areas?',
    qKn: 'ನೆಲಮಂಗಲ ನಗರ ಮತ್ತು ಗ್ರಾಮಾಂತರ ಪ್ರದೇಶಗಳಿಗೆ ಸಿಲಿಂಡರ್ ಡೆಲಿವರಿ ಎಷ್ಟು ಸಮಯದಲ್ಲಿ ತಲುಪುತ್ತದೆ?',
    aEn: 'For Nelamangala Town (PIN: 562123), Sondekoppa Road, Boodihal, and adjoining industrial hubs, standard commercial LPG orders placed before 2:00 PM are delivered on the same day within 2 to 4 hours. Express emergency dispatch is prioritized for operating commercial kitchens and restaurants to ensure zero cooking downtime.',
    aKn: 'ನೆಲಮಂಗಲ ಟೌನ್ (ಪಿನ್: 562123), ಸೋಂಡೇಕೊಪ್ಪ ರಸ್ತೆ, ಬೂದಿಹಾಳ್ ಹಾಗೂ ಸುತ್ತಮುತ್ತಲಿನ ಇಂಡಸ್ಟ್ರಿಯಲ್ ವಲಯಗಳಿಗೆ ಮಧ್ಯಾಹ್ನ 2:00 ಗಂಟೆಯೊಳಗೆ ಬರುವ ಎಲ್ಲಾ ಕಮರ್ಷಿಯಲ್ ಆರ್ಡರ್‌ಗಳನ್ನು ಅದೇ ದಿನ 2 ರಿಂದ 4 ಗಂಟೆಗಳಲ್ಲಿ ನೇರವಾಗಿ ಡೆಲಿವರಿ ಮಾಡಲಾಗುತ್ತದೆ. ಹೋಟೆಲ್ ಹಾಗೂ ಅಡುಗೆಮನೆಗಳಲ್ಲಿ ಕೆಲಸ ನಿಲ್ಲದಂತೆ ತುರ್ತು ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಡೆಲಿವರಿಗೆ ಮೊದಲ ಆದ್ಯತೆ ನೀಡಲಾಗುತ್ತದೆ.'
  },
  {
    id: 'faq-del-2',
    category: 'delivery',
    badgeEn: 'Bulk Corridors',
    badgeKn: 'ಬಲ್ಕ್ ಸಪ್ಲೈ ಕಾರಿಡಾರ್',
    qEn: 'What are the delivery schedules for Tumkur Road, Dobbaspet, and Sira bulk corridors?',
    qKn: 'ತುಮಕೂರು ರಸ್ತೆ, ಡಾಬಸ್‌ಪೇಟೆ ಮತ್ತು ಶಿರಾ ಕಾರಿಡಾರ್‌ಗಳಿಗೆ ಬಲ್ಕ್ ಸಪ್ಲೈ ನಿಯಮಗಳು ಮತ್ತು ವೇಳಾಪಟ್ಟಿ ಯಾವುವು?',
    aEn: 'We operate dedicated daily delivery vehicles across the Tumkur Road highway belt, Nelamangala Industrial Area, and Dobbaspet. For extended corridors like Sira and industrial outer rings, dedicated truck dispatch is scheduled for bulk requirements of 10 to 15 commercial cylinders (19kg / 47.5kg) within 24 hours of booking.',
    aKn: 'ತುಮಕೂರು ರಸ್ತೆ ಹೆದ್ದಾರಿ, ನೆಲಮಂಗಲ ಕೈಗಾರಿಕಾ ಪ್ರದೇಶ ಹಾಗೂ ಡಾಬಸ್‌ಪೇಟೆಗೆ ನಮ್ಮ ನಿತ್ಯದ ಡೆಲಿವರಿ ವಾಹನಗಳು ಸಂಚರಿಸುತ್ತವೆ. ಶಿರಾ ಹಾಗೂ ದೂರದ ಬಲ್ಕ್ ಕಾರಿಡಾರ್‌ಗಳಿಗೆ ಕನಿಷ್ಠ 10 ರಿಂದ 15 ಕಮರ್ಷಿಯಲ್ ಸಿಲಿಂಡರ್‌ಗಳ (19kg / 47.5kg) ಬೃಹತ್ ಆರ್ಡರ್‌ಗಳಿಗೆ 24 ಗಂಟೆಯೊಳಗೆ ಮೀಸಲಾದ ಸರಕು ಸಾಗಣೆ ವಾಹನದಲ್ಲಿ ನೇರ ಡೆಲಿವರಿ ಸೌಲಭ್ಯವಿದೆ.'
  },
  {
    id: 'faq-del-3',
    category: 'delivery',
    badgeEn: 'Peak Hours Backup',
    badgeKn: 'ತುರ್ತು 24/7 ಬ್ಯಾಕಪ್',
    qEn: 'Do you provide emergency backup delivery if gas runs out during peak kitchen hours?',
    qKn: 'ರಾತ್ರಿ ಅಥವಾ ಪೀಕ್ ಅವರ್‌ಗಳಲ್ಲಿ ಗ್ಯಾಸ್ ಮುಗಿದರೆ ತುರ್ತು ಡೆಲಿವರಿ ಸೌಲಭ್ಯವಿದೆಯೇ?',
    aEn: 'Yes. Authorized commercial clients (Hotels, Cloud Kitchens, Caterers, and Marriage Halls) can trigger an instant 1-Click reorder from their Private Customer Portal or call our 24/7 hotline at +91 8152889500 for emergency replenishment.',
    aKn: 'ಹೌದು. ನಮ್ಮಲ್ಲಿ ನೋಂದಾಯಿತ ಹೋಟೆಲ್‌ಗಳು, ಕ್ಲೌಡ್ ಕಿಚನ್‌ಗಳು, ಕಲ್ಯಾಣ ಮಂಟಪಗಳು ತಮ್ಮ ಖಾಸಗಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ "1-ಕ್ಲಿಕ್ ಆರ್ಡರ್" ಬಟನ್ ಒತ್ತಿ ಅಥವಾ ನಮ್ಮ 24/7 ತುರ್ತು ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆ +91 8152889500 ಗೆ ಕರೆ ಮಾಡಿ ತಕ್ಷಣದ ಬ್ಯಾಕಪ್ ಸಿಲಿಂಡರ್ ಪಡೆಯಬಹುದು.'
  },

  // CATEGORY: PAYMENT TERMS & LEDGER
  {
    id: 'faq-pay-1',
    category: 'payment',
    badgeEn: 'Payment Modes',
    badgeKn: 'ಪಾವತಿ ವಿಧಾನಗಳು',
    qEn: 'What payment modes are accepted? Can we pay via Cash or Online UPI?',
    qKn: 'ಪಾವತಿ ವಿಧಾನಗಳು ಯಾವುವು? ಆನ್‌ಲೈನ್ ಮತ್ತು ನಗದು ಎರಡೂ ಸ್ವೀಕರಿಸಲಾಗುತ್ತದೆಯೇ?',
    aEn: 'We accept both Cash on Delivery (ನಗದು) handed directly to the delivery personnel and instant Online digital payments (Google Pay, PhonePe, Paytm, BHIM, UPI, and Bank NEFT/RTGS). Every payment is immediately logged on the official digital invoice and customer ledger.',
    aKn: 'ಹೌದು, ನಗದು (Cash on Delivery) ಹಾಗೂ ಅಧಿಕೃತ ಆನ್‌ಲೈನ್ ಡಿಜಿಟಲ್ ಪಾವತಿ (Google Pay, PhonePe, Paytm, BHIM UPI ಹಾಗೂ ಬ್ಯಾಂಕ್ NEFT/RTGS) ಎರಡನ್ನೂ ಸ್ವೀಕರಿಸಲಾಗುತ್ತದೆ. ನೀವು ಪಾವತಿಸಿದ ಪ್ರತಿ ರೂಪಾಯಿಯೂ ಅಧಿಕೃತ ಡಿಜಿಟಲ್ ರಶೀದಿಯಲ್ಲಿ ತಕ್ಷಣ ದಾಖಲಾಗುತ್ತದೆ.'
  },
  {
    id: 'faq-pay-2',
    category: 'payment',
    badgeEn: 'Commercial Credit',
    badgeKn: 'ವಾಣಿಜ್ಯ ಕ್ರೆಡಿಟ್ ಪಾಲಿಸಿ',
    qEn: 'How does the commercial credit limit and rolling ledger settlement work for regular businesses?',
    qKn: 'ಹೋಟೆಲ್‌ಗಳು ಮತ್ತು ನಿರಂತರ ಗ್ರಾಹಕರಿಗೆ ಕ್ರೆಡಿಟ್ (ಉದ್ದರಿ) ಸೌಲಭ್ಯ ಮತ್ತು ಲೆಡ್ಜರ್ ಲೆಕ್ಕ ಹೇಗೆ ನಿರ್ವಹಿಸಲಾಗುತ್ತದೆ?',
    aEn: 'High-volume commercial establishments (Hotels, Industrial Canteens, Caterers) with verified GST/Trade registration qualify for scheduled rolling weekly or monthly credit limits. The customer can review their live Outstanding Balance (ಬಾಕಿ ಹಣ) and invoice history anytime in the Private Customer Portal.',
    aKn: 'ನಿಯಮಿತವಾಗಿ ದೊಡ್ಡ ಪ್ರಮಾಣದಲ್ಲಿ ಸಿಲಿಂಡರ್ ಬಳಸುವ ಹೋಟೆಲ್‌ಗಳು ಹಾಗೂ ಸಂಸ್ಥೆಗಳಿಗೆ (GST ಮತ್ತು ಉದ್ಯಮ ದಾಖಲೆ ಪರಿಶೀಲನೆಯ ನಂತರ) ವಾರದ ಅಥವಾ ತಿಂಗಳ ಕ್ರೆಡಿಟ್ ಸೌಲಭ್ಯ ನೀಡಲಾಗುತ್ತದೆ. ಗ್ರಾಹಕರು ತಮ್ಮ ಖಾಸಗಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ಬಾಕಿ ಹಣ (Balance) ಮತ್ತು ಹಿಂದಿನ ಬಿಲ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸಬಹುದು.'
  },
  {
    id: 'faq-pay-3',
    category: 'payment',
    badgeEn: 'MT Cylinder Policy',
    badgeKn: 'ಖಾಲಿ ಸಿಲಿಂಡರ್ ನಿಯಮ',
    qEn: 'What is the empty (MT) cylinder exchange and return deposit policy?',
    qKn: 'ಖಾಲಿ (MT) ಸಿಲಿಂಡರ್‌ಗಳ ವಾಪಸಾತಿ ಮತ್ತು ಠೇವಣಿ ನಿಯಮಗಳೇನು?',
    aEn: 'Commercial LPG operations strictly follow a 1-to-1 empty cylinder exchange policy. For every fresh cylinder delivered, an empty cylinder of equivalent capacity must be returned. If empty cylinders are retained at the kitchen, the quantity is transparently recorded under "MT Cylinders Due" in the customer ledger until cleared.',
    aKn: 'ಕಮರ್ಷಿಯಲ್ ಎಲ್‌ಪಿಜಿ ನಿಯಮಾವಳಿಯಂತೆ ಪ್ರತಿ ತುಂಬಿದ ಸಿಲಿಂಡರ್‌ಗೆ ಸಮಾನ ತೂಕದ ಒಂದು ಖಾಲಿ (MT) ಸಿಲಿಂಡರ್ ಅನ್ನು ವಾಪಸ್ ನೀಡಬೇಕು (1-to-1 Exchange). ಒಂದು ವೇಳೆ ಖಾಲಿ ಸಿಲಿಂಡರ್ ಅಡುಗೆಮನೆಯಲ್ಲೇ ಉಳಿದಿದ್ದರೆ, ಅದನ್ನು ಗ್ರಾಹಕರ ಲೆಡ್ಜರ್‌ನಲ್ಲಿ "MT ಸಿಲಿಂಡರ್ ಬಾಕಿ" ಎಂದು ಪಾರದರ್ಶಕವಾಗಿ ನಮೂದಿಸಲಾಗುತ್ತದೆ.'
  },

  // CATEGORY: INSTALLATION & SAFETY
  {
    id: 'faq-inst-1',
    category: 'installation',
    badgeEn: 'Manifold & Pipeline',
    badgeKn: 'ಮ್ಯಾನಿಫೋಲ್ಡ್ & ಪೈಪ್‌ಲೈನ್',
    qEn: 'What are the technical requirements for commercial kitchen manifold banks and pipeline installations?',
    qKn: 'ಕಮರ್ಷಿಯಲ್ ಕಿಚನ್ ಮ್ಯಾನಿಫೋಲ್ಡ್ (Manifold Bank) ಮತ್ತು ಪೈಪ್‌ಲೈನ್ ಅಳವಡಿಕೆಗೆ ಏನು ಅಗತ್ಯವಿದೆ?',
    aEn: 'Commercial installations require a well-ventilated, ground-floor cylinder bank enclosure situated away from active heat sources and electrical sparks. We engineer and install multi-cylinder manifold systems (2x2, 2x4, 4x4 VOT/LOT) with heavy-duty copper pigtails, high-pressure industrial regulators, safety relief valves, and emergency ball-valve shutoffs.',
    aKn: 'ಕಮರ್ಷಿಯಲ್ ಗ್ಯಾಸ್ ಸಂಪರ್ಕಕ್ಕೆ ಉತ್ತಮ ಗಾಳಿ-ಬೆಳಕಿರುವ ನೆಲಮಹಡಿಯ ಪ್ರತ್ಯೇಕ ಸಿಲಿಂಡರ್ ಬ್ಯಾಂಕ್ ಸ್ಥಳ ಬೇಕಾಗುತ್ತದೆ. ನಾವು 2x2, 2x4, 4x4 VOT/LOT ಮ್ಯಾನಿಫೋಲ್ಡ್ ಸಿಸ್ಟಮ್, ISI ಪ್ರಮಾಣೀಕೃತ ತಾಮ್ರದ ಪಿಗ್‌ಟೇಲ್ ಪೈಪ್‌ಗಳು, ಹೈ-ಪ್ರೆಶರ್ ಇಂಡಸ್ಟ್ರಿಯಲ್ ರೆಗ್ಯುಲೇಟರ್‌ಗಳು ಮತ್ತು ತುರ್ತು ಶಟ್‌ಆಫ್ ಬಾಲ್ ವಾಲ್ವ್‌ಗಳನ್ನು ಅಧಿಕೃತವಾಗಿ ಅಳವಡಿಸಿಕೊಡುತ್ತೇವೆ.'
  },
  {
    id: 'faq-inst-2',
    category: 'installation',
    badgeEn: 'Zero Ration Card',
    badgeKn: 'ರೇಷನ್ ಕಾರ್ಡ್ ಅಗತ್ಯವಿಲ್ಲ',
    qEn: 'Is a ration card required for a commercial LPG connection? What documents are needed?',
    qKn: 'ಹೊಸ ಕಮರ್ಷಿಯಲ್ ಗ್ಯಾಸ್ ಕನೆಕ್ಷನ್‌ಗೆ ರೇಷನ್ ಕಾರ್ಡ್ ಅಗತ್ಯವಿದೆಯೇ? ಯಾವ ದಾಖಲೆಗಳು ಬೇಕು?',
    aEn: 'No ration card is needed. Commercial LPG is strictly non-subsidized commercial fuel. Businesses require only basic business identification (GST Certificate, Trade License, or FSSAI registration) along with the proprietor’s Aadhaar Card/PAN. Instant commercial connections can be activated within 24 hours.',
    aKn: 'ಖಂಡಿತವಾಗಿಯೂ ರೇಷನ್ ಕಾರ್ಡ್ ಅಗತ್ಯವಿಲ್ಲ. ಕಮರ್ಷಿಯಲ್ ಗ್ಯಾಸ್ ವಾಣಿಜ್ಯ ಬಳಕೆಯದ್ದಾಗಿದ್ದು, ಯಾವುದೇ ರೇಷನ್ ಕಾರ್ಡ್ ಬೇಡುವುದಿಲ್ಲ. ವ್ಯಾಪಾರ ಸಂಸ್ಥೆಯ GST ಪ್ರಮಾಣಪತ್ರ, ಟ್ರೇಡ್ ಲೈಸೆನ್ಸ್ ಅಥವಾ FSSAI ನಕಲು ಹಾಗೂ ಮಾಲೀಕರ ಆಧಾರ್/ಪ್ಯಾನ್ ಕಾರ್ಡ್ ನೀಡಿದರೆ ಸಾಕು. ಕೇವಲ 24 ಗಂಟೆಗಳಲ್ಲಿ ಅಧಿಕೃತ ಕನೆಕ್ಷನ್ ಆರಂಭವಾಗುತ್ತದೆ.'
  },
  {
    id: 'faq-inst-3',
    category: 'installation',
    badgeEn: 'Safety Testing',
    badgeKn: 'ಲೀಕ್ ತಪಾಸಣೆ ಪ್ರಮಾಣೀಕರಣ',
    qEn: 'How is safety testing, pressure check, and leak verification conducted?',
    qKn: 'ಸುರಕ್ಷತಾ ತಪಾಸಣೆ ಮತ್ತು ಲೀಕ್ ಟೆಸ್ಟಿಂಗ್ ಪ್ರಕ್ರಿಯೆ ಹೇಗೆ ನಡೆಯುತ್ತದೆ?',
    aEn: 'Every fresh cylinder hookup and pipeline manifold undergoes mandatory soap-bubble pressure leak testing, valve seating inspection, and burner pressure calibration by trained technicians before commissioning. We also conduct scheduled annual safety audits for commercial restaurants and manufacturing units.',
    aKn: 'ಪ್ರತಿ ಸಿಲಿಂಡರ್ ಕನೆಕ್ಷನ್ ಹಾಗೂ ಪೈಪ್‌ಲೈನ್ ಅಳವಡಿಕೆಯ ನಂತರ ನಮ್ಮ ಪರಿಣಿತ ತಂತ್ರಜ್ಞರು ಸೋಪ್-ಬಬಲ್ ಪ್ರೆಶರ್ ಲೀಕ್ ಟೆಸ್ಟ್, ವಾಲ್ವ್ ಸೀಲಿಂಗ್ ತಪಾಸಣೆ ಮತ್ತು ಬರ್ನರ್ ಜ್ವಾಲೆಯ ಸಾಮರ್ಥ್ಯವನ್ನು ಅಧಿಕೃತವಾಗಿ ಪರಿಶೀಲಿಸಿ ಪ್ರಮಾಣೀಕರಿಸುತ್ತಾರೆ. ನಿಯಮಿತ ಸುರಕ್ಷತಾ ತಪಾಸಣೆಯೂ ಉಚಿತವಾಗಿರುತ್ತದೆ.'
  },

  // CATEGORY: DATA PRIVACY & CONFIDENTIALITY (GOVERNMENT-GRADE STANDARDS)
  {
    id: 'faq-priv-1',
    category: 'privacy',
    badgeEn: 'Data Privacy',
    badgeKn: 'ಸರ್ಕಾರಿ ಮಾನದಂಡದ ಭದ್ರತೆ',
    qEn: 'How does Sandhya Enterprises protect commercial customer data, passwords, and billing information?',
    qKn: 'ಗ್ರಾಹಕರ ಮಾಹಿತಿ, ಪಾಸ್‌ವರ್ಡ್ ಮತ್ತು ಹಣಕಾಸಿನ ಲೆಡ್ಜರ್ ಡೇಟಾವನ್ನು ಹೇಗೆ ರಕ್ಷಿಸಲಾಗುತ್ತದೆ?',
    aEn: 'In strict alignment with government-grade and enterprise data protection standards, all customer profiles, passwords, order histories, and financial ledgers are 100% private and confidential. Customer credentials are never displayed publicly or shared with unauthorized parties. Only the verified customer can access their private dashboard.',
    aKn: 'ಸರ್ಕಾರಿ ವೆಬ್‌ಸೈಟ್‌ಗಳ ಭದ್ರತಾ ಮಾನದಂಡಗಳಂತೆ (Government-Grade Security Standards), ನಮ್ಮಲ್ಲಿರುವ ಪ್ರತಿಯೊಬ್ಬ ಗ್ರಾಹಕರ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ, ಪಾಸ್‌ವರ್ಡ್, ಆರ್ಡರ್ ಮಾಹಿತಿ ಮತ್ತು ಬಾಕಿ ಹಣದ ಲೆಡ್ಜರ್ 100% ಖಾಸಗಿ ಮತ್ತು ಅತ್ಯಂತ ಗೌಪ್ಯವಾಗಿರುತ್ತದೆ. ಯಾವುದೇ ಗ್ರಾಹಕರ ಖಾಸಗಿ ವಿವರಗಳು ಸಾರ್ವಜನಿಕರಿಗೆ ಕಾಣಿಸುವುದಿಲ್ಲ.'
  },
  {
    id: 'faq-priv-2',
    category: 'privacy',
    badgeEn: 'Role-Based Flow',
    badgeKn: 'ಅಧಿಕೃತ ಚಾನಲ್ ನಿಯಂತ್ರಣ',
    qEn: 'How does the role-based workflow route customer orders to distributors and admin desks?',
    qKn: 'ಗ್ರಾಹಕರು ಆರ್ಡರ್ ಮಾಡಿದಾಗ ಡಿಸ್ಟ್ರಿಬ್ಯೂಟರ್‌ಗೆ ಮತ್ತು ಅಡ್ಮಿನ್‌ಗೆ ಡೇಟಾ ಹೇಗೆ ತಲುಪುತ್ತದೆ?',
    aEn: 'When a customer places an order, it is securely transmitted directly to the authorized Distributor Operations Desk for dispatch without public exposure. Both customer transactions and distributor delivery/collection logs are simultaneously audited by the master Admin Command Center with tamper-evident tracking.',
    aKn: 'ಗ್ರಾಹಕರು ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಆರ್ಡರ್ ಮಾಡಿದಾಗ, ಆ ಮಾಹಿತಿ ನೇರವಾಗಿ ನಮ್ಮ ಅಧಿಕೃತ ವಿತರಕರ ಡೆಸ್ಕ್‌ಗೆ (Distributor Desk) ಡಿಸ್ಪ್ಯಾಚ್‌ಗಾಗಿ ತಲುಪುತ್ತದೆ. ಅದೇ ಸಮಯದಲ್ಲಿ, ವಿತರಕರು ಡೆಲಿವರಿ ಮಾಡಿದ ಹಾಗೂ ಹಣ ಸಂಗ್ರಹಿಸಿದ ಪ್ರತಿಯೊಂದು ಲಾಗ್ ನೇರವಾಗಿ ಸೆಂಟ್ರಲ್ ಅಡ್ಮಿನ್ ಪ್ಯಾನೆಲ್‌ಗೆ (Admin Panel) ರವಾನೆಯಾಗುತ್ತದೆ. ಡೇಟಾ ಸೋರಿಕೆಗೆ ಯಾವುದೇ ಅವಕಾಶವಿರುವುದಿಲ್ಲ.'
  }
];

export const OfficialFAQ: React.FC<OfficialFAQProps> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-del-1');

  const categories: { id: FAQCategory; labelEn: string; labelKn: string; icon: React.ReactNode }[] = [
    { id: 'all', labelEn: 'All Queries', labelKn: 'ಎಲ್ಲಾ ಪ್ರಶ್ನೋತ್ತರಗಳು', icon: <HelpCircle className="w-3.5 h-3.5" /> },
    { id: 'delivery', labelEn: 'Delivery Timelines', labelKn: 'ಡೆಲಿವರಿ ಸಮಯಾವಧಿ', icon: <Clock className="w-3.5 h-3.5" /> },
    { id: 'payment', labelEn: 'Payment & Ledger Terms', labelKn: 'ಪಾವತಿ & ಲೆಡ್ಜರ್ ನಿಯಮಗಳು', icon: <CreditCard className="w-3.5 h-3.5" /> },
    { id: 'installation', labelEn: 'Installation & Safety', labelKn: 'ಇನ್‌ಸ್ಟಾಲೇಷನ್ & ಸುರಕ್ಷತೆ', icon: <Wrench className="w-3.5 h-3.5" /> },
    { id: 'privacy', labelEn: 'Data Privacy & Security', labelKn: 'ಡೇಟಾ ಭದ್ರತೆ & ಗೌಪ್ಯತೆ', icon: <ShieldCheck className="w-3.5 h-3.5" /> }
  ];

  const filteredFaqs = OFFICIAL_FAQS.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesQuery =
      faq.qEn.toLowerCase().includes(query) ||
      faq.qKn.toLowerCase().includes(query) ||
      faq.aEn.toLowerCase().includes(query) ||
      faq.aKn.toLowerCase().includes(query) ||
      faq.badgeEn.toLowerCase().includes(query) ||
      faq.badgeKn.toLowerCase().includes(query);

    return matchesCategory && matchesQuery;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-12 sm:py-16 bg-slate-900 text-white border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-orange-400 text-[10px] font-black uppercase tracking-widest border border-slate-700">
            <HelpCircle className="w-3 h-3 text-orange-400" />
            <span>{lang === 'kn' ? 'ಅಧಿಕೃತ ಪ್ರಶ್ನೋತ್ತರಗಳು (Official FAQ)' : 'OFFICIAL COMMERCIAL LPG FAQS'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            {lang === 'kn' ? (
              <>
                ಕಮರ್ಷಿಯಲ್ ಎಲ್‌ಪಿಜಿ <span className="text-orange-400">ಅಧಿಕೃತ ನಿಯಮಗಳು & ಮಾಹಿತಿ</span>
              </>
            ) : (
              <>
                Frequently Asked Questions & <span className="text-orange-400">Official Standards</span>
              </>
            )}
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            {lang === 'kn'
              ? 'ಡೆಲಿವರಿ ಸಮಯಾವಧಿ, ನಗದು/ಆನ್‌ಲೈನ್ ಪಾವತಿ, ಖಾಲಿ (MT) ಸಿಲಿಂಡರ್ ಲೆಕ್ಕ, ಕಮರ್ಷಿಯಲ್ ಪೈಪ್‌ಲೈನ್ ಅಳವಡಿಕೆ ಹಾಗೂ ಸರ್ಕಾರಿ ಮಾನದಂಡದ ಗೌಪ್ಯತಾ ನಿಯಮಗಳ ವಿವರ.'
              : 'Clear, authoritative guidance on delivery corridors, cash and digital payment terms, MT cylinder accounting, commercial manifold installations, and confidential data privacy.'}
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-8 max-w-4xl mx-auto space-y-3">
          {/* Search Input Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'kn'
                  ? 'ಪ್ರಶ್ನೆ ಅಥವಾ ವಿಷಯವನ್ನು ಹುಡುಕಿ (ಉದಾ: ಡೆಲಿವರಿ, ಪಾವತಿ, 12kg, ಪೈಪ್‌ಲೈನ್, MT ಸಿಲಿಂಡರ್)...'
                  : 'Search by keyword (e.g. delivery timeline, credit terms, manifold, MT cylinder, privacy)...'
              }
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs font-bold text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar justify-start sm:justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                {cat.icon}
                <span>{lang === 'kn' ? cat.labelKn : cat.labelEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-6 max-w-4xl mx-auto space-y-2.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-10 bg-slate-950/60 rounded-xl border border-slate-800 text-slate-400 text-xs font-bold">
              {lang === 'kn'
                ? 'ಯಾವುದೇ ಹೊಂದಾಣಿಕೆಯಾಗುವ ಪ್ರಶ್ನೋತ್ತರಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ದಯವಿಟ್ಟು ಬೇರೆ ಕೀವರ್ಡ್‌ನೊಂದಿಗೆ ಪ್ರಯತ್ನಿಸಿ.'
                : 'No matching queries found. Try searching with a different term or clear the filter.'}
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-slate-950 border-orange-500/80 shadow-md'
                      : 'bg-slate-800/90 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3 text-white transition-colors"
                  >
                    <div className="space-y-1 pr-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-800 text-orange-400 border border-slate-700">
                          {lang === 'kn' ? faq.badgeKn : faq.badgeEn}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Official Standard
                        </span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight text-white leading-snug">
                        {lang === 'kn' ? faq.qKn : faq.qEn}
                      </h3>
                    </div>

                    <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 flex-shrink-0 mt-0.5">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-orange-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 space-y-3">
                      <p className="text-slate-200 text-xs sm:text-[13px] leading-relaxed">
                        {lang === 'kn' ? faq.aKn : faq.aEn}
                      </p>

                      {/* Official Verification Footnote */}
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>
                          {lang === 'kn'
                            ? 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ಅಧಿಕೃತ ನೀತಿ • ನೆಲಮಂಗಲ ಡಿಪೋ'
                            : 'Sandhya Enterprises Commercial Policy • Nelamangala Depot'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Official Direct Contact Footer Box */}
        <div className="mt-10 max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600/20 border border-orange-500/40 text-orange-400 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-tight text-white">
                {lang === 'kn' ? 'ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ಅಥವಾ ವಿಶೇಷ ಸಹಾಯ ಬೇಕೆ?' : 'Need Further Official Clarifications?'}
              </div>
              <div className="text-[11px] text-slate-400">
                {lang === 'kn'
                  ? 'ನಮ್ಮ ನೆಲಮಂಗಲ ಅಧಿಕೃತ ಡೆಸ್ಕ್ ನಿಮ್ಮ ವ್ಯಾಪಾರಕ್ಕೆ 24/7 ನೆರವು ನೀಡಲು ಸಿದ್ಧವಾಗಿದೆ.'
                  : 'Contact our Nelamangala commercial desk for custom manifold drawings and wholesale quotes.'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <a
              href={`tel:${BUSINESS_INFO.phonePrimary}`}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-700 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>{BUSINESS_INFO.phonePrimary}</span>
            </a>
            <a
              href={`https://wa.me/91${BUSINESS_INFO.phoneWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
