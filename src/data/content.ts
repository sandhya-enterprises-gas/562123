import { CylinderProduct, ServiceItem, CustomerSegment, AccessoryItem } from '../types';

export const BUSINESS_INFO = {
  name: 'SANDHYA ENTERPRISES',
  nameKn: 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್',
  proprietor: 'Ramakrishnaiah',
  proprietorKn: 'ರಾಮಕೃಷ್ಣಯ್ಯ',
  gstin: '29CJXPR4809J1Z6',
  udyam: 'UDYAM-KR-02-0049972',
  taglineEn: 'Commercial & Domestic LPG Supplier & Service Specialists',
  taglineKn: 'ವಾಣಿಜ್ಯ ಮತ್ತು ಗೃಹಬಳಕೆಯ ಎಲ್‌ಪಿಜಿ ಸಿಲಿಂಡರ್ ಪೂರೈಕೆದಾರರು ಮತ್ತು ಸರ್ವಿಸ್ ತಜ್ಞರು',
  established: 2010,
  phoneRateEnquiry: '7676398782',
  phoneHelpline: '8152889500',
  phoneOtherEnquiry: '8073407706',
  phoneWhatsApp: '8073407706',
  phonePrimary: '7676398782',
  phoneSecondary: '8073407706',
  emailOfficial: 'works.with.sandhya.enterprises@gmail.com',
  emailEmergency: 'shamrocky80@gmail.com',
  address: {
    line1: 'Sharapurapalya',
    line1Kn: 'ಶರಾಪುರಪಾಳ್ಯ',
    area: 'Nelamangala, Bengaluru Rural',
    areaKn: 'ನೆಲಮಂಗಲ, ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ',
    city: 'Karnataka',
    cityKn: 'ಕರ್ನಾಟಕ',
    pincode: '562123',
    fullAddressEn: 'Sharapurapalya, Nelamangala, Bengaluru Rural, Karnataka - 562123',
    fullAddressKn: 'ಶರಾಪುರಪಾಳ್ಯ, ನೆಲಮಂಗಲ, ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ, ಕರ್ನಾಟಕ - 562123'
  },
  serviceRegions: [
    { en: 'Nelamangala Town & Rural (Daily Delivery - 562123)', kn: 'ನೆಲಮಂಗಲ ಟೌನ್ & ಗ್ರಾಮಾಂತರ (ದೈನಂದಿನ ಡೆಲಿವರಿ - 562123)' },
    { en: 'Bengaluru Rural Commercial Hubs', kn: 'ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ ವಾಣಿಜ್ಯ ವಲಯ' },
    { en: 'Tumkur Highway & Town (Bulk Orders 10-15+ Cylinders)', kn: 'ತುಮಕೂರು ಹೆದ್ದಾರಿ & ಟೌನ್ (ಬಲ್ಕ್ ಆರ್ಡರ್ 10-15+ ಸಿಲಿಂಡರ್)' },
    { en: 'Sira Region (Bulk Orders 10-15+ Cylinders for Hotels & Wedding Halls)', kn: 'ಶಿರಾ ಭಾಗ (ದೊಡ್ಡ ಹೋಟೆಲ್ & ಕಲ್ಯಾಣ ಮಂಟಪಗಳಿಗೆ ಬಲ್ಕ್ ಆರ್ಡರ್ 10-15+)' }
  ],
  socials: {
    instagram: 'https://www.instagram.com/sandhya___enterprises?igsh=MW1oMzlxNXhkazBwZQ%3D%3D',
    facebook: 'https://www.facebook.com/people/Bharat-Gas-KA-52/61572941177893/',
    google: 'https://share.google/98q5xeXBlsxtlWStG',
    indiamart: 'https://www.indiamart.com/sandhyaenterprises-241256462/photos.html?srsltid=AfmBOornLz5WkgQeJqX3qw5u_UJ30Zi-eM1mPLBTSMCRlR7S_TaM-9FJ',
    linktree: 'https://share.google/ZYNTVB5Zjy7BaqBil'
  }
};

export const RATE_NOTICE = {
  en: {
    badge: 'Pricing Notice',
    title: 'Every Month Rates Are Subject to Change',
    subtitle: "Please Call & Confirm Today's Discounted Commercial Price",
    desc: "Commercial LPG cylinder prices revise on the 1st of every month. Tap below to confirm today's discounted rate or 24/7 delivery support.",
    actionCall: "Call for Today's Rate",
    actionWhatsApp: 'WhatsApp for Best Price',
    actionHelpline: '24/7 Helpline',
    rateEnquiryPhone: '7676398782',
    otherEnquiryPhone: '8073407706',
    helplinePhone: '8152889500'
  },
  kn: {
    badge: 'ದರ ಸೂಚನೆ (Pricing Notice)',
    title: 'ಪ್ರತಿ ತಿಂಗಳು ಗ್ಯಾಸ್ ದರ ಬದಲಾವಣೆಗೆ ಒಳಪಟ್ಟಿರುತ್ತದೆ',
    subtitle: 'ಇಂದಿನ ರಿಯಾಯಿತಿ ವಾಣಿಜ್ಯ ದರ ಮತ್ತು ವಿವರಗಳಿಗಾಗಿ ಸಂಪರ್ಕಿಸಿ',
    desc: 'ವಾಣಿಜ್ಯ ಎಲ್‌ಪಿಜಿ ದರಗಳು ಪ್ರತಿ ತಿಂಗಳು ಪರಿಷ್ಕರಣೆಯಾಗುತ್ತವೆ. ಇಂದಿನ ವಿಶೇಷ ರಿಯಾಯಿತಿ ದರ ಮತ್ತು ತಕ್ಷಣದ ಡೆಲಿವರಿಗಾಗಿ ಕೆಳಗಿನ ಆಯ್ಕೆ ಕ್ಲಿಕ್ ಮಾಡಿ.',
    actionCall: 'ಇಂದಿನ ದರಕ್ಕೆ ಕರೆ ಮಾಡಿ',
    actionWhatsApp: 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ದರ ಪಡೆಯಿರಿ',
    actionHelpline: '24/7 ಸಹಾಯವಾಣಿ',
    rateEnquiryPhone: '7676398782',
    otherEnquiryPhone: '8073407706',
    helplinePhone: '8152889500'
  }
};

// Official Customer Benefits - Smart & Short
export const OFFICIAL_CUSTOMER_BENEFITS = {
  kn: {
    title: 'ಗ್ರಾಹಕರಿಗೆ ಸೇವೆಗಳು (For Customers)',
    subtitle: 'ಹೋಟೆಲ್ & ಕೈಗಾರಿಕೆಗಳಿಗೆ ಅಧಿಕೃತ, ಸುರಕ್ಷಿತ ಹಾಗೂ ನಿಖರ ತೂಕದ ಗ್ಯಾಸ್ ಪೂರೈಕೆ.',
    items: [
      {
        id: 'conn',
        title: 'ತಕ್ಷಣದ LPG ಕನೆಕ್ಷನ್',
        desc: 'ದಾಖಲೆಗಳ ಗೋಜಿಲ್ಲದೆ ಹೋಟೆಲ್ & ಬೇಕರಿಗಳಿಗೆ ತಕ್ಷಣ ಗ್ಯಾಸ್ ಸಂಪರ್ಕ.',
        badge: 'ತಕ್ಷಣ ಕನೆಕ್ಷನ್'
      },
      {
        id: 'weight',
        title: '100% ಖಾತರಿ ತೂಕ',
        desc: 'ಪ್ರಮಾಣೀಕೃತ ಸಿಲಿಂಡರ್, ನಿಖರ ತೂಕ ಮತ್ತು ಸೋರಿಕೆ ರಹಿತ ಸುರಕ್ಷತೆ.',
        badge: '100% ಸುರಕ್ಷತೆ'
      },
      {
        id: 'portfolio',
        title: 'ವಿವಿಧ ಶ್ರೇಣಿಯ ಸಿಲಿಂಡರ್',
        desc: '12kg, 17kg, 19kg, 33kg & 45kg (LOT/VOT) ಸಿಲಿಂಡರ್‌ಗಳು ಲಭ್ಯ.',
        badge: '12kg - 45kg'
      },
      {
        id: 'gogas-elite',
        title: 'ಗೋಗ್ಯಾಸ್ ಎಲೈಟ್ ಕಾಂಪೋಸಿಟ್',
        desc: 'ಗ್ಯಾಸ್ ಮಟ್ಟ ಕಾಣುವ, ತುಕ್ಕು ಹಿಡಿಯದ ಲೈಟ್‌ವೇಟ್ ಸಿಲಿಂಡರ್.',
        badge: 'ಕಾಂಪೋಸಿಟ್'
      },
      {
        id: 'delivery',
        title: 'ವೇಗದ ಡೋರ್‌ಸ್ಟೆಪ್ ಡೆಲಿವರಿ',
        desc: 'ನೆಲಮಂಗಲ & ಹೆದ್ದಾರಿ ಕಾರಿಡಾರ್‌ಗೆ ನಿಗದಿತ ಸಮಯಕ್ಕೆ ಡೆಲಿವರಿ.',
        badge: 'ಎಕ್ಸ್‌ಪ್ರೆಸ್'
      },
      {
        id: 'tech-support',
        title: '24/7 ತಾಂತ್ರಿಕ ಸೇವೆ',
        desc: 'ಪೈಪ್‌ಲೈನ್ ಮತ್ತು ತುರ್ತು ಲೀಕೇಜ್ ಪರಿಹಾರಕ್ಕೆ 24 ಗಂಟೆ ಲಭ್ಯ.',
        badge: '24/7 ಹೆಲ್ಪ್‌ಲೈನ್'
      }
    ]
  },
  en: {
    title: 'For Commercial Customers',
    subtitle: 'Certified, safe, and timely LPG supply for commercial kitchens & industries.',
    items: [
      {
        id: 'conn',
        title: 'Instant Commercial Connection',
        desc: 'Quick connection for hotels & bakeries with zero documentation delay.',
        badge: 'Zero Delays'
      },
      {
        id: 'weight',
        title: '100% Weight & Safety Guarantee',
        desc: 'Certified cylinders with accurate gas weight and zero leak risk.',
        badge: '100% Certified'
      },
      {
        id: 'portfolio',
        title: 'Full Cylinder Range',
        desc: '12kg, 17kg, 19kg, 33kg, and 45kg (LOT/VOT) industrial options.',
        badge: '12kg to 45kg'
      },
      {
        id: 'gogas-elite',
        title: 'GoGas Elite Composite',
        desc: 'Rust-proof, ultra-light, with visible LPG level indicator.',
        badge: 'Composite Tech'
      },
      {
        id: 'delivery',
        title: 'Express Doorstep Delivery',
        desc: 'Prompt delivery across Nelamangala & highway corridors.',
        badge: 'Express Delivery'
      },
      {
        id: 'tech-support',
        title: '24/7 Emergency Support',
        desc: 'Round-the-clock technician dispatch for pipeline & leak safety.',
        badge: '24/7 Hotline'
      }
    ]
  }
};

// Official Distributor & Delivery Partner Benefits - Smart & Short
export const OFFICIAL_DISTRIBUTOR_BENEFITS = {
  kn: {
    title: 'ಡಿಸ್ಟ್ರಿಬ್ಯೂಟರ್ & ಡೆಲಿವರಿ ಪಾರ್ಟ್ನರ್ಸ್',
    subtitle: 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ಜೊತೆ ಕೈಜೋಡಿಸಿ - ಉತ್ತಮ ಕಮಿಷನ್ ಮತ್ತು ನಿಯಮಿತ ಆದಾಯ ಪಡೆಯಿರಿ.',
    items: [
      {
        id: 'margins',
        title: 'ಉತ್ತಮ ಕಮಿಷನ್ & ಮಾರ್ಜಿನ್',
        desc: 'ಪ್ರತಿ ಸಿಲಿಂಡರ್ ಮಾರಾಟಕ್ಕೂ ಆಕರ್ಷಕ ಕಮಿಷನ್ ಮತ್ತು ಸಮಯಕ್ಕೆ ಸರಿಯಾದ ಪಾವತಿ.',
        badge: 'ಹೆಚ್ಚಿನ ಕಮಿಷನ್'
      },
      {
        id: 'flexibility',
        title: 'ಸಮಯದ ಹೊಂದಾಣಿಕೆ',
        desc: 'ನಿಮ್ಮ ಅನುಕೂಲಕ್ಕೆ ತಕ್ಕಂತೆ ಫುಲ್-ಟೈಮ್ ಅಥವಾ ಪಾರ್ಟ್-ಟೈಮ್ ಕೆಲಸ ಮಾಡಿ.',
        badge: 'ಫುಲ್ / ಪಾರ್ಟ್ ಟೈಮ್'
      },
      {
        id: 'support',
        title: 'ಸಂಪೂರ್ಣ ಬಿಸಿನೆಸ್ ಬೆಂಬಲ',
        desc: 'ಸುರಕ್ಷತಾ ತರಬೇತಿ, ಗ್ರಾಹಕ ಸಂಪರ್ಕ ಮತ್ತು ಏಜೆನ್ಸಿ ಮಾರ್ಗದರ್ಶನ.',
        badge: 'ಏಜೆನ್ಸಿ ಬೆಂಬಲ'
      },
      {
        id: 'onboarding',
        title: 'ಸುಲಭ ಮತ್ತು ತ್ವರಿತ ನೋಂದಣಿ',
        desc: 'ಸರಳ ಪ್ರಕ್ರಿಯೆ ಮೂಲಕ ತಕ್ಷಣವೇ ಪಾರ್ಟ್ನರ್ ಆಗಿ ಕಾರ್ಯಾರಂಭ ಮಾಡಿ.',
        badge: 'ತ್ವರಿತ ನೋಂದಣಿ'
      },
      {
        id: 'bulk',
        title: 'ಬಲ್ಕ್ ಆರ್ಡರ್ ಅವಕಾಶ',
        desc: 'ಹೆದ್ದಾರಿ ಹೋಟೆಲ್ ಮತ್ತು ಕಾರ್ಖಾನೆಗಳಿಗೆ ನಿಯಮಿತ ಸರಬರಾಜು ಅವಕಾಶ.',
        badge: 'ಹೆದ್ದಾರಿ ಬಲ್ಕ್'
      }
    ]
  },
  en: {
    title: 'For Distributors & Partners',
    subtitle: 'Partner with Sandhya Enterprises for high per-cylinder earnings and flexible hours.',
    items: [
      {
        id: 'margins',
        title: 'High Profit Margins',
        desc: 'Attractive per-cylinder commissions with transparent, timely payouts.',
        badge: 'Top Margins'
      },
      {
        id: 'flexibility',
        title: 'Flexible Schedule',
        desc: 'Choose full-time or part-time delivery shifts as per your availability.',
        badge: 'Flexible Hours'
      },
      {
        id: 'support',
        title: 'Full Agency Support',
        desc: 'Complete safety training, route guidance, and operational assistance.',
        badge: 'Full Backing'
      },
      {
        id: 'onboarding',
        title: 'Fast Onboarding',
        desc: 'Quick verification and zero complicated formalities to start earning.',
        badge: 'Fast Start'
      },
      {
        id: 'bulk',
        title: 'Bulk Supply Routes',
        desc: 'Serve high-volume highway hotels, wedding halls, and factories.',
        badge: 'Bulk Routes'
      }
    ]
  }
};

export const CYLINDER_PRODUCTS: CylinderProduct[] = [
  {
    id: 'bharat-19kg',
    brand: 'Bharat Gas',
    brandKey: 'bharat',
    nameEn: 'Bharat Gas 19kg Commercial LPG',
    nameKn: 'ಭಾರತ್ ಗ್ಯಾಸ್ 19 ಕೆ.ಜಿ ಕಮರ್ಷಿಯಲ್',
    capacity: '19 KG',
    typeEn: 'Commercial Heavy Duty (VOT)',
    typeKn: 'ಕಮರ್ಷಿಯಲ್ ಹೆವಿ ಡ್ಯೂಟಿ (VOT)',
    idealForEn: 'Hotels, Restaurants, Bakeries, Dhabas',
    idealForKn: 'ಹೋಟೆಲ್, ರೆಸ್ಟೋರೆಂಟ್, ಬೇಕರಿ, ದಾಬಾ',
    featuresEn: [
      'Pure blue flame & high thermal output',
      'Certified cylinder with tamper-proof seal',
      'Daily doorstep express supply',
      'Emergency refill backup'
    ],
    featuresKn: [
      'ಸ್ವಚ್ಛ ನೀಲಿ ಜ್ವಾಲೆ & ಗರಿಷ್ಠ ಶಾಖ',
      'ಪ್ರಮಾಣೀಕೃತ ಸಿಲಿಂಡರ್ & ಅಧಿಕೃತ ಸೀಲ್',
      'ದೈನಂದಿನ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಡೆಲಿವರಿ',
      'ತುರ್ತು ರೀಫಿಲ್ ಸೌಲಭ್ಯ'
    ],
    badgeEn: 'Hotel Favorite',
    badgeKn: 'ಹೋಟೆಲ್‌ಗಳ ಮೊದಲ ಆಯ್ಕೆ',
    color: {
      primary: '#dc2626', // Red
      secondary: '#991b1b',
      bg: 'bg-red-50',
      border: 'border-red-200'
    }
  },
  {
    id: 'gogas-elite',
    brand: 'Go Gas',
    brandKey: 'gogas',
    nameEn: 'GoGas Elite Composite Cylinder',
    nameKn: 'ಗೋಗ್ಯಾಸ್ ಎಲೈಟ್ ಕಾಂಪೋಸಿಟ್ ಸಿಲಿಂಡರ್',
    capacity: '10kg & 17kg',
    typeEn: 'Lightweight Composite LPG',
    typeKn: 'ಲೈಟ್‌ವೇಟ್ ಕಾಂಪೋಸಿಟ್ ಎಲ್‌ಪಿಜಿ',
    idealForEn: 'Cafes, Bakeries, Food Trucks, Cloud Kitchens',
    idealForKn: 'ಕೆಫೆ, ಬೇಕರಿ, ಫುಡ್ ಟ್ರಕ್, ಕ್ಲೌಡ್ ಕಿಚನ್',
    featuresEn: [
      'Rust-proof lightweight fiberglass body',
      'Translucent body: visible LPG level',
      '100% explosion-proof certified',
      'Zero floor rust stains'
    ],
    featuresKn: [
      'ತುಕ್ಕು ಹಿಡಿಯದ ಹಗುರ ಫೈಬರ್‌ಗ್ಲಾಸ್ ಬಾಡಿ',
      'ಪಾರದರ್ಶಕ: ಗ್ಯಾಸ್ ಮಟ್ಟ ಹೊರಗಿಂದಲೇ ಕಾಣುತ್ತದೆ',
      '100% ಸ್ಫೋಟ-ನಿರೋಧಕ ವಿನ್ಯಾಸ',
      'ನೆಲದ ಮೇಲೆ ಕಲೆಗಳಿಲ್ಲ'
    ],
    badgeEn: 'Composite Tech',
    badgeKn: 'ಪಾರದರ್ಶಕ & ಲೈಟ್‌ವೇಟ್',
    color: {
      primary: '#0284c7', // Sky Blue
      secondary: '#0369a1',
      bg: 'bg-sky-50',
      border: 'border-sky-200'
    }
  },
  {
    id: 'bharat-45kg',
    brand: 'Bharat Gas',
    brandKey: 'bharat',
    nameEn: 'Bharat Gas 45kg / 47.5kg Industrial',
    nameKn: 'ಭಾರತ್ ಗ್ಯಾಸ್ 45 / 47.5 ಕೆ.ಜಿ ಇಂಡಸ್ಟ್ರಿಯಲ್',
    capacity: '45 KG / 47.5 KG',
    typeEn: 'Industrial Bulk LOT / VOT',
    typeKn: 'ಕೈಗಾರಿಕಾ ಬಲ್ಕ್ LOT / VOT',
    idealForEn: 'Industries, Marriage Halls, Bulk Bakeries',
    idealForKn: 'ಕಾರ್ಖಾನೆಗಳು, ಕಲ್ಯಾಣ ಮಂಟಪ, ಬೃಹತ್ ಬೇಕರಿ',
    featuresEn: [
      'Liquid Off-Take (LOT) high flow',
      'Zero leftover gas residue',
      'Best for multi-cylinder manifolds',
      'Free pipeline inspection'
    ],
    featuresKn: [
      'ಲಿಕ್ವಿಡ್ ಆಫ್-ಟೇಕ್ (LOT) ಅಧಿಕ ಹರಿವು',
      'ಸಿಲಿಂಡರ್‌ನಲ್ಲಿ ಗ್ಯಾಸ್ ಉಳಿಯದ ದಹನ',
      'ಮ್ಯಾನಿಫೋಲ್ಡ್ ಸಿಸ್ಟಮ್‌ಗೆ ಸೂಕ್ತ',
      'ಉಚಿತ ಪೈಪ್‌ಲೈನ್ ತಪಾಸಣೆ'
    ],
    badgeEn: 'Industrial LOT',
    badgeKn: 'ಕೈಗಾರಿಕಾ LOT',
    color: {
      primary: '#b91c1c',
      secondary: '#7f1d1d',
      bg: 'bg-rose-50',
      border: 'border-rose-200'
    }
  },
  {
    id: 'gogas-commercial',
    brand: 'Go Gas',
    brandKey: 'gogas',
    nameEn: 'Go Gas Commercial (17kg / 33kg / 45kg)',
    nameKn: 'ಗೋ ಗ್ಯಾಸ್ ಕಮರ್ಷಿಯಲ್ (17kg / 33kg / 45kg)',
    capacity: '17 KG / 33 KG / 45 KG',
    typeEn: 'Private Commercial LPG',
    typeKn: 'ಪ್ರೈವೇಟ್ ಕಮರ್ಷಿಯಲ್ ಎಲ್‌ಪಿಜಿ',
    idealForEn: 'Catering, Cloud Kitchens, Canteens',
    idealForKn: 'ಕ್ಯಾಟರಿಂಗ್, ಕ್ಲೌಡ್ ಕಿಚನ್, ಕ್ಯಾಂಟೀನ್',
    featuresEn: [
      'Instant connection without ration card',
      'Competitive private LPG bulk price',
      'Soot-free clean blue flame',
      'Prompt doorstep delivery'
    ],
    featuresKn: [
      'ದಾಖಲೆಗಳಿಲ್ಲದೆ ತಕ್ಷಣ ಹೊಸ ಕನೆಕ್ಷನ್',
      'ಖಾಸಗಿ ವಲಯದ ಅತ್ಯುತ್ತಮ ಬಲ್ಕ್ ದರ',
      'ಕಪ್ಪು ಕಲೆ ರಹಿತ ಶುದ್ಧ ನೀಲಿ ಜ್ವಾಲೆ',
      'ತಕ್ಷಣದ ಡೋರ್‌ಸ್ಟೆಪ್ ಡೆಲಿವರಿ'
    ],
    badgeEn: 'Instant Setup',
    badgeKn: 'ತ್ವರಿತ ಕನೆಕ್ಷನ್',
    color: {
      primary: '#2563eb', // Blue
      secondary: '#1d4ed8',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    }
  },
  {
    id: 'powergas-commercial',
    brand: 'Power Gas',
    brandKey: 'powergas',
    nameEn: 'Power Gas High Pressure (19kg / 33kg / 45kg)',
    nameKn: 'ಪವರ್ ಗ್ಯಾಸ್ ಹೈ ಪ್ರೆಶರ್ (19kg / 33kg / 45kg)',
    capacity: '19 KG / 33 KG / 45 KG',
    typeEn: 'High Pressure Heavy Commercial',
    typeKn: 'ಹೈ ಪ್ರೆಶರ್ ಕಮರ್ಷಿಯಲ್',
    idealForEn: 'Highway Dhabas, Heavy Kitchens, Bhatti',
    idealForKn: 'ಹೈವೇ ದಾಬಾ, ಭಾರಿ ಕಿಚನ್, ಭಟ್ಟಿ',
    featuresEn: [
      'Heavy commercial burner compatibility',
      'High thermal heat output',
      'Steady festival/bulk supply',
      'Dual safety leak check'
    ],
    featuresKn: [
      'ಕಮರ್ಷಿಯಲ್ ಬರ್ನರ್‌ಗೆ ಸೂಕ್ತ ಪ್ರೆಶರ್',
      'ಶಕ್ತಿಶಾಲಿ ಅಧಿಕ ಶಾಖದ ಜ್ವಾಲೆ',
      'ಹಬ್ಬದ ಸೀಸನ್‌ನಲ್ಲೂ ತಡೆರಹಿತ ಸರಬರಾಜು',
      'ಡಬಲ್ ಸುರಕ್ಷತಾ ತಪಾಸಣೆ'
    ],
    badgeEn: 'High Pressure',
    badgeKn: 'ಹೈ ಪ್ರೆಶರ್',
    color: {
      primary: '#d97706', // Amber
      secondary: '#b45309',
      bg: 'bg-amber-50',
      border: 'border-amber-200'
    }
  },
  {
    id: 'gogas-12kg',
    brand: 'Go Gas',
    brandKey: 'gogas',
    nameEn: 'Go Gas 12kg Commercial & Lab',
    nameKn: 'ಗೋ ಗ್ಯಾಸ್ 12 ಕೆ.ಜಿ ಕಮರ್ಷಿಯಲ್ & ಲ್ಯಾಬ್',
    capacity: '12 KG',
    typeEn: 'Compact Commercial (12KG)',
    typeKn: 'ಕಾಂಪ್ಯಾಕ್ಟ್ ಕಮರ್ಷಿಯಲ್ (12KG)',
    idealForEn: 'Laboratories, Kiosks, Food Stalls, Small Cafes',
    idealForKn: 'ಲ್ಯಾಬ್, ಫುಡ್ ಕಿಯಾಸ್ಕ್, ಸಣ್ಣ ಕೆಫೆ',
    featuresEn: [
      'Compact size for compact spaces',
      'Easy carry handle with quick valve',
      'Factory-sealed accurate weight',
      'Quick counter pickup or delivery'
    ],
    featuresKn: [
      'ಸಣ್ಣ ಜಾಗಗಳಿಗೆ ಸೂಕ್ತವಾದ ಗಾತ್ರ',
      'ಸಾಗಿಸಲು ಸುಲಭವಾದ ಹ್ಯಾಂಡಲ್',
      'ಸೀಲ್ ಮಾಡಿದ ನಿಖರ ತೂಕ',
      'ಕೌಂಟರ್ ಪಿಕ್‌ಅಪ್ ಅಥವಾ ಡೆಲಿವರಿ'
    ],
    badgeEn: 'Compact 12kg',
    badgeKn: 'ಕಾಂಪ್ಯಾಕ್ಟ್ 12 ಕೆ.ಜಿ',
    color: {
      primary: '#059669', // Emerald
      secondary: '#047857',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200'
    }
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'fast-delivery',
    iconName: 'Truck',
    titleEn: 'On-Time Doorstep Delivery',
    titleKn: 'ಸಕಾಲಿಕ ಡೋರ್‌ಸ್ಟೆಪ್ ಡೆಲಿವರಿ',
    descEn: 'Prompt same-day delivery across Nelamangala and highway corridors so your kitchen never stops.',
    descKn: 'ಅಡುಗೆ ನಿಲ್ಲದಂತೆ ನೆಲಮಂಗಲ ಮತ್ತು ಹೆದ್ದಾರಿ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಅದೇ ದಿನ ತ್ವರಿತ ಡೆಲಿವರಿ.',
    highlightsEn: ['Same-day dispatch', 'Dedicated fleet', 'Weekend service', 'Live phone coordination'],
    highlightsKn: ['ಅದೇ ದಿನ ಡೆಲಿವರಿ', 'ಸ್ವಂತ ವಾಹನ ಸೇವೆ', 'ವಾರಾಂತ್ಯದಲ್ಲೂ ಲಭ್ಯ', 'ನೇರ ಫೋನ್ ಬೆಂಬಲ']
  },
  {
    id: 'pipeline-installation',
    iconName: 'Wrench',
    titleEn: 'Commercial Pipeline & Manifolds',
    titleKn: 'ಕಮರ್ಷಿಯಲ್ ಗ್ಯಾಸ್ ಪೈಪ್‌ಲೈನ್',
    descEn: 'End-to-end copper & steel pipeline fitting with manifolds and safety pressure tests.',
    descKn: 'ಕಾಪರ್ & ಸ್ಟೀಲ್ ಪೈಪ್‌ಲೈನ್ ಅಳವಡಿಕೆ, ಮ್ಯಾನಿಫೋಲ್ಡ್ ಸಿಸ್ಟಮ್ ಮತ್ತು ಪ್ರೆಶರ್ ಟೆಸ್ಟಿಂಗ್.',
    highlightsEn: ['Copper manifolds', 'High-pressure regulators', 'Auto changeovers', 'Pressure safety tests'],
    highlightsKn: ['ಕಾಪರ್ ಮ್ಯಾನಿಫೋಲ್ಡ್', 'ಹೈ ಪ್ರೆಶರ್ ರೆಗ್ಯುಲೇಟರ್', 'ಆಟೋ ಚೇಂಜ್‌ಓವರ್', 'ಸುರಕ್ಷತಾ ಪರೀಕ್ಷೆ']
  },
  {
    id: 'emergency-leak-inspection',
    iconName: 'ShieldAlert',
    titleEn: '24/7 Leak Check & Safety Audit',
    titleKn: '24/7 ತುರ್ತು ಲೀಕೇಜ್ ತಪಾಸಣೆ',
    descEn: 'Immediate response team for gas odor, valve replacements, and safety audits.',
    descKn: 'ಗ್ಯಾಸ್ ವಾಸನೆ, ಲೀಕೇಜ್ ಹಾಗೂ ವಾಲ್ವ್ ಸಮಸ್ಯೆಗೆ ತಕ್ಷಣದ ತುರ್ತು ತಪಾಸಣೆ.',
    highlightsEn: ['Immediate visit', 'Electronic leak check', 'Regulator replacement', 'Staff safety guidance'],
    highlightsKn: ['ತಕ್ಷಣ ಭೇಟಿ', 'ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಡಿಟೆಕ್ಟರ್', 'ರೆಗ್ಯುಲೇಟರ್ ಬದಲಾವಣೆ', 'ಸುರಕ್ಷತಾ ಸಲಹೆ']
  },
  {
    id: 'competitive-pricing',
    iconName: 'BadgePercent',
    titleEn: 'Best Bulk Pricing & GST Bills',
    titleKn: 'ಅತ್ಯುತ್ತಮ ಬಲ್ಕ್ ದರ & GST ಬಿಲ್ಲಿಂಗ್',
    descEn: 'Lowest monthly bulk rates for high-volume consumers with proper GST invoices.',
    descKn: 'ಹೆಚ್ಚು ಸಿಲಿಂಡರ್ ಬಳಸುವ ಗ್ರಾಹಕರಿಗೆ ಮಾರುಕಟ್ಟೆಯ ಅತ್ಯಂತ ಕಡಿಮೆ ಬಲ್ಕ್ ಬೆಲೆ & ಅಧಿಕೃತ ಬಿಲ್.',
    highlightsEn: ['Lowest monthly rates', 'Volume discounts', 'GST tax invoices', 'No hidden charges'],
    highlightsKn: ['ತಿಂಗಳ ಕಡಿಮೆ ದರ', 'ಬಲ್ಕ್ ರಿಯಾಯಿತಿ', 'ಜಿಎಸ್‌ಟಿ ಇನ್‌ವಾಯ್ಸ್', 'ಅಡಗಿದ ಶುಲ್ಕವಿಲ್ಲ']
  }
];

export const CUSTOMER_SEGMENTS: CustomerSegment[] = [
  {
    id: 'hotels-restaurants',
    titleEn: 'Hotels & Restaurants',
    titleKn: 'ಹೋಟೆಲ್ & ರೆಸ್ಟೋರೆಂಟ್‌ಗಳು',
    descEn: 'Non-stop high flame supply for burners, tandoors, and bakery ovens.',
    descKn: 'ಬರ್ನರ್, ತಂದೂರ್ ಮತ್ತು ಓವನ್‌ಗಳಿಗೆ ತಡೆರಹಿತ ನೀಲಿ ಜ್ವಾಲೆಯ ಸಿಲಿಂಡರ್ ಪೂರೈಕೆ.',
    icon: 'UtensilsCrossed',
    tagEn: 'High Priority',
    tagKn: 'ಅಗ್ರ ಆದ್ಯತೆ'
  },
  {
    id: 'dhabas-catering',
    titleEn: 'Highway Dhabas & Caterers',
    titleKn: 'ಹೈವೇ ದಾಬಾ & ಕ್ಯಾಟರಿಂಗ್',
    descEn: 'Heavy-duty high pressure cylinders and portable manifolds for outdoor events.',
    descKn: 'ಹೆದ್ದಾರಿ ದಾಬಾಗಳು ಮತ್ತು ಸಮಾರಂಭಗಳಿಗೆ ಹೈ-ಪ್ರೆಶರ್ ಸಿಲಿಂಡರ್ ಪೂರೈಕೆ.',
    icon: 'Truck',
    tagEn: 'Express Delivery',
    tagKn: 'ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಡೆಲಿವರಿ'
  },
  {
    id: 'kalyana-mantapa',
    titleEn: 'Marriage Halls & Parties',
    titleKn: 'ಕಲ್ಯಾಣ ಮಂಟಪ & ಸಮಾರಂಭ',
    descEn: 'High volume 19kg & 47.5kg cylinder banks for mega feasts and functions.',
    descKn: 'ಮದುವೆ ಸಮಾರಂಭಗಳಿಗೆ ದೊಡ್ಡ ಪ್ರಮಾಣದ ಸಿಲಿಂಡರ್‌ಗಳು & ಸುರಕ್ಷಿತ ಬ್ಯಾಂಕ್.',
    icon: 'Building2',
    tagEn: 'Bulk Booking',
    tagKn: 'ಬಲ್ಕ್ ಬುಕಿಂಗ್'
  },
  {
    id: 'industries-factories',
    titleEn: 'Industries & Factories',
    titleKn: 'ಕೈಗಾರಿಕೆಗಳು & ಫ್ಯಾಕ್ಟರಿ',
    descEn: 'Liquid Off-Take (LOT) bulk supply for powder coating, heating, and metal cutting.',
    descKn: 'ಪೌಡರ್ ಕೋಟಿಂಗ್, ಹೀಟಿಂಗ್ ಮತ್ತು ಮೆಟಲ್ ಕಟಿಂಗ್‌ಗೆ ಕೈಗಾರಿಕಾ LOT ಗ್ಯಾಸ್ ಪೂರೈಕೆ.',
    icon: 'Factory',
    tagEn: 'Industrial LOT',
    tagKn: 'ಕೈಗಾರಿಕಾ LOT'
  }
];

export const ACCESSORIES: AccessoryItem[] = [
  {
    id: 'acc-1',
    nameEn: 'Commercial Heavy Burner Stoves',
    nameKn: 'ಕಮರ್ಷಿಯಲ್ ಹೆವಿ ಬರ್ನರ್ ಸ್ಟೌ',
    categoryEn: 'Stoves & Burners',
    categoryKn: 'ಸ್ಟೌ ಮತ್ತು ಬರ್ನರ್‌ಗಳು',
    descEn: 'Cast iron high-BTU burners built for heavy cookware and intense cooking loads.',
    descKn: 'ಭಾರಿ ಪಾತ್ರೆಗಳಿಗೆ ಮತ್ತು ಹೆಚ್ಚು ಹೊತ್ತು ಅಡುಗೆ ಮಾಡಲು ಬಳಸುವ ಗಟ್ಟಿ ಕ್ಯಾಸ್ಟ್ ಐರನ್ ಬರ್ನರ್‌ಗಳು.'
  },
  {
    id: 'acc-2',
    nameEn: 'High-Pressure Commercial Regulators',
    nameKn: 'ಹೈ ಪ್ರೆಶರ್ ಕಮರ್ಷಿಯಲ್ ರೆಗ್ಯುಲೇಟರ್',
    categoryEn: 'Regulators & Valves',
    categoryKn: 'ರೆಗ್ಯುಲೇಟರ್ ಮತ್ತು ವಾಲ್ವ್‌ಗಳು',
    descEn: 'Heavy duty brass pressure regulators with precision flow control knob.',
    descKn: 'ಅಧಿಕ ಒತ್ತಡ ನಿಯಂತ್ರಣ ನೀಡುವ ಹಾಗೂ ಸುರಕ್ಷತೆ ಖಚಿತಪಡಿಸುವ ಭದ್ರ ಹಿತ್ತಾಳೆ ರೆಗ್ಯುಲೇಟರ್‌ಗಳು.'
  },
  {
    id: 'acc-3',
    nameEn: 'Suraksha Steel-Braided Gas Hose',
    nameKn: 'ಸುರಕ್ಷಾ ಸ್ಟೀಲ್ ಬ್ರೇಡೆಡ್ ಗ್ಯಾಸ್ ಪೈಪ್',
    categoryEn: 'Safety Hoses',
    categoryKn: 'ಸುರಕ್ಷತಾ ಪೈಪ್‌ಗಳು',
    descEn: 'Rodent-proof, fire-resistant steel braided hose with zero leak risk.',
    descKn: 'ಇಲಿ ಕಡಿಯದ, ಬೆಂಕಿ ನಿರೋಧಕ ಉಕ್ಕಿನ ಕವಚದ ಸುರಕ್ಷಿತ ಗ್ಯಾಸ್ ಪೈಪ್.'
  },
  {
    id: 'acc-4',
    nameEn: 'Commercial Copper Pigtails',
    nameKn: 'ಕಾಪರ್ ಪಿಗ್‌ಟೇಲ್ಸ್ & ವಾಲ್ವ್‌ಗಳು',
    categoryEn: 'Pipeline Fittings',
    categoryKn: 'ಪೈಪ್‌ಲೈನ್ ಫಿಟ್ಟಿಂಗ್ಸ್',
    descEn: 'High grade copper tubing to connect multi-cylinder banks safely.',
    descKn: 'ಬಹು ಸಿಲಿಂಡರ್‌ಗಳನ್ನು ಒಂದೇ ಪೈಪ್‌ಲೈನ್‌ಗೆ ಜೋಡಿಸಲು ಗಟ್ಟಿ ಕಾಪರ್ ಟ್ಯೂಬ್‌ಗಳು.'
  },
  {
    id: 'acc-5',
    nameEn: 'Gas Leak Detectors & Gauges',
    nameKn: 'ಗ್ಯಾಸ್ ಲೀಕ್ ಡಿಟೆಕ್ಟರ್ & ಮೀಟರ್',
    categoryEn: 'Safety Equipment',
    categoryKn: 'ಸುರಕ್ಷತಾ ಉಪಕರಣಗಳು',
    descEn: 'Sensory alarms and dial gauges to monitor pipeline pressure in real time.',
    descKn: 'ಪೈಪ್‌ಲೈನ್ ಒತ್ತಡ ಮತ್ತು ಸೋರಿಕೆಯನ್ನು ತಕ್ಷಣವೇ ಪತ್ತೆ ಹಚ್ಚುವ ಸೆನ್ಸರ್ ಮೀಟರ್‌ಗಳು.'
  },
  {
    id: 'acc-6',
    nameEn: 'Commercial Tandoor & Bhatti Burners',
    nameKn: 'ತಂದೂರ್ & ಭಟ್ಟಿ ಬರ್ನರ್‌ಗಳು',
    categoryEn: 'Specialty Burners',
    categoryKn: 'ವಿಶೇಷ ಬರ್ನರ್‌ಗಳು',
    descEn: 'High-temperature heating jets engineered for tandoors and large bhattis.',
    descKn: 'ದೊಡ್ಡ ಭಟ್ಟಿ ಹಾಗೂ ತಂದೂರ್ ಓವನ್‌ಗಳಿಗೆ ತೀವ್ರ ಶಾಖ ಒದಗಿಸುವ ಜೆಟ್ ಬರ್ನರ್‌ಗಳು.'
  }
];

export const SAFETY_GUIDELINES = {
  en: [
    {
      step: '1',
      title: 'Smell Gas? Do Not Panic',
      desc: 'Extinguish all open flames immediately and alert kitchen staff.'
    },
    {
      step: '2',
      title: 'Turn Off Cylinder Valve',
      desc: 'Rotate the regulator switch / valve clockwise to OFF.'
    },
    {
      step: '3',
      title: 'Do Not Touch Electric Switches',
      desc: 'Do not flip any light, fan, or exhaust switch to prevent spark ignition.'
    },
    {
      step: '4',
      title: 'Open Doors & Windows',
      desc: 'Ventilate the kitchen fully so heavy gas accumulation disperses.'
    },
    {
      step: '5',
      title: 'Call 24/7 Emergency Line',
      desc: 'Dial +91 8152889500 immediately for emergency technician support.'
    }
  ],
  kn: [
    {
      step: '೧',
      title: 'ಗ್ಯಾಸ್ ವಾಸನೆ ಬಂದರೆ ಆತಂಕಪಡಬೇಡಿ',
      desc: 'ತಕ್ಷಣವೇ ಎಲ್ಲಾ ಬೆಂಕಿ ಜ್ವಾಲೆಗಳನ್ನು ನಂದಿಸಿ ಸಿಬ್ಬಂದಿಯನ್ನು ಎಚ್ಚರಿಸಿ.'
    },
    {
      step: '೨',
      title: 'ಸಿಲಿಂಡರ್ ವಾಲ್ವ್ ಆಫ್ ಮಾಡಿ',
      desc: 'ರೆಗ್ಯುಲೇಟರ್ ಸ್ವಿಚ್ ಅನ್ನು ಕ್ಲಾಕ್‌ವೈಸ್ ತಿರುಗಿಸಿ OFF ಮಾಡಿ.'
    },
    {
      step: '೩',
      title: 'ವಿದ್ಯುತ್ ಸ್ವಿಚ್ ಮುಟ್ಟಬೇಡಿ',
      desc: 'ಸ್ಪಾರ್ಕ್ ತಡೆಯಲು ಫ್ಯಾನ್, ಲೈಟ್ ಅಥವಾ ಯಾವುದೇ ಸ್ವಿಚ್ ಹಾಕಬೇಡಿ.'
    },
    {
      step: '೪',
      title: 'ಬಾಗಿಲು-ಕಿಟಕಿ ತೆರೆಯಿರಿ',
      desc: 'ಅನಿಲ ಹೊರಹೋಗಲು ಎಲ್ಲಾ ಬಾಗಿಲು ಕಿಟಕಿಗಳನ್ನು ಪೂರ್ಣ ತೆರೆಯಿರಿ.'
    },
    {
      step: '೫',
      title: 'ತುರ್ತು ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ',
      desc: 'ತಕ್ಷಣವೇ +91 8152889500 ಸಂಖ್ಯೆಗೆ ಕರೆ ಅಥವಾ ವಾಟ್ಸಾಪ್ ಮಾಡಿ.'
    }
  ]
};

export const FAQS = [
  {
    qEn: 'Why are commercial LPG prices not fixed on the website?',
    qKn: 'ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ನಿಶ್ಚಿತ ಗ್ಯಾಸ್ ಬೆಲೆಯನ್ನು ಏಕೆ ಹಾಕಿಲ್ಲ?',
    aEn: 'LPG rates revise on the 1st of every month as per oil companies. Call Rate Enquiry: 7676398782 for today\'s price. For other enquiries & WhatsApp: 8073407706. 24/7 Helpline: 8152889500.',
    aKn: 'ತೈಲ ಕಂಪನಿಗಳು ಪ್ರತಿ ತಿಂಗಳ 1ನೇ ತಾರೀಖು ದರ ಬದಲಾಯಿಸುತ್ತವೆ. ಇಂದಿನ ದರ ವಿಚಾರಣೆಗೆ ಕರೆ ಮಾಡಿ: 7676398782. ಇತರ ವಿಚಾರಣೆ ಅಥವಾ ವಾಟ್ಸಾಪ್: 8073407706. ತುರ್ತು ಸಹಾಯವಾಣಿ: 8152889500.'
  },
  {
    qEn: 'Which areas do you deliver to?',
    qKn: 'ನೀವು ಯಾವ್ಯಾವ ಪ್ರದೇಶಗಳಿಗೆ ಡೆಲಿವರಿ ಮಾಡುತ್ತೀರಿ?',
    aEn: 'Daily delivery across Nelamangala & Bengaluru Rural (562123). Dedicated delivery to Tumkur & Sira for bulk orders (10-15+ cylinders).',
    aKn: 'ನೆಲಮಂಗಲ ಮತ್ತು ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರಕ್ಕೆ (562123) ಪ್ರತಿದಿನ ಡೆಲಿವರಿ. ತುಮಕೂರು ಮತ್ತು ಶಿರಾ ಭಾಗಕ್ಕೆ ಬಲ್ಕ್ ಆರ್ಡರ್‌ಗಳಿಗೆ (10-15+) ಮಾತ್ರ ಡೆಲಿವರಿ.'
  },
  {
    qEn: 'What LPG brands are available?',
    qKn: 'ಯಾವ ಬ್ರ್ಯಾಂಡ್‌ಗಳು ಲಭ್ಯವಿವೆ?',
    aEn: 'Bharat Gas (Commercial 19kg & 47.5kg), Go Gas (12kg, 17kg, 33kg), and Power Gas (Commercial & Domestic).',
    aKn: 'ಭಾರತ್ ಗ್ಯಾಸ್ (19kg & 47.5kg), ಗೋ ಗ್ಯಾಸ್ (12kg, 17kg, 33kg) ಮತ್ತು ಪವರ್ ಗ್ಯಾಸ್ ಲಭ್ಯವಿವೆ.'
  },
  {
    qEn: 'Do you install commercial gas pipelines?',
    qKn: 'ಕಮರ್ಷಿಯಲ್ ಗ್ಯಾಸ್ ಪೈಪ್‌ಲೈನ್ ಅಳವಡಿಸುತ್ತೀರಾ?',
    aEn: 'Yes. We provide certified copper/steel pipelines, manifolds, and pressure testing for hotels and factories.',
    aKn: 'ಹೌದು. ಹೋಟೆಲ್ ಮತ್ತು ಕಾರ್ಖಾನೆಗಳಿಗೆ ಕಾಪರ್/ಸ್ಟೀಲ್ ಪೈಪ್‌ಲೈನ್, ಮ್ಯಾನಿಫೋಲ್ಡ್ ಮತ್ತು ಪ್ರೆಶರ್ ಟೆಸ್ಟಿಂಗ್ ಮಾಡುತ್ತೇವೆ.'
  }
];
