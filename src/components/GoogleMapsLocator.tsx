import React, { useState, useMemo } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap
} from '@vis.gl/react-google-maps';
import {
  MapPin,
  Navigation,
  PhoneCall,
  Clock,
  ShieldCheck,
  Truck,
  ExternalLink,
  Layers,
  KeyRound,
  Info
} from 'lucide-react';
import { Language } from '../types';
import { BUSINESS_INFO } from '../data/content';

export interface DepotLocation {
  id: string;
  nameEn: string;
  nameKn: string;
  typeEn: string;
  typeKn: string;
  position: { lat: number; lng: number };
  addressEn: string;
  addressKn: string;
  pincode: string;
  phone: string;
  hoursEn: string;
  hoursKn: string;
  stockEn: string;
  stockKn: string;
  coverageEn: string;
  coverageKn: string;
  mapsUrl: string;
}

export const DEPOTS: DepotLocation[] = [
  {
    id: 'nelamangala-ho',
    nameEn: 'Nelamangala Head Office & Master Godown',
    nameKn: 'ನೆಲಮಂಗಲ ಮುಖ್ಯ ಕಚೇರಿ ಮತ್ತು ಮಾಸ್ಟರ್ ಗೋದಾಮು',
    typeEn: 'Primary Supply Center & PESO Licensed Godown',
    typeKn: 'ಮುಖ್ಯ ವಿತರಣಾ ಕೇಂದ್ರ & ಪೆಸೊ ಅನುಮೋದಿತ ಗೋದಾಮು',
    position: { lat: 13.0988, lng: 77.3916 },
    addressEn: 'Near Old Toll Plaza, Main Road, Nelamangala Town, Bangalore Rural',
    addressKn: 'ಹಳೆ ಟೋಲ್ ಪ್ಲಾಜಾ ಹತ್ತಿರ, ಮುಖ್ಯ ರಸ್ತೆ, ನೆಲಮಂಗಲ ಪಟ್ಟಣ, ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ',
    pincode: '562123',
    phone: '8152889500',
    hoursEn: '24/7 Dispatch Desk (Standard Delivery: 7:00 AM - 9:00 PM)',
    hoursKn: '24/7 ಡಿಸ್ಪ್ಯಾಚ್ ಡೆಸ್ಕ್ (ಸಾಮಾನ್ಯ ಡೆಲಿವರಿ: ಬೆಳಿಗ್ಗೆ 7 - ರಾತ್ರಿ 9)',
    stockEn: 'Bharat Gas 19kg, 47.5kg VOT/LOT, Go Gas 21kg, Power Gas 19kg',
    stockKn: 'ಭಾರತ್ ಗ್ಯಾಸ್ 19ಕೆಜಿ, 47.5ಕೆಜಿ, ಗೋ ಗ್ಯಾಸ್ 21ಕೆಜಿ, ಪವರ್ ಗ್ಯಾಸ್ 19ಕೆಜಿ',
    coverageEn: 'Nelamangala Town, Sondekoppa, Madavara, T. Begur, Kuduregere',
    coverageKn: 'ನೆಲಮಂಗಲ ಪಟ್ಟಣ, ಸೋಂಡೇಕೊಪ್ಪ, ಮಾದಾವರ, ಟಿ. ಬೇಗೂರು, ಕುದುರೆಗೆರೆ',
    mapsUrl: 'https://maps.google.com/?q=13.0988,77.3916'
  },
  {
    id: 'dobbaspet-industrial',
    nameEn: 'Dobbaspet Industrial Bulk Depot',
    nameKn: 'ದಾಬಸ್‌ಪೇಟೆ ಕೈಗಾರಿಕಾ ಬೃಹತ್ ಗೋದಾಮು',
    typeEn: 'High-Volume Industrial VOT/LOT Manifold Hub',
    typeKn: 'ಬೃಹತ್ ಕೈಗಾರಿಕಾ ಮ್ಯಾನಿಫೋಲ್ಡ್ ಹಬ್',
    position: { lat: 13.2389, lng: 77.2412 },
    addressEn: 'KIADB Industrial Area, Phase 1, Tumkur Highway, Dobbaspet',
    addressKn: 'ಕೆಐಎಡಿಬಿ ಕೈಗಾರಿಕಾ ಪ್ರದೇಶ, ಹಂತ 1, ತುಮಕೂರು ಹೆದ್ದಾರಿ, ದಾಬಸ್‌ಪೇಟೆ',
    pincode: '562111',
    phone: '9902641042',
    hoursEn: '6:00 AM - 10:00 PM (Emergency Delivery on Call)',
    hoursKn: 'ಬೆಳಿಗ್ಗೆ 6 - ರಾತ್ರಿ 10 (ತುರ್ತು ಪೂರೈಕೆ ಲಭ್ಯ)',
    stockEn: 'Heavy Industrial 47.5kg Manifold Banks, 19kg Commercial',
    stockKn: 'ಬೃಹತ್ ಕೈಗಾರಿಕಾ 47.5ಕೆಜಿ ಬ್ಯಾಂಕ್ಸ್, 19ಕೆಜಿ ವಾಣಿಜ್ಯ ಸಿಲಿಂಡರ್',
    coverageEn: 'Dobbaspet KIADB, Sompura Industrial Zone, Shivagange Road',
    coverageKn: 'ದಾಬಸ್‌ಪೇಟೆ ಕೆಐಎಡಿಬಿ, ಸೋಂಪುರ ಕೈಗಾರಿಕಾ ವಲಯ, ಶಿವಗಂಗೆ ರಸ್ತೆ',
    mapsUrl: 'https://maps.google.com/?q=13.2389,77.2412'
  },
  {
    id: 'tumkur-regional',
    nameEn: 'Tumkur Regional Distribution Center',
    nameKn: 'ತುಮಕೂರು ಪ್ರಾದೇಶಿಕ ವಿತರಣಾ ಕೇಂದ್ರ',
    typeEn: 'Bulk Corridor Distribution (10-15+ Cylinders)',
    typeKn: 'ಬೃಹತ್ ಕಾರಿಡಾರ್ ಪೂರೈಕೆ (10-15+ ಸಿಲಿಂಡರ್)',
    position: { lat: 13.3409, lng: 77.101 },
    addressEn: 'Near Antharasanahalli Industrial Estate, NH-48, Tumkur',
    addressKn: 'ಅಂತರಸನಹಳ್ಳಿ ಕೈಗಾರಿಕಾ ಪ್ರದೇಶದ ಹತ್ತಿರ, ಎನ್‌ಎಚ್-48, ತುಮಕೂರು',
    pincode: '572106',
    phone: '8152889500',
    hoursEn: '7:00 AM - 8:30 PM (Daily Truck Routes)',
    hoursKn: 'ಬೆಳಿಗ್ಗೆ 7 - ರಾತ್ರಿ 8:30 (ದೈನಂದಿನ ಟ್ರಕ್ ಮಾರ್ಗಗಳು)',
    stockEn: 'Hotel & Banquet Commercial 19kg, Multi-Cylinder Racks',
    stockKn: 'ಹೋಟೆಲ್ & ಕಲ್ಯಾಣ ಮಂಟಪ 19ಕೆಜಿ, ಮಲ್ಟಿ-ಸಿಲಿಂಡರ್ ರಾಕ್ಸ್',
    coverageEn: 'Antharasanahalli, Tumkur Town Hotels, Batawadi, Kyathsandra',
    coverageKn: 'ಅಂತರಸನಹಳ್ಳಿ, ತುಮಕೂರು ಹೋಟೆಲ್‌ಗಳು, ಬಟವಾಡಿ, ಕ್ಯಾತ್ಸಂದ್ರ',
    mapsUrl: 'https://maps.google.com/?q=13.3409,77.1010'
  },
  {
    id: 'sira-highway',
    nameEn: 'Sira Highway Godown & Buffer Hub',
    nameKn: 'ಶಿರಾ ಹೆದ್ದಾರಿ ಗೋದಾಮು & ಬಫರ್ ಹಬ್',
    typeEn: 'Highway Dhaba & Bulk Corridor Station',
    typeKn: 'ಹೆದ್ದಾರಿ ಧಾಬಾ & ಬೃಹತ್ ಕಾರಿಡಾರ್ ಕೇಂದ್ರ',
    position: { lat: 13.7441, lng: 76.9069 },
    addressEn: 'NH-48 Corridor, Near Sira Bypass, Tumkur District',
    addressKn: 'ಎನ್‌ಎಚ್-48 ಕಾರಿಡಾರ್, ಶಿರಾ ಬೈಪಾಸ್ ಹತ್ತಿರ, ತುಮಕೂರು ಜಿಲ್ಲೆ',
    pincode: '572137',
    phone: '9902641042',
    hoursEn: '8:00 AM - 8:00 PM (Direct Delivery on Advance Booking)',
    hoursKn: 'ಬೆಳಿಗ್ಗೆ 8 - ರಾತ್ರಿ 8 (ಮುಂಗಡ ಬುಕಿಂಗ್ ಆಧಾರಿತ ಪೂರೈಕೆ)',
    stockEn: 'Commercial 19kg & 47.5kg VOT Cylinders',
    stockKn: 'ವಾಣಿಜ್ಯ 19ಕೆಜಿ & 47.5ಕೆಜಿ ಸಿಲಿಂಡರ್‌ಗಳು',
    coverageEn: 'Sira Town, Highway Dhabas, Kallambella, Tavarekere Belt',
    coverageKn: 'ಶಿರಾ ಪಟ್ಟಣ, ಹೆದ್ದಾರಿ ಧಾಬಾಗಳು, ಕಳ್ಳಂಬೆಳ್ಳ, ತಾವರೆಕೆರೆ',
    mapsUrl: 'https://maps.google.com/?q=13.7441,76.9069'
  }
];

interface GoogleMapsLocatorProps {
  lang: Language;
}

// Controller component to smoothly pan and zoom map
const MapController: React.FC<{ selectedDepot: DepotLocation | null }> = ({ selectedDepot }) => {
  const map = useMap();
  React.useEffect(() => {
    if (!map || !selectedDepot) return;
    map.panTo(selectedDepot.position);
    map.setZoom(13);
  }, [map, selectedDepot]);

  return null;
};

export const GoogleMapsLocator: React.FC<GoogleMapsLocatorProps> = ({ lang }) => {
  const [selectedDepotId, setSelectedDepotId] = useState<string>('nelamangala-ho');
  const [infoWindowOpen, setInfoWindowOpen] = useState<boolean>(true);

  // Read Maps API key from environment variable
  const apiKey = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY || '';

  const selectedDepot = useMemo(
    () => DEPOTS.find((d) => d.id === selectedDepotId) || DEPOTS[0],
    [selectedDepotId]
  );

  return (
    <section id="depot-locations-map" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-orange-100 text-orange-950 text-[10px] font-black uppercase tracking-wider border border-orange-200 mb-2">
              <MapPin className="w-3.5 h-3.5 text-orange-600" />
              <span>
                {lang === 'kn' ? 'ಲೈವ್ ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ನಕ್ಷೆ' : 'LIVE GOOGLE MAPS DEPOT LOCATOR'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
              {lang === 'kn' ? (
                <>
                  ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್{' '}
                  <span className="text-orange-600">ವಿತರಣಾ ಡಿಪೋಗಳು & ಗೋದಾಮುಗಳು</span>
                </>
              ) : (
                <>
                  Sandhya Enterprises{' '}
                  <span className="text-orange-600">Distribution Depots & Godowns</span>
                </>
              )}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
              {lang === 'kn'
                ? 'ನೆಲಮಂಗಲ, ದಾಬಸ್‌ಪೇಟೆ, ತುಮಕೂರು ಮತ್ತು ಶಿರಾ ಕಾರಿಡಾರ್‌ನಲ್ಲಿರುವ ನಮ್ಮ ಅಧಿಕೃತ ಗೋದಾಮುಗಳ ಲೈವ್ ಜಿಯೋ-ಲೊಕೇಶನ್. ತ್ವರಿತ ಮಾರ್ಗ ಮತ್ತು ಡೆಲಿವರಿ ವ್ಯಾಪ್ತಿ ಪರಿಶೀಲಿಸಿ.'
                : 'Explore our official PESO-licensed cylinder godowns and bulk supply hubs across Nelamangala, Dobbaspet, Tumkur, and Sira.'}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-black text-slate-900">4 Active Hubs</span>
            </div>
            <div className="h-4 w-px bg-slate-300" />
            <span className="text-slate-600 font-bold">NH-48 Corridor</span>
          </div>
        </div>

        {/* Depot Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 no-scrollbar">
          {DEPOTS.map((depot) => {
            const isSelected = depot.id === selectedDepotId;
            return (
              <button
                key={depot.id}
                type="button"
                onClick={() => {
                  setSelectedDepotId(depot.id);
                  setInfoWindowOpen(true);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-orange-600'}`} />
                <span>{lang === 'kn' ? depot.nameKn.split(' ')[0] : depot.nameEn.split(' ')[0]}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-orange-700 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {depot.pincode}
                </span>
              </button>
            );
          })}
        </div>

        {/* Map Stage and Depot Detail Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
          {/* Interactive Google Map Container */}
          <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 relative">
            {apiKey ? (
              // Official Google Maps Platform React Component (@vis.gl/react-google-maps)
              <div className="w-full h-[460px] min-h-[440px] relative">
                <APIProvider apiKey={apiKey} libraries={['places', 'marker']}>
                  <Map
                    defaultCenter={{ lat: 13.0988, lng: 77.3916 }}
                    defaultZoom={11}
                    mapId="DEMO_MAP_ID"
                    className="w-full h-full"
                    style={{ width: '100%', height: '100%', minHeight: '440px' }}
                    internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                    gestureHandling="greedy"
                    fullscreenControl={true}
                    streetViewControl={false}
                    mapTypeControl={false}
                  >
                    <MapController selectedDepot={selectedDepot} />

                    {/* Depot Markers */}
                    {DEPOTS.map((depot) => {
                      const isSelected = depot.id === selectedDepotId;
                      return (
                        <AdvancedMarker
                          key={depot.id}
                          position={depot.position}
                          title={lang === 'kn' ? depot.nameKn : depot.nameEn}
                          onClick={() => {
                            setSelectedDepotId(depot.id);
                            setInfoWindowOpen(true);
                          }}
                        >
                          <div
                            className={`px-2.5 py-1.5 rounded-xl font-black text-xs shadow-lg flex items-center gap-1.5 transition-transform duration-200 border ${
                              isSelected
                                ? 'bg-orange-600 text-white border-white scale-110 ring-2 ring-orange-400'
                                : 'bg-slate-900 text-white border-slate-700 hover:scale-105'
                            }`}
                          >
                            <Truck className="w-3.5 h-3.5 text-orange-400" />
                            <span className="whitespace-nowrap">
                              {lang === 'kn' ? depot.nameKn.split(' ')[0] : depot.nameEn.split(' ')[0]}
                            </span>
                          </div>
                        </AdvancedMarker>
                      );
                    })}

                    {/* Interactive InfoWindow */}
                    {infoWindowOpen && selectedDepot && (
                      <InfoWindow
                        position={selectedDepot.position}
                        onCloseClick={() => setInfoWindowOpen(false)}
                      >
                        <div className="p-1 max-w-xs space-y-1.5 text-slate-900 font-sans">
                          <div className="font-black text-xs text-orange-700 uppercase">
                            {lang === 'kn' ? selectedDepot.nameKn : selectedDepot.nameEn}
                          </div>
                          <p className="text-[11px] text-slate-600 leading-snug">
                            {lang === 'kn' ? selectedDepot.addressKn : selectedDepot.addressEn}
                          </p>
                          <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[10px]">
                            <span className="font-bold text-slate-700">📞 +91 {selectedDepot.phone}</span>
                            <a
                              href={selectedDepot.mapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-orange-600 font-black hover:underline flex items-center gap-0.5"
                            >
                              <span>Directions</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </div>
                      </InfoWindow>
                    )}
                  </Map>
                </APIProvider>
              </div>
            ) : (
              // Live Interactive Google Map Frame with zero-cost Quickstart overlay
              <div className="w-full h-[460px] min-h-[440px] relative flex flex-col bg-slate-100">
                <iframe
                  title={lang === 'kn' ? selectedDepot.nameKn : selectedDepot.nameEn}
                  src={`https://maps.google.com/maps?q=${selectedDepot.position.lat},${selectedDepot.position.lng}&z=14&output=embed`}
                  className="w-full h-full min-h-[440px] border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer"
                />

                {/* Live Controls & Maps Demo Key Badge */}
                <div className="absolute top-3 left-3 right-3 sm:right-auto z-10 max-w-md bg-slate-950/92 backdrop-blur-sm text-white p-3 rounded-xl border border-slate-800 shadow-lg text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 font-black text-orange-400 truncate">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{lang === 'kn' ? selectedDepot.nameKn : selectedDepot.nameEn}</span>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 whitespace-nowrap">
                      ● Google Maps Live
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                    {lang === 'kn'
                      ? 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ನೇರ ವೀಕ್ಷಣೆ. ಅಡ್ವಾನ್ಸ್‌ಡ್ ಮಾರ್ಕರ್‌ಗಳಿಗಾಗಿ ಉಚಿತ Maps Demo Key ಅನ್ನು VITE_GOOGLE_MAPS_API_KEY ನಲ್ಲಿ ಕಾನ್ಫಿಗರ್ ಮಾಡಿ.'
                      : 'Live Google Maps embedded view. Use the free Maps Demo Key in VITE_GOOGLE_MAPS_API_KEY to activate Advanced Marker SDK.'}
                  </p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <a
                      href="https://mapsplatform.google.com/maps-demo-key?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-[10px] font-black uppercase tracking-wider transition-colors shadow-xs"
                    >
                      <KeyRound className="w-3 h-3" />
                      <span>Get Free Demo Key</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                    <a
                      href={selectedDepot.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold border border-slate-700"
                    >
                      <Navigation className="w-3 h-3 text-orange-400" />
                      <span>Directions</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Selected Depot Full Specifications Card */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">
                    {lang === 'kn' ? 'ಆಯ್ಕೆ ಮಾಡಲಾದ ಡಿಪೋ ವಿವರ' : 'SELECTED DEPOT PROFILE'}
                  </span>
                  <h3 className="text-base font-black text-slate-900 mt-0.5">
                    {lang === 'kn' ? selectedDepot.nameKn : selectedDepot.nameEn}
                  </h3>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                    {lang === 'kn' ? selectedDepot.typeKn : selectedDepot.typeEn}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 border border-orange-200 flex-shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
              </div>

              {/* Specs List */}
              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    {lang === 'kn' ? 'ವಿಳಾಸ & ಪಿನ್‌ಕೋಡ್' : 'Location Address'}
                  </span>
                  <p className="text-slate-700 font-medium leading-relaxed mt-0.5">
                    {lang === 'kn' ? selectedDepot.addressKn : selectedDepot.addressEn} (PIN: {selectedDepot.pincode})
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    {lang === 'kn' ? 'ಕಾರ್ಯಾಚರಣಾ ಸಮಯ' : 'Operating Hours'}
                  </span>
                  <p className="text-slate-800 font-bold mt-0.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-orange-600" />
                    <span>{lang === 'kn' ? selectedDepot.hoursKn : selectedDepot.hoursEn}</span>
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    {lang === 'kn' ? 'ಲಭ್ಯವಿರುವ ಸಿಲಿಂಡರ್ ದಾಸ್ತಾನು' : 'Stock & Cylinder Varieties'}
                  </span>
                  <p className="text-slate-800 font-semibold mt-0.5">
                    {lang === 'kn' ? selectedDepot.stockKn : selectedDepot.stockEn}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    {lang === 'kn' ? 'ಡೆಲಿವರಿ ವ್ಯಾಪ್ತಿ ಪ್ರದೇಶಗಳು' : 'Express Delivery Coverage'}
                  </span>
                  <p className="text-slate-600 text-[11px] font-medium mt-0.5">
                    {lang === 'kn' ? selectedDepot.coverageKn : selectedDepot.coverageEn}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
                <a
                  href={`tel:${selectedDepot.phone}`}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
                  <span>Call {selectedDepot.phone}</span>
                </a>

                <a
                  href={selectedDepot.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </a>
              </div>
            </div>

            {/* Safety & Compliance Badge */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-slate-900">PESO & Explosives Licensed Godowns</div>
                <div className="text-[10px] text-slate-500">Certified storage under Gas Cylinders Rules 2016</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
