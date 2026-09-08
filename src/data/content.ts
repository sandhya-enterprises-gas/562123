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
  phonePrimary: '8152889500',
  phoneWhatsApp: '8152889500',
  phoneSecondary: '8152889500',
  emailOfficial: 'works.with.sandhya.enterprises@gmail.com',
  emailEmergency: 'shamrocky80@gmail.com',
  address: {
    line1: 'Official Commercial Agency Hub & Regional Depot',
    line1Kn: 'ಅಧಿಕೃತ ಕಮರ್ಷಿಯಲ್ ಗ್ಯಾಸ್ ಏಜೆನ್ಸಿ ಹಬ್ ಮತ್ತು ಡಿಪೋ',
    area: 'Nelamangala, Nelamangala Rural & Bengaluru Rural',
    areaKn: 'ನೆಲಮಂಗಲ, ನೆಲಮಂಗಲ ಗ್ರಾಮಾಂತರ ಮತ್ತು ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ',
    city: 'Karnataka',
    cityKn: 'ಕರ್ನಾಟಕ',
    pincode: '562123',
    fullAddressEn: 'Nelamangala, Nelamangala Rural & Bengaluru Rural, Karnataka - 562123',
    fullAddressKn: 'ನೆಲಮಂಗಲ, ನೆಲಮಂಗಲ ಗ್ರಾಮಾಂತರ ಮತ್ತು ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ, ಕರ್ನಾಟಕ - 562123'
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
    badge: 'Important Pricing Notice',
    title: 'Monthly Rate Revisions: No Fixed Rates Published',
    desc: 'As per government and petroleum oil market directives, Commercial LPG cylinder rates are revised on the 1st of every month. To guarantee you receive the lowest and most competitive bulk pricing for today, please call or WhatsApp our booking desk directly.',
    actionCall: 'Call for Today\'s Rate: 8152889500',
    actionWhatsApp: 'WhatsApp Rate Inquiry: 8152889500'
  },
  kn: {
    badge: 'ಪ್ರಮುಖ ದರ ಪ್ರಕಟಣೆ',
    title: 'ಪ್ರತಿ ತಿಂಗಳು ಗ್ಯಾಸ್ ಸಿಲಿಂಡರ್ ದರಗಳು ಬದಲಾಗುತ್ತವೆ - ಕರೆ ಮಾಡಿ ವಿಚಾರಿಸಿ',
    desc: 'ಸರ್ಕಾರಿ ಮತ್ತು ತೈಲ ಕಂಪನಿಗಳ ನಿಯಮಾವಳಿಯಂತೆ ಪ್ರತಿ ತಿಂಗಳ 1ನೇ ತಾರೀಖು ಕಮರ್ಷಿಯಲ್ ಗ್ಯಾಸ್ ದರಗಳು ಪರಿಷ್ಕರಣೆಯಾಗುತ್ತವೆ. ಇಂದಿನ ನಿಖರವಾದ ಸ್ಪರ್ಧಾತ್ಮಕ ಮತ್ತು ರಿಯಾಯಿತಿ ದರ ತಿಳಿಯಲು ನೇರವಾಗಿ ಕರೆ ಮಾಡಿ ಅಥವಾ ವಾಟ್ಸಾಪ್ ಮಾಡಿ.',
    actionCall: 'ಇಂದಿನ ದರಕ್ಕಾಗಿ ಕರೆ ಮಾಡಿ: 8152889500',
    actionWhatsApp: 'ವಾಟ್ಸಾಪ್ ಮೂಲಕ ದರ ವಿಚಾರಿಸಿ: 8152889500'
  }
};

// Official Customer Benefits as mandated (Pure Kannada & Official English)
export const OFFICIAL_CUSTOMER_BENEFITS = {
  kn: {
    title: 'ಗ್ರಾಹಕರಿಗೆ (For Customers)',
    subtitle: 'ಹೋಟೆಲ್‌ಗಳು, ಬೇಕರಿಗಳು, ಕಲ್ಯಾಣ ಮಂಟಪಗಳು ಮತ್ತು ಕೈಗಾರಿಕೆಗಳಿಗೆ ಅಧಿಕೃತ ಮತ್ತು ಸುರಕ್ಷಿತ ಸೇವೆ',
    items: [
      {
        id: 'conn',
        title: 'ತಕ್ಷಣದ LPG ಕನೆಕ್ಷನ್',
        desc: 'ಯಾವುದೇ ರೇಷನ್ ಕಾರ್ಡ್ ಅಥವಾ ಹೆಚ್ಚಿನ ದಾಖಲೆಗಳ ಅಗತ್ಯವಿಲ್ಲದೆ ಹೋಟೆಲ್, ಬೇಕರಿ ಹಾಗೂ ಕೈಗಾರಿಕೆಗಳಿಗೆ ತಕ್ಷಣವೇ ಗ್ಯಾಸ್ ಕನೆಕ್ಷನ್ ದೊರೆಯುತ್ತದೆ.',
        badge: 'ದಾಖಲೆ ರಹಿತ'
      },
      {
        id: 'weight',
        title: '100% ತೂಕ ಮತ್ತು ಸುರಕ್ಷತೆ',
        desc: 'ಪ್ರಮಾಣೀಕೃತ ಸಿಲಿಂಡರ್ಗಳು, ನಿಖರವಾದ ತೂಕ ಹಾಗೂ ಗ್ಯಾಸ್ ಸೋರಿಕೆಯಿಲ್ಲದ ಸಂಪೂರ್ಣ ಸುರಕ್ಷತೆಯ ಭರವಸೆ.',
        badge: 'ಖಾತರಿ ತೂಕ'
      },
      {
        id: 'portfolio',
        title: 'ವಿವಿಧ ಮಾದರಿಯ ಸಿಲಿಂಡರ್ಗಳು',
        desc: '12kg, 17kg, 19kg, 33kg ಮತ್ತು 45kg (LOT/VOT) ವಾಣಿಜ್ಯ ಮತ್ತು ಕೈಗಾರಿಕಾ ಸಿಲಿಂಡರ್ಗಳು ಲಭ್ಯ.',
        badge: '12kg - 45kg'
      },
      {
        id: 'gogas-elite',
        title: 'ಗೋಗ್ಯಾಸ್ ಲೈಟ್ವೇಟ್ ಸಿಲಿಂಡರ್ (GoGas Elite)',
        desc: 'ಪಾರದರ್ಶಕ ಸಿಲಿಂಡರ್ (ಗ್ಯಾಸ್ ಮಟ್ಟವನ್ನು ಹೊರಗಿನಿಂದಲೇ ನೋಡಬಹುದು), ತುಕ್ಕು ಹಿಡಿಯುವುದಿಲ್ಲ ಮತ್ತು ಅತ್ಯಂತ ಸುರಕ್ಷಿತ.',
        badge: 'ಕಾಂಪೋಸಿಟ್'
      },
      {
        id: 'delivery',
        title: 'ತ್ವರಿತ ಡೋರ್ಸ್ಟೆಪ್ ಡೆಲಿವರಿ',
        desc: 'ನೆಲಮಂಗಲ, ತುಮಕೂರು ರಸ್ತೆ, ಸಿರಾ ಮತ್ತು ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ ಪ್ರದೇಶಗಳಿಗೆ ಶೀಘ್ರ ಡೆಲಿವರಿ ಸೇವೆ.',
        badge: 'ಎಕ್ಸ್‌ಪ್ರೆಸ್'
      },
      {
        id: 'tech-support',
        title: '24/7 ತಾಂತ್ರಿಕ ಬೆಂಬಲ',
        desc: 'ತುರ್ತು ಗ್ಯಾಸ್ ಸೋರಿಕೆ ಮತ್ತು ಗ್ಯಾಸ್ ಪೈಪ್ಲೈನ್ ತೊಂದರೆಗಳಿಗೆ 24 ಗಂಟೆಯೂ ತಾಂತ್ರಿಕ ಸೇವೆ ಲಭ್ಯ.',
        badge: '24/7 ಸೇವೆ'
      }
    ]
  },
  en: {
    title: 'For Commercial Customers',
    subtitle: 'Guaranteed safety, accurate weight, and zero-delay supply for commercial kitchens & industries',
    items: [
      {
        id: 'conn',
        title: 'Instant Commercial Connection',
        desc: 'Hassle-free connection for hotels, bakeries, and industries without documentation delays.',
        badge: 'No Ration Card Req.'
      },
      {
        id: 'weight',
        title: '100% Weight & Safety Guarantee',
        desc: 'Fully certified cylinders ensuring accurate gas quantity and complete leak safety.',
        badge: '100% Certified'
      },
      {
        id: 'portfolio',
        title: 'Wide Cylinder Portfolio',
        desc: 'Available in 12kg, 17kg, 19kg, 33kg, and 45kg (LOT/VOT) commercial & industrial capacities.',
        badge: '12kg to 45kg Range'
      },
      {
        id: 'gogas-elite',
        title: 'GoGas Elite Composite Cylinders',
        desc: 'Rust-proof, lightweight, and transparent body to visually inspect LPG levels.',
        badge: 'Composite Tech'
      },
      {
        id: 'delivery',
        title: 'Express Regional Delivery',
        desc: 'Prompt doorstep delivery covering Nelamangala, Tumkur Road, Sira, and Bengaluru Rural corridors.',
        badge: 'Express Corridor'
      },
      {
        id: 'tech-support',
        title: '24/7 Emergency Technical Support',
        desc: 'Round-the-clock technical assistance for pipeline networks and leak issues.',
        badge: '24/7 Hotline'
      }
    ]
  }
};

// Official Distributor & Delivery Partner Benefits (Pure Kannada & Official English)
export const OFFICIAL_DISTRIBUTOR_BENEFITS = {
  kn: {
    title: 'ಡಿಸ್ಟ್ರಿಬ್ಯೂಟರ್ಸ್ ಮತ್ತು ಡೆಲಿವರಿ ಪಾರ್ಟ್ನೆರ್ಗೆ (For Distributors & Delivery Partners)',
    subtitle: 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ಜೊತೆ ಕೈಜೋಡಿಸಿ - ನಿಮ್ಮ ಸ್ವಂತ ಆದಾಯ ಮತ್ತು ಬಿಸಿನೆಸ್ ಬೆಳೆಸಿಕೊಳ್ಳಿ',
    items: [
      {
        id: 'margins',
        title: 'ಹೆಚ್ಚಿನ ಲಾಭಾಂಶ ಮತ್ತು ಕಮಿಷನ್',
        desc: 'ಪ್ರತಿ ಸಿಲಿಂಡರ್ ಮಾರಾಟದ ಮೇಲೆಯೂ ಅತ್ಯುತ್ತಮ ಮಾರ್ಜಿನ್ ಮತ್ತು ಸಮಯಕ್ಕೆ ಸರಿಯಾದ ಪಾವತಿ ವ್ಯವಸ್ಥೆ.',
        badge: 'ಉನ್ನತ ಕಮಿಷನ್'
      },
      {
        id: 'flexibility',
        title: 'ಸಮಯದ ಸೌಲಭ್ಯ (Flexibility)',
        desc: 'ನಿಮ್ಮ ಅನುಕೂಲಕ್ಕೆ ತಕ್ಕಂತೆ ಫುಲ್-ಟೈಮ್ ಅಥವಾ ಪಾರ್ಟ್-ಟೈಮ್ ಡೆಲಿವರಿ ಪಾರ್ಟ್ನೆರ್ ಆಗಿ ಕೆಲಸ ಮಾಡಿ.',
        badge: 'ಫುಲ್ / ಪಾರ್ಟ್ ಟೈಮ್'
      },
      {
        id: 'support',
        title: 'ಸಂಪೂರ್ಣ ಬಿಸಿನೆಸ್ ಬೆಂಬಲ',
        desc: 'ಹೊಸ ಏಜೆನ್ಸಿಗಳಿಗೆ ಮಾರ್ಕೆಟಿಂಗ್ ಬೆಂಬಲ, ಸುರಕ್ಷತಾ ತರಬೇತಿ ಮತ್ತು ಕಾರ್ಯಾಚರಣೆಯ ಮಾರ್ಗದರ್ಶನ.',
        badge: 'ತಾಂತ್ರಿಕ ತರಬೇತಿ'
      },
      {
        id: 'onboarding',
        title: 'ಸುಲಭ ನೋಂದಣಿ ಪ್ರಕ್ರಿಯೆ',
        desc: 'ಸಂಕೀರ್ಣ ನಿಯಮಗಳಿಲ್ಲದೆ ತಕ್ಷಣವೇ ವಿತರಕರಾಗಿ ಅಥವಾ ಡೆಲಿವರಿ ಪಾರ್ಟ್ನೆರ್ ಆಗಿ ನೋಂದಾಯಿಸಿಕೊಳ್ಳಿ.',
        badge: 'ತಕ್ಷಣದ ನೋಂದಣಿ'
      },
      {
        id: 'bulk',
        title: 'ಬಲ್ಕ್ ಆರ್ಡರ್ ಸರಬರಾಜು',
        desc: 'ರಾಷ್ಟ್ರೀಯ ಹೆದ್ದಾರಿ ಮತ್ತು ಕೈಗಾರಿಕಾ ಪ್ರದೇಶಗಳ ಬೃಹತ್ ಹೋಟೆಲ್ಗಳು ಹಾಗೂ ಕಾರ್ಖಾನೆಗಳಿಗೆ ಸರಬರಾಜು ಮಾಡುವ ಸೌಲಭ್ಯ.',
        badge: 'ಹೆದ್ದಾರಿ ಬಲ್ಕ್'
      }
    ]
  },
  en: {
    title: 'For Distributors & Delivery Partners',
    subtitle: 'Partner with Sandhya Enterprises: High per-cylinder earnings, flexible schedules, and direct agency backing',
    items: [
      {
        id: 'margins',
        title: 'High Profit Margins & Incentives',
        desc: 'Exceptional per-cylinder margins with transparent and timely payout structures.',
        badge: 'Top Margins'
      },
      {
        id: 'flexibility',
        title: 'Flexible Work Model',
        desc: 'Choose between full-time or part-time delivery operating schedules.',
        badge: 'Full / Part Time'
      },
      {
        id: 'support',
        title: 'End-to-End Business Support',
        desc: 'Comprehensive assistance including local marketing, safety training, and operational setup.',
        badge: 'Full Agency Support'
      },
      {
        id: 'onboarding',
        title: 'Streamlined Onboarding',
        desc: 'Quick and simple registration process to become an official distributor or delivery partner.',
        badge: 'Fast Onboarding'
      },
      {
        id: 'bulk',
        title: 'Bulk Supply Capabilities',
        desc: 'Opportunity to serve large-scale commercial clients across industrial hubs and highway corridors.',
        badge: 'Highway & Industrial'
      }
    ]
  }
};

export const CYLINDER_PRODUCTS: CylinderProduct[] = [
  {
    id: 'bharat-19kg',
    brand: 'Bharat Gas',
    brandKey: 'bharat',
    nameEn: 'Bharat Gas 19kg Commercial LPG Cylinder',
    nameKn: 'ಭಾರತ್ ಗ್ಯಾಸ್ 19 ಕೆ.ಜಿ ಕಮರ್ಷಿಯಲ್ ಸಿಲಿಂಡರ್',
    capacity: '19 KG',
    typeEn: 'Commercial Heavy Duty (VOT / Red-Blue Band)',
    typeKn: 'ಕಮರ್ಷಿಯಲ್ ಬಳಕೆಗಾಗಿ (VOT / ಕೆಂಪು-ನೀಲಿ ಬ್ಯಾಂಡ್)',
    idealForEn: 'Restaurants, Hotels, Bakeries, Highway Dhabas, Fast Food Kitchens',
    idealForKn: 'ರೆಸ್ಟೋರೆಂಟ್‌ಗಳು, ಹೋಟೆಲ್‌ಗಳು, ಬೇಕರಿಗಳು, ಹೈವೇ ದಾಬಾಗಳು, ಫಾಸ್ಟ್ ಫುಡ್',
    featuresEn: [
      'High calorific flame efficiency with uniform blue flame',
      'Govt. certified BPCL standard cylinder with tamper-proof seal',
      'Monthly quota & non-quota regular doorstep supply',
      'Fast replacement guarantee across Nelamangala & Tumkur'
    ],
    featuresKn: [
      'ಏಕರೂಪದ ನೀಲಿ ಜ್ವಾಲೆಯೊಂದಿಗೆ ಗರಿಷ್ಠ ಉಷ್ಣ ದಕ್ಷತೆ',
      'BPCL ಪ್ರಮಾಣೀಕೃತ ಸಿಲಿಂಡರ್ ಮತ್ತು ಸುರಕ್ಷತಾ ಸೀಲ್',
      'ನೆಲಮಂಗಲ, ತುಮಕೂರು ಭಾಗದಲ್ಲಿ ನಿಯಮಿತ ಡೋರ್‌ಸ್ಟೆಪ್ ಡೆಲಿವರಿ',
      'ತುರ್ತು ಗ್ಯಾಸ್ ಖಾಲಿಯಾದಾಗ ತ್ವರಿತ ರೀಫಿಲ್ ಸೌಲಭ್ಯ'
    ],
    badgeEn: 'Best Seller for Hotels',
    badgeKn: 'ಹೋಟೆಲ್‌ಗಳಿಗೆ ನಂಬರ್ 1 ಆಯ್ಕೆ',
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
    nameEn: 'GoGas Elite Composite Lightweight Cylinders',
    nameKn: 'ಗೋಗ್ಯಾಸ್ ಎಲೈಟ್ ಲೈಟ್‌ವೇಟ್ ಕಾಂಪೋಸಿಟ್ ಸಿಲಿಂಡರ್',
    capacity: '10kg & 17kg',
    typeEn: 'Next-Gen Composite LPG (Visible Gas Level / 100% Rust-Proof)',
    typeKn: 'ಪಾರದರ್ಶಕ ಲೈಟ್‌ವೇಟ್ ಸಿಲಿಂಡರ್ (ಗ್ಯಾಸ್ ಮಟ್ಟ ಕಾಣುವ ವಿನ್ಯಾಸ)',
    idealForEn: 'Modern Cafes, Bakeries, Food Trucks, Cloud Kitchens, High-End Dining',
    idealForKn: 'ಆಧುನಿಕ ಕೆಫೆಗಳು, ಬೇಕರಿಗಳು, ಫುಡ್ ಟ್ರಕ್‌ಗಳು, ಕ್ಲೌಡ್ ಕಿಚನ್‌ಗಳು',
    featuresEn: [
      'Rust-proof, ultra-lightweight fiberglass composite casing',
      'Translucent outer body: visually check exact remaining LPG level',
      'Explosion-proof 3-layer construction compliant with international standards',
      'No floor rust stains; easy handling for kitchen staff'
    ],
    featuresKn: [
      'ತುಕ್ಕು ಹಿಡಿಯುವುದಿಲ್ಲ, ಅತ್ಯಂತ ಹಗುರವಾದ ಫೈಬರ್‌ಗ್ಲಾಸ್ ಬಾಡಿ',
      'ಪಾರದರ್ಶಕ ಸಿಲಿಂಡರ್ - ಗ್ಯಾಸ್ ಮಟ್ಟವನ್ನು ಹೊರಗಿನಿಂದಲೇ ನೋಡಬಹುದು',
      'ಸ್ಫೋಟ-ನಿರೋಧಕ ಅತ್ಯುನ್ನತ ಜಾಗತಿಕ ಸುರಕ್ಷತಾ ವಿನ್ಯಾಸ',
      'ನೆಲದ ಮೇಲೆ ತುಕ್ಕು ಕಲೆಗಳು ಬೀಳುವುದಿಲ್ಲ, ಸಾಗಿಸಲು ಅತ್ಯಂತ ಸುಲಭ'
    ],
    badgeEn: 'GoGas Elite Tech',
    badgeKn: 'ಪಾರದರ್ಶಕ & ತುಕ್ಕು ರಹಿತ',
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
    nameEn: 'Bharat Gas 45kg / 47.5kg Industrial LPG (LOT / VOT)',
    nameKn: 'ಭಾರತ್ ಗ್ಯಾಸ್ 45 / 47.5 ಕೆ.ಜಿ ಇಂಡಸ್ಟ್ರಿಯಲ್ ಸಿಲಿಂಡರ್ (LOT/VOT)',
    capacity: '45 KG / 47.5 KG',
    typeEn: 'Industrial & Bulk Commercial Consumption (Liquid Off-Take)',
    typeKn: 'ಕೈಗಾರಿಕಾ ಮತ್ತು ಬೃಹತ್ ಬಳಕೆಗಾಗಿ (LOT/VOT)',
    idealForEn: 'Large Industries, Food Processing, Marriage Halls, Mega Bakeries',
    idealForKn: 'ದೊಡ್ಡ ಕಾರ್ಖಾನೆಗಳು, ಆಹಾರ ಸಂಸ್ಕರಣಾ ಘಟಕಗಳು, ಕಲ್ಯಾಣ ಮಂಟಪಗಳು',
    featuresEn: [
      'Liquid Off-Take (LOT) technology for maximum high continuous gas flow',
      'Zero leftover residue inside cylinder body',
      'Ideal for multi-cylinder manifold systems',
      'Bulk delivery with free technical pipeline inspection'
    ],
    featuresKn: [
      'ಲಿಕ್ವಿಡ್ ಆಫ್-ಟೇಕ್ (LOT) ತಂತ್ರಜ್ಞಾನ - ನಿರಂತರ ಬೃಹತ್ ಗ್ಯಾಸ್ ಸರಬರಾಜು',
      'ಸಿಲಿಂಡರ್‌ನಲ್ಲಿ ಗ್ಯಾಸ್ ಉಳಿಯದ ಸಂಪೂರ್ಣ ದಹನ',
      'ಮ್ಯಾನಿಫೋಲ್ಡ್ ಪೈಪ್‌ಲೈನ್ ಸಿಸ್ಟಮ್‌ಗೆ ಅತ್ಯುತ್ತಮ',
      'ಉಚಿತ ಸುರಕ್ಷತಾ ತಪಾಸಣೆ ಮತ್ತು ತಾಂತ್ರಿಕ ಬೆಂಬಲ'
    ],
    badgeEn: 'Industrial LOT',
    badgeKn: 'ಕೈಗಾರಿಕಾ ಬೃಹತ್ ಬಳಕೆ',
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
    nameEn: 'Go Gas Commercial Series (17kg / 33kg / 45kg)',
    nameKn: 'ಗೋ ಗ್ಯಾಸ್ ಕಮರ್ಷಿಯಲ್ ಸರಣಿ (17kg / 33kg / 45kg)',
    capacity: '17 KG / 33 KG / 45 KG',
    typeEn: 'Private Commercial LPG Cylinder Range',
    typeKn: 'ಪ್ರೈವೇಟ್ ಕಮರ್ಷಿಯಲ್ ಎಲ್‌ಪಿಜಿ ಶ್ರೇಣಿ',
    idealForEn: 'Catering Centers, Cloud Kitchens, Canteens, Industrial Heating',
    idealForKn: 'ಕ್ಯಾಟರಿಂಗ್ ಸೇವೆಗಳು, ಕ್ಲೌಡ್ ಕಿಚನ್‌ಗಳು, ಕ್ಯಾಂಟೀನ್ ಮತ್ತು ಕೈಗಾರಿಕೆಗಳು',
    featuresEn: [
      'Flexible documentation & instant commercial connection without ration card',
      'Competitive private LPG pricing with 24/7 dedicated buffer stock',
      'Clean burning blue flame with zero soot or black smoke',
      'Doorstep swap and immediate dispatch across highway corridors'
    ],
    featuresKn: [
      'ಯಾವುದೇ ರೇಷನ್ ಕಾರ್ಡ್ ಇಲ್ಲದೆ ತಕ್ಷಣದ ಹೊಸ ಕಮರ್ಷಿಯಲ್ ಕನೆಕ್ಷನ್',
      'ಖಾಸಗಿ ವಲಯದ ಅತ್ಯುತ್ತಮ ಹಾಗೂ ಸ್ಪರ್ಧಾತ್ಮಕ ಬಲ್ಕ್ ದರ',
      'ಶುದ್ಧ ಅನಿಲ ಪ್ರವಾಹ - ಪಾತ್ರೆಗಳ ಮೇಲೆ ಕಪ್ಪು ಕಲೆ ರಹಿತ ದಹನ',
      'ಕರೆ ಮಾಡಿದ ಕೂಡಲೇ ಹೆದ್ದಾರಿ ಮತ್ತು ಗ್ರಾಮಾಂತರ ಪ್ರದೇಶಕ್ಕೆ ಡೆಲಿವರಿ'
    ],
    badgeEn: 'Instant Connection',
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
    nameEn: 'Power Gas Commercial & Industrial (19kg / 33kg / 45kg)',
    nameKn: 'ಪವರ್ ಗ್ಯಾಸ್ ಕಮರ್ಷಿಯಲ್ & ಇಂಡಸ್ಟ್ರಿಯಲ್ (19kg / 33kg / 45kg)',
    capacity: '19 KG / 33 KG / 45 KG',
    typeEn: 'High Pressure Heavy Commercial LPG',
    typeKn: 'ಹೈ ಪ್ರೆಶರ್ ಕಮರ್ಷಿಯಲ್ ಎಲ್‌ಪಿಜಿ',
    idealForEn: 'Highway Dhabas, Heavy Wok Kitchens, Sweet Stalls, Metallurgy',
    idealForKn: 'ಹೈವೇ ದಾಬಾಗಳು, ಸ್ವೀಟ್ ಸ್ಟಾಲ್‌ಗಳು, ಭಾರಿ ಭೋಜನಾಲಯಗಳು',
    featuresEn: [
      'Heavy-duty commercial burner compatibility for high-speed cooking',
      'High-pressure output ensuring intense thermal energy',
      'Reliable supply during peak festival and wedding seasons',
      'Double leak-check valve inspection before every dispatch'
    ],
    featuresKn: [
      'ಭಾರಿ ಕಮರ್ಷಿಯಲ್ ಬರ್ನರ್‌ಗಳಿಗೆ ಸೂಕ್ತವಾದ ಹೈ ಪ್ರೆಶರ್',
      'ಹಬ್ಬ ಹರಿದಿನಗಳು ಹಾಗೂ ಮದುವೆ ಸೀಸನ್‌ನಲ್ಲಿ ತಡೆರಹಿತ ಸರಬರಾಜು',
      'ಪ್ರತಿಯೊಂದು ಸಿಲಿಂಡರ್ ಡಬಲ್ ಸುರಕ್ಷತಾ ತಪಾಸಣೆ ನಂತರವೇ ಪೂರೈಕೆ',
      'ವಿಶೇಷ ಬಲ್ಕ್ ರಿಯಾಯಿತಿ ದರಗಳು ಲಭ್ಯ'
    ],
    badgeEn: 'High Pressure',
    badgeKn: 'ಶಕ್ತಿಶಾಲಿ ಜ್ವಾಲೆ',
    color: {
      primary: '#d97706', // Amber / Yellow
      secondary: '#b45309',
      bg: 'bg-amber-50',
      border: 'border-amber-200'
    }
  },
  {
    id: 'gogas-12kg',
    brand: 'Go Gas',
    brandKey: 'gogas',
    nameEn: 'Go Gas 12kg Commercial & Lab Cylinder',
    nameKn: 'ಗೋ ಗ್ಯಾಸ್ 12 ಕೆ.ಜಿ ಕಮರ್ಷಿಯಲ್ & ಲ್ಯಾಬ್ ಸಿಲಿಂಡರ್ (12KG)',
    capacity: '12 KG',
    typeEn: 'Compact Commercial & Testing Laboratory LPG (12KG)',
    typeKn: 'ಕಾಂಪ್ಯಾಕ್ಟ್ ಕಮರ್ಷಿಯಲ್ & ಲ್ಯಾಬ್ ಸಿಲಿಂಡರ್ (12KG)',
    idealForEn: 'Testing Laboratories, Food Kiosks, Mobile Stalls, Small Cafes',
    idealForKn: 'ಲ್ಯಾಬೋರೇಟರಿ, ಫುಡ್ ಕಿಯಾಸ್ಕ್‌ಗಳು, ಮೊಬೈಲ್ ಕ್ಯಾಂಟೀನ್‌ಗಳು, ಸಣ್ಣ ಕೆಫೆಗಳು',
    featuresEn: [
      'Compact 12kg commercial size designed for tight kitchen setups',
      'Easy carry handle and quick connect commercial valve',
      'Accurate factory filled weight with tamper proof seal',
      'Immediate counter pickup or doorstep delivery across corridors'
    ],
    featuresKn: [
      'ಸಣ್ಣ ಜಾಗಗಳಿಗೆ ಸೂಕ್ತವಾದ ಕಾಂಪ್ಯಾಕ್ಟ್ 12 ಕೆ.ಜಿ ಅಧಿಕೃತ ಗಾತ್ರ',
      'ಸಾಗಿಸಲು ಸುಲಭವಾದ ಹ್ಯಾಂಡಲ್ ಮತ್ತು ಕ್ವಿಕ್ ಕನೆಕ್ಟ್ ವಾಲ್ವ್',
      'ನಿಖರವಾದ ತೂಕ ಮತ್ತು ಅಧಿಕೃತ ಸುರಕ್ಷತಾ ಸೀಲ್',
      'ತಕ್ಷಣದ ಡೆಲಿವರಿ ಅಥವಾ ಕೌಂಟರ್ ಪಿಕ್‌ಅಪ್ ಸೌಲಭ್ಯ'
    ],
    badgeEn: 'Go Gas 12kg',
    badgeKn: 'ಗೋ ಗ್ಯಾಸ್ 12 ಕೆ.ಜಿ',
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
    titleEn: 'Fast & On-Time Doorstep Delivery',
    titleKn: 'ವೇಗದ ಮತ್ತು ಸಕಾಲಿಕ ಡೆಲಿವರಿ (Fast & On-Time Delivery)',
    descEn: 'We understand that commercial kitchens cannot pause. Our dedicated fleet ensures prompt same-day and scheduled deliveries across Nelamangala, Tumkur, Sira, and Bangalore Rural corridors.',
    descKn: 'ಹೋಟೆಲ್ ಮತ್ತು ಕೈಗಾರಿಕೆಗಳಲ್ಲಿ ಗ್ಯಾಸ್ ನಿಲ್ಲಬಾರದು ಎಂಬುದನ್ನು ಅರಿತು, ನಾವು ನೆಲಮಂಗಲ, ತುಮಕೂರು, ಶಿರಾ ಭಾಗಗಳಿಗೆ ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ವೇಗದ ಡೆಲಿವರಿ ನೀಡುತ್ತೇವೆ.',
    highlightsEn: ['Same-day express dispatch', 'Dedicated delivery trucks', 'Weekend & festival support', 'Live dispatch coordination'],
    highlightsKn: ['ಅದೇ ದಿನ ವೇಗದ ರವಾನೆ', 'ಸ್ವಂತ ಸರಬರಾಜು ವಾಹನಗಳ ನೆಟ್‌ವರ್ಕ್', 'ಹಬ್ಬ ಮತ್ತು ವಾರಾಂತ್ಯದಲ್ಲೂ ಸೇವೆ', 'ನೇರ ಫೋನ್ ಟ್ರ್ಯಾಕಿಂಗ್']
  },
  {
    id: 'pipeline-installation',
    iconName: 'Wrench',
    titleEn: 'Commercial Gas Pipeline Installation',
    titleKn: 'ಗ್ಯಾಸ್ ಪೈಪ್‌ಲೈನ್ ಇನ್‌ಸ್ಟಾಲೇಶನ್ (Commercial Pipeline)',
    descEn: 'End-to-end copper and high-pressure carbon steel gas pipeline installation for hotels, restaurants, industrial plants, and multi-burner commercial kitchens with safety valves.',
    descKn: 'ಹೋಟೆಲ್‌ಗಳು, ರೆಸ್ಟೋರೆಂಟ್‌ಗಳು ಮತ್ತು ಕಾರ್ಖಾನೆಗಳಿಗೆ ಸುಧಾರಿತ ತಂತ್ರಜ್ಞಾನದ ಕಾಪರ್ ಮತ್ತು ಸ್ಟೀಲ್ ಗ್ಯಾಸ್ ಪೈಪ್‌ಲೈನ್ ಅಳವಡಿಕೆ ಹಾಗೂ ಮ್ಯಾನಿಫೋಲ್ಡ್ ಸಿಸ್ಟಮ್ ಸರ್ವಿಸ್.',
    highlightsEn: ['Copper manifold setups', 'High-pressure regulators', 'Auto changeover manifolds', 'Safety leak pressure tests'],
    highlightsKn: ['ಕಾಪರ್ ಮ್ಯಾನಿಫೋಲ್ಡ್ ಸಿಸ್ಟಮ್', 'ಹೈ ಪ್ರೆಶರ್ ರೆಗ್ಯುಲೇಟರ್‌ಗಳು', 'ಆಟೋ ಚೇಂಜ್‌ಓವರ್ ಸೌಲಭ್ಯ', 'ಪ್ರೆಶರ್ ಟೆಸ್ಟಿಂಗ್ ಪ್ರಮಾಣಪತ್ರ']
  },
  {
    id: 'emergency-leak-inspection',
    iconName: 'ShieldAlert',
    titleEn: 'Emergency Gas Leakage Inspection & Safety Audit',
    titleKn: 'ತುರ್ತು ಲೀಕೇಜ್ ತಪಾಸಣೆ & ಸುರಕ್ಷತೆ (24/7 Safety)',
    descEn: 'Immediate response team for suspected gas smell, leakage inspection, valve replacements, and periodic commercial safety audits to prevent kitchen fire hazards.',
    descKn: 'ಗ್ಯಾಸ್ ವಾಸನೆ ಅಥವಾ ಲೀಕೇಜ್ ಕಂಡುಬಂದಲ್ಲಿ ತಕ್ಷಣದ ತುರ್ತು ತಪಾಸಣೆ, ವಾಲ್ವ್ ಬದಲಾವಣೆ ಮತ್ತು ಅಗ್ನಿ ಸುರಕ್ಷತಾ ತಪಾಸಣೆ ಸೇವೆ ದಿನದ 24 ಗಂಟೆಯೂ ಲಭ್ಯ.',
    highlightsEn: ['Immediate emergency visit', 'Electronic leak detection', 'Regulator & O-ring replacement', 'Safety training for kitchen staff'],
    highlightsKn: ['ತುರ್ತು ಸ್ಥಳ ಪರಿಶೀಲನೆ', 'ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಲೀಕ್ ಡಿಟೆಕ್ಟರ್ ಬಳಕೆ', 'ರೆಗ್ಯುಲೇಟರ್ & ಓ-ರಿಂಗ್ ಬದಲಾವಣೆ', 'ಅಡುಗೆ ಸಿಬ್ಬಂದಿಗೆ ಸುರಕ್ಷತಾ ಮಾಹಿತಿ']
  },
  {
    id: 'competitive-pricing',
    iconName: 'BadgePercent',
    titleEn: 'Best & Highly Competitive Bulk Pricing',
    titleKn: 'ಹೋಲಿಕೆಯಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಮತ್ತು ಸ್ಪರ್ಧಾತ್ಮಕ ದರಗಳು',
    descEn: 'Transparent, best-in-market bulk pricing for high-volume commercial consumers, catering organizations, marriage halls, and manufacturing units.',
    descKn: 'ಹೆಚ್ಚು ಸಿಲಿಂಡರ್ ಬಳಸುವ ಹೋಟೆಲ್‌ಗಳು, ಕ್ಯಾಟರಿಂಗ್ ಮತ್ತು ಕೈಗಾರಿಕೆಗಳಿಗೆ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿಯೇ ಅತ್ಯಂತ ಆಕರ್ಷಕ ಮತ್ತು ಸ್ಪರ್ಧಾತ್ಮಕ ಬಲ್ಕ್ ದರಗಳ ಸೌಲಭ್ಯ.',
    highlightsEn: ['Monthly updated lowest quotes', 'Bulk volume special rates', 'GST billing with proper invoices', 'Zero hidden delivery charges'],
    highlightsKn: ['ತಿಂಗಳ ತಾಜಾ ರಿಯಾಯಿತಿ ದರಗಳು', 'ಬಲ್ಕ್ ಆರ್ಡರ್‌ಗಳಿಗೆ ವಿಶೇಷ ಬೆಲೆ', 'ಜಿಎಸ್‌ಟಿ ಇನ್‌ವಾಯ್ಸ್ ಬಿಲ್ಲಿಂಗ್', 'ಯಾವುದೇ ಅಡಗಿದ ಶುಲ್ಕಗಳಿಲ್ಲ']
  }
];

export const CUSTOMER_SEGMENTS: CustomerSegment[] = [
  {
    id: 'hotels-restaurants',
    titleEn: 'Hotels, Restaurants & Bakeries',
    titleKn: 'ಹೋಟೆಲ್‌ಗಳು, ರೆಸ್ಟೋರೆಂಟ್‌ಗಳು ಮತ್ತು ಬೇಕರಿಗಳು 🍔',
    descEn: 'Uninterrupted commercial LPG supply with uniform blue flame to power busy hotel kitchens, tandoor ovens, woks, and bakery boilers.',
    descKn: 'ಹೋಟೆಲ್‌ಗಳು, ಬೇಕರಿಗಳು ಹಾಗೂ ರೆಸ್ಟೋರೆಂಟ್‌ಗಳಿಗೆ ನಿರಂತರವಾದ ನೀಲಿ ಜ್ವಾಲೆಯ ಕಮರ್ಷಿಯಲ್ ಸಿಲಿಂಡರ್‌ಗಳ ಸರಬರಾಜು.',
    icon: 'UtensilsCrossed',
    tagEn: 'High Priority Supply',
    tagKn: 'ಅಗ್ರ ಆದ್ಯತೆಯ ಸರಬರಾಜು'
  },
  {
    id: 'dhabas-catering',
    titleEn: 'Highway Dhabas & Catering Services',
    titleKn: 'ಹೈವೇ ದಾಬಾಗಳು ಮತ್ತು ಕ್ಯಾಟರಿಂಗ್ ಸರ್ವಿಸ್‌ಗಳು 🍛',
    descEn: 'Heavy duty high-pressure cylinders and portable multi-manifold solutions customized for outdoor catering, events, and highway food joints.',
    descKn: 'ಹೆದ್ದಾರಿ ದಾಬಾಗಳು ಮತ್ತು ಮದುವೆ ಸಮಾರಂಭಗಳ ಬೃಹತ್ ಅಡುಗೆಗೆ ಬೇಕಾದ ಹೈ-ಪ್ರೆಶರ್ ಸಿಲಿಂಡರ್ ಹಾಗೂ ಪೋರ್ಟಬಲ್ ಸೆಟಪ್.',
    icon: 'Truck',
    tagEn: 'Express Highway Delivery',
    tagKn: 'ಹೆದ್ದಾರಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಡೆಲಿವರಿ'
  },
  {
    id: 'kalyana-mantapa',
    titleEn: 'Marriage Halls & Party Conventions',
    titleKn: 'ಕಲ್ಯಾಣ ಮಂಟಪಗಳು ಮತ್ತು ಪಾರ್ಟಿ ಹಾಲ್ಗಳು 🏢',
    descEn: 'Large capacity 19kg & 47.5kg cylinder banks with safety regulators ensuring smooth cooking operations during mega marriage feasts and parties.',
    descKn: 'ಮದುವೆ ಸಮಾರಂಭಗಳು ಮತ್ತು ಪಾರ್ಟಿಗಳಿಗೆ ದೊಡ್ಡ ಪ್ರಮಾಣದ ಸಿಲಿಂಡರ್‌ಗಳು ಹಾಗೂ ಸುರಕ್ಷಿತ ಪೈಪ್‌ಲೈನ್ ಸಂಪರ್ಕ.',
    icon: 'Building2',
    tagEn: 'Event Bulk Booking',
    tagKn: 'ಸಮಾರಂಭ ಬಲ್ಕ್ ಬುಕಿಂಗ್'
  },
  {
    id: 'industries-factories',
    titleEn: 'Industries & Small Factories (Industrial Bulk)',
    titleKn: 'ಕೈಗಾರಿಕೆಗಳು ಮತ್ತು ಸಣ್ಣ ಫ್ಯಾಕ್ಟರಿಗಳು 🏭',
    descEn: 'Liquid Off-Take (LOT) bulk supply for powder coating, heating furnaces, metal cutting, textile processing, and manufacturing operations.',
    descKn: 'ಪೌಡರ್ ಕೋಟಿಂಗ್, ಹೀಟಿಂಗ್, ಮೆಟಲ್ ಕಟಿಂಗ್ ಮತ್ತು ಫ್ಯಾಕ್ಟರಿ ಉತ್ಪಾದನೆಗೆ ಅಗತ್ಯವಿರುವ ಕೈಗಾರಿಕಾ ಬಲ್ಕ್ LOT ಎಲ್‌ಪಿಜಿ ಪೂರೈಕೆ.',
    icon: 'Factory',
    tagEn: 'Industrial LOT Supply',
    tagKn: 'ಕೈಗಾರಿಕಾ LOT ಪೂರೈಕೆ'
  }
];

export const ACCESSORIES: AccessoryItem[] = [
  {
    id: 'acc-1',
    nameEn: 'Commercial Heavy-Duty Double / Triple Burner Stoves',
    nameKn: 'ಕಮರ್ಷಿಯಲ್ ಹೆವಿ ಡ್ಯೂಟಿ ಡಬಲ್ / ಟ್ರಿಪಲ್ ಬರ್ನರ್ ಸ್ಟೌಗಳು',
    categoryEn: 'Stoves & Burners',
    categoryKn: 'ಸ್ಟೌ ಮತ್ತು ಬರ್ನರ್‌ಗಳು',
    descEn: 'Cast iron high-BTU commercial burners designed for heavy cookware and intense cooking loads.'
    ,descKn: 'ಭಾರಿ ತೂಕದ ಪಾತ್ರೆಗಳಿಗೆ ಮತ್ತು ಹೆಚ್ಚು ಹೊತ್ತು ಅಡುಗೆ ಮಾಡಲು ಬಳಸುವ ಕ್ಯಾಸ್ಟ್ ಐರನ್ ಕಮರ್ಷಿಯಲ್ ಬರ್ನರ್‌ಗಳು.'
  },
  {
    id: 'acc-2',
    nameEn: 'High-Pressure Commercial Regulators (ISI Certified)',
    nameKn: 'ಹೈ ಪ್ರೆಶರ್ ಕಮರ್ಷಿಯಲ್ ರೆಗ್ಯುಲೇಟರ್‌ಗಳು (ISI ಪ್ರಮಾಣೀಕೃತ)',
    categoryEn: 'Regulators & Valves',
    categoryKn: 'ರೆಗ್ಯುಲೇಟರ್ ಮತ್ತು ವಾಲ್ವ್‌ಗಳು',
    descEn: 'Heavy duty brass pressure regulators with precise flow control knob and surge protection.',
    descKn: 'ಅಧಿಕ ಒತ್ತಡ ನಿಯಂತ್ರಣ ನೀಡುವ ಹಾಗೂ ಸುರಕ್ಷತೆ ಖಚಿತಪಡಿಸುವ ಭದ್ರ ಹಿತ್ತಾಳೆ ರೆಗ್ಯುಲೇಟರ್‌ಗಳು.'
  },
  {
    id: 'acc-3',
    nameEn: 'Suraksha Steel-Braided Commercial Gas Hose Pipes',
    nameKn: 'ಸುರಕ್ಷಾ ಸ್ಟೀಲ್ ಬ್ರೇಡೆಡ್ ಕಮರ್ಷಿಯಲ್ ಗ್ಯಾಸ್ ಪೈಪ್‌ಗಳು',
    categoryEn: 'Safety Hoses',
    categoryKn: 'ಸುರಕ್ಷತಾ ಪೈಪ್‌ಗಳು',
    descEn: 'Rodent-proof, fire-resistant multi-layered flexible steel braided LPG hose with zero leakage risk.',
    descKn: 'ಇಲಿ ಕಡಿಯದ, ಬೆಂಕಿ ನಿರೋಧಕ ಮತ್ತು ಉಕ್ಕಿನ ರಕ್ಷಾ ಕವಚ ಹೊಂದಿರುವ ಅಧಿಕೃತ ಗ್ಯಾಸ್ ಪೈಪ್‌ಗಳು.'
  },
  {
    id: 'acc-4',
    nameEn: 'Commercial Copper Pigtails & Manifold Valves',
    nameKn: 'ಕಾಪರ್ ಪಿಗ್‌ಟೇಲ್ಸ್ & ಮ್ಯಾನಿಫೋಲ್ಡ್ ವಾಲ್ವ್‌ಗಳು',
    categoryEn: 'Pipeline Fittings',
    categoryKn: 'ಪೈಪ್‌ಲೈನ್ ಫಿಟ್ಟಿಂಗ್ಸ್',
    descEn: 'High grade flexible copper tubing for connecting multi-cylinder banks to central cooking line.',
    descKn: 'ಬಹು ಸಿಲಿಂಡರ್‌ಗಳನ್ನು ಒಂದೇ ಕೇಂದ್ರ ಪೈಪ್‌ಲೈನ್‌ಗೆ ಜೋಡಿಸಲು ಬಳಸುವ ಗಟ್ಟಿ ಕಾಪರ್ ಟ್ಯೂಬ್‌ಗಳು.'
  },
  {
    id: 'acc-5',
    nameEn: 'Industrial Gas Leak Detectors & Pressure Gauges',
    nameKn: 'ಗ್ಯಾಸ್ ಲೀಕ್ ಡಿಟೆಕ್ಟರ್ & ಪ್ರೆಶರ್ ಮೀಟರ್‌ಗಳು',
    categoryEn: 'Safety Equipment',
    categoryKn: 'ಸುರಕ್ಷತಾ ಉಪಕರಣಗಳು',
    descEn: 'Electronic LPG sensory alarms and precision dial gauges to monitor pipeline cylinder pressure in real time.',
    descKn: 'ಪೈಪ್‌ಲೈನ್‌ನಲ್ಲಿ ಗ್ಯಾಸ್ ಒತ್ತಡ ಮತ್ತು ಸೋರಿಕೆಯನ್ನು ತಕ್ಷಣವೇ ಪತ್ತೆ ಹಚ್ಚುವ ಸೆನ್ಸರ್ ಉಪಕರಣಗಳು.'
  },
  {
    id: 'acc-6',
    nameEn: 'Commercial Heavy Tandoor & Bhatti Burners',
    nameKn: 'ಕಮರ್ಷಿಯಲ್ ತಂದೂರ್ & ಭಟ್ಟಿ ಬರ್ನರ್‌ಗಳು',
    categoryEn: 'Specialty Burners',
    categoryKn: 'ವಿಶೇಷ ಬರ್ನರ್‌ಗಳು',
    descEn: 'Specialized high-temperature heating jets engineered for traditional tandoor ovens and large bhatti vessels.',
    descKn: 'ದೊಡ್ಡ ಭಟ್ಟಿ ಹಾಗೂ ತಂದೂರ್ ಓವನ್‌ಗಳಿಗೆ ತೀವ್ರ ಶಾಖ ಒದಗಿಸುವ ವಿಶೇಷ ಹೈ-ಟೆಕ್ ಜೆಟ್‌ಗಳು.'
  }
];

export const SAFETY_GUIDELINES = {
  en: [
    {
      step: '1',
      title: 'Smell Gas? Do Not Panic',
      desc: 'If you detect pungent LPG odor, immediately instruct all kitchen staff to stop cooking and vacate open flame areas.'
    },
    {
      step: '2',
      title: 'Turn Off Cylinder & Manifold Valves',
      desc: 'Rotate the regulator switch / ball valve knob clockwise to the OFF position. Disconnect cylinders if safe to do so.'
    },
    {
      step: '3',
      title: 'No Electrical Switches or Mobile Lights',
      desc: 'Do NOT turn ON or OFF any electric switch, exhaust fan, or light in the area as sparks can ignite gas vapors.'
    },
    {
      step: '4',
      title: 'Ventilate & Open All Windows',
      desc: 'Open all doors and windows wide to let fresh air circulate and disperse heavy LPG gas accumulation at floor level.'
    },
    {
      step: '5',
      title: 'Call Sandhya Enterprises Emergency Hotline',
      desc: 'Dial our 24/7 technical hotline +91 8152889500 or WhatsApp +91 8152889500 immediately for emergency technician dispatch.'
    }
  ],
  kn: [
    {
      step: '೧',
      title: 'ಗ್ಯಾಸ್ ವಾಸನೆ ಬಂದರೆ ಆತಂಕಪಡಬೇಡಿ',
      desc: 'ಅಡುಗೆ ಮನೆಯಲ್ಲಿ ಗ್ಯಾಸ್ ವಾಸನೆ ಕಂಡುಬಂದರೆ ತಕ್ಷಣವೇ ಎಲ್ಲಾ ಬೆಂಕಿ ಜ್ವಾಲೆಗಳನ್ನು ನಂದಿಸಿ ಮತ್ತು ಸಿಬ್ಬಂದಿಯನ್ನು ಎಚ್ಚರಿಸಿ.'
    },
    {
      step: '೨',
      title: 'ಸಿಲಿಂಡರ್ ರೆಗ್ಯುಲೇಟರ್ & ವಾಲ್ವ್ ಆಫ್ ಮಾಡಿ',
      desc: 'ಸಿಲಿಂಡರ್ ರೆಗ್ಯುಲೇಟರ್ ಸ್ವಿಚ್ ಮತ್ತು ಮ್ಯಾನಿಫೋಲ್ಡ್ ಬಾಲ್ ವಾಲ್ವ್‌ಗಳನ್ನು ತಕ್ಷಣವೇ OFF ಸ್ಥಿತಿಗೆ ತಿರುಗಿಸಿ ಮುಚ್ಚಿರಿ.'
    },
    {
      step: '೩',
      title: 'ಯಾವುದೇ ವಿದ್ಯುತ್ ಸ್ವಿಚ್ ಮುಟ್ಟಬೇಡಿ',
      desc: 'ಫ್ಯಾನ್, ಲೈಟ್ ಅಥವಾ ಯಾವುದೇ ಎಲೆಕ್ಟ್ರಿಕ್ ಸ್ವಿಚ್‌ಗಳನ್ನು ಆನ್ ಅಥವಾ ಆಫ್ ಮಾಡಬೇಡಿ (ಸ್ಪಾರ್ಕ್ ಉಂಟಾಗುವುದನ್ನು ತಡೆಯಿರಿ).'
    },
    {
      step: '೪',
      title: 'ಕಿಟಕಿ ಮತ್ತು ಬಾಗಿಲುಗಳನ್ನು ಪೂರ್ಣ ತೆರೆಯಿರಿ',
      desc: 'ಗಾಳಿಯಾಡಲು ಎಲ್ಲಾ ಬಾಗಿಲು ಕಿಟಕಿಗಳನ್ನು ತೆರೆಯಿರಿ, ಇದರಿಂದ ನೆಲಮಟ್ಟದಲ್ಲಿ ಸಂಗ್ರಹವಾದ ಅನಿಲ ಬೇಗನೆ ಹೊರಹೋಗುತ್ತದೆ.'
    },
    {
      step: '೫',
      title: 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ತುರ್ತು ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ',
      desc: 'ತಕ್ಷಣವೇ ನಮ್ಮ 24/7 ತುರ್ತು ಮೊಬೈಲ್ ಸಂಖ್ಯೆ +91 8152889500 ಗೆ ಕರೆ ಮಾಡಿ ಅಥವಾ ವಾಟ್ಸಾಪ್ ಮಾಡಿ.'
    }
  ]
};

export const FAQS = [
  {
    qEn: 'Why are commercial LPG cylinder rates not displayed with fixed prices on the website?',
    qKn: 'ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಕಮರ್ಷಿಯಲ್ ಗ್ಯಾಸ್ ಸಿಲಿಂಡರ್‌ಗಳ ನಿಶ್ಚಿತ ಬೆಲೆಯನ್ನು ಏಕೆ ಹಾಕಿಲ್ಲ?',
    aEn: 'Commercial LPG prices are officially revised on the 1st of every month by the Government and Oil Marketing Companies based on global market indices. We always offer our customers the latest reduced daily bulk rates, discount slabs, and volume concessions. Please call or WhatsApp +91 8152889500 to get today’s best quote immediately.',
    aKn: 'ಸರ್ಕಾರ ಮತ್ತು ತೈಲ ಕಂಪನಿಗಳು ಪ್ರತಿ ತಿಂಗಳ 1ನೇ ತಾರೀಖು ಕಮರ್ಷಿಯಲ್ ಗ್ಯಾಸ್ ಬೆಲೆಯನ್ನು ಬದಲಾಯಿಸುತ್ತವೆ. ನಾವು ನಮ್ಮ ಗ್ರಾಹಕರಿಗೆ ಪ್ರತಿದಿನದ ಅತ್ಯಂತ ಕಡಿಮೆ ರಿಯಾಯಿತಿ ಮತ್ತು ಬಲ್ಕ್ ದರವನ್ನು ಒದಗಿಸುತ್ತೇವೆ. ಆದ್ದರಿಂದ ಇಂದಿನ ನಿಖರವಾದ ದರ ತಿಳಿಯಲು 8152889500 ಗೆ ಕರೆ ಅಥವಾ ವಾಟ್ಸಾಪ್ ಮಾಡಿ.'
  },
  {
    qEn: 'Which areas do you deliver commercial LPG cylinders to?',
    qKn: 'ನೀವು ಯಾವ್ಯಾವ ಪ್ರದೇಶಗಳಿಗೆ ಕಮರ್ಷಿಯಲ್ ಸಿಲಿಂಡರ್ ಡೆಲಿವರಿ ಮಾಡುತ್ತೀರಿ?',
    aEn: 'We deliver regular daily orders across Nelamangala Town, Nelamangala Rural, and Bengaluru Rural (PIN 562123). For Tumkur and Sira, we provide dedicated delivery for bulk orders (10–15+ cylinders) for big hotels, wedding halls, and industrial facilities.',
    aKn: 'ನೆಲಮಂಗಲ ಟೌನ್, ನೆಲಮಂಗಲ ಗ್ರಾಮಾಂತರ ಹಾಗೂ ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ (ಪಿನ್‌ಕೋಡ್ 562123) ಭಾಗಗಳಿಗೆ ದಿನನಿತ್ಯದ ನಿಯಮಿತ ಡೆಲಿವರಿ ಲಭ್ಯವಿದೆ. ತುಮಕೂರು ಮತ್ತು ಶಿರಾ ಭಾಗಗಳಿಗೆ ದೊಡ್ಡ ಹೋಟೆಲ್‌ಗಳು ಮತ್ತು ಕಲ್ಯಾಣ ಮಂಟಪಗಳಿಗೆ 10-15+ ಸಿಲಿಂಡರ್‌ಗಳ ಬಲ್ಕ್ ಆರ್ಡರ್‌ಗಳಿಗೆ ಮಾತ್ರ ಡೆಲಿವರಿ ಒದಗಿಸಲಾಗುತ್ತದೆ.'
  },
  {
    qEn: 'What LPG brands are available with Sandhya Enterprises?',
    qKn: 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್‌ನಲ್ಲಿ ಯಾವ ಪ್ರಮುಖ ಬ್ರ್ಯಾಂಡ್‌ಗಳು ಲಭ್ಯವಿವೆ?',
    aEn: 'We provide Bharat Gas (Commercial 19kg & 47.5kg Industrial), Go Gas (Private LPG Commercial 17kg/21kg/33kg), and Power Gas (Commercial & Domestic).',
    aKn: 'ನಮ್ಮಲ್ಲಿ ಭಾರತ್ ಗ್ಯಾಸ್ (Bharat Gas 19kg & 47.5kg), ಗೋ ಗ್ಯಾಸ್ (Go Gas 17kg/21kg/33kg), ಮತ್ತು ಪವರ್ ಗ್ಯಾಸ್ (Power Gas Commercial & Domestic) ಲಭ್ಯವಿವೆ.'
  },
  {
    qEn: 'Do you also install commercial kitchen gas pipelines and manifolds?',
    qKn: 'ನೀವು ಕಮರ್ಷಿಯಲ್ ಗ್ಯಾಸ್ ಪೈಪ್‌ಲೈನ್ ಮತ್ತು ಮ್ಯಾನಿಫೋಲ್ಡ್ ಇನ್‌ಸ್ಟಾಲೇಶನ್ ಮಾಡುತ್ತೀರಾ?',
    aEn: 'Yes! We have certified gas technicians specializing in commercial copper and steel pipeline installations, manifold changeover systems, leak testing, and pressure regulators for hotels, restaurants, and factories.',
    aKn: 'ಖಂಡಿತವಾಗಿ! ಹೋಟೆಲ್‌ಗಳು, ರೆಸ್ಟೋರೆಂಟ್‌ಗಳು, ಮದುವೆ ಸಭಾಂಗಣ ಮತ್ತು ಕಾರ್ಖಾನೆಗಳಿಗೆ ಅಧಿಕೃತ ಕಾಪರ್ ಮತ್ತು ಸ್ಟೀಲ್ ಗ್ಯಾಸ್ ಪೈಪ್‌ಲೈನ್ ಅಳವಡಿಕೆ, ಪ್ರೆಶರ್ ಟೆಸ್ಟಿಂಗ್ ಮತ್ತು ಸರ್ವಿಸ್ ಮಾಡಿಕೊಡುತ್ತೇವೆ.'
  }
];
