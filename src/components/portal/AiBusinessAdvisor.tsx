import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  Flame,
  TrendingDown,
  ChefHat,
  ShieldAlert,
  Search,
  ExternalLink,
  RotateCcw,
  Copy,
  Check,
  PhoneCall,
  MessageCircle,
  HelpCircle,
  Layers,
  ArrowRight,
  Calculator,
  Gauge,
  FileText,
  MessageSquare
} from 'lucide-react';
import { Language, CustomerAccount } from '../../types';
import { BUSINESS_INFO } from '../../data/content';
import { EventFeastCalculator } from './EventFeastCalculator';
import { KitchenEnergyAuditor } from './KitchenEnergyAuditor';
import { RateBenchmarkLedger } from './RateBenchmarkLedger';

interface AiBusinessAdvisorProps {
  lang: Language;
  customer?: CustomerAccount | null;
  onOpenOrderModal?: () => void;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  time: string;
  grounding?: {
    webSearchQueries?: string[];
    groundingChunks?: Array<{
      web?: {
        uri?: string;
        title?: string;
      };
    }>;
  } | null;
  mode?: string;
}

export const PRESET_ADVICE = [
  {
    icon: Flame,
    titleEn: 'Flame Tuning: Save 15-20% Gas',
    titleKn: 'ಜ್ವಾಲೆಯ ಹೊಂದಾಣಿಕೆ: 15-20% ಗ್ಯಾಸ್ ಉಳಿಸಿ',
    descEn: 'Yellow flame indicates unburnt LPG and carbon soot. Adjust burner air shutters until a crisp inner blue cone is formed to maximize calorific heat transfer.',
    descKn: 'ಹಳದಿ ಜ್ವಾಲೆಯು ಗ್ಯಾಸ್ ವ್ಯರ್ಥವಾಗುವುದರ ಸಂಕೇತ. ಬರ್ನರ್ ಏರ್-ಕಪ್ ಹೊಂದಿಸಿ ಸಂಪೂರ್ಣ ನೀಲಿ ಜ್ವಾಲೆ (Blue Flame) ಪಡೆಯುವುದರಿಂದ ಗರಿಷ್ಠ ಶಾಖ ಉತ್ಪತ್ತಿಯಾಗಿ ಗ್ಯಾಸ್ ಉಳಿತಾಯವಾಗುತ್ತದೆ.'
  },
  {
    icon: TrendingDown,
    titleEn: 'Optimal Vessel Sizing & Lids',
    titleKn: 'ಪಾತ್ರೆಗೆ ತಕ್ಕ ಬರ್ನರ್ & ಮುಚ್ಚಳ ಬಳಕೆ',
    descEn: 'Flames licking past vessel edges waste up to 25% energy. Always size flame to base diameter and keep cooking cauldrons tightly covered during boiling.',
    descKn: 'ಪಾತ್ರೆಯ ಅಂಚಿನಿಂದ ಹೊರಗೆ ಬರುವ ಜ್ವಾಲೆಯು 25% ಇಂಧನ ವ್ಯರ್ಥ ಮಾಡುತ್ತದೆ. ಪಾತ್ರೆಯ ಗಾತ್ರಕ್ಕೆ ತಕ್ಕ ಬರ್ನರ್ ಬಳಸಿ ಮತ್ತು ಕುದಿಸುವಾಗ ಮುಚ್ಚಳ ಮುಚ್ಚಿ.'
  },
  {
    icon: ChefHat,
    titleEn: 'Bulk Planning for Weekend Rush',
    titleKn: 'ವಾರಾಂತ್ಯದ ವ್ಯಾಪಾರಕ್ಕೆ ಸಿಲಿಂಡರ್ ಯೋಜನೆ',
    descEn: 'Switching high-heat gravies and sambar boiling to 47.5kg Industrial cylinders or dual-cylinder manifold prevents mid-service pressure drops and kitchen delays.',
    descKn: 'ವಾರಾಂತ್ಯ ಅಥವಾ ಹಬ್ಬದ ದಿನಗಳಲ್ಲಿ 47.5kg ಇಂಡಸ್ಟ್ರಿಯಲ್ ಅಥವಾ ಮಲ್ಟಿ-ಸಿಲಿಂಡರ್ ಮ್ಯಾನಿಫೋಲ್ಡ್ ಬಳಸಿದರೆ ಗ್ಯಾಸ್ ಪ್ರೆಶರ್ ಕಡಿಮೆಯಾಗದೆ ವೇಗವಾಗಿ ಅಡುಗೆ ತಯಾರಾಗುತ್ತದೆ.'
  },
  {
    icon: ShieldAlert,
    titleEn: 'Commercial O-Ring & Regulator Safety',
    titleKn: 'ಕಮರ್ಷಿಯಲ್ ವಾಲ್ವ್ & O-ರಿಂಗ್ ಸುರಕ್ಷತೆ',
    descEn: 'Inspect rubber washer/O-ring at every cylinder swap using soap bubble solution. Never strike valve pins with metal tools. Call Sandhya 24/7 hotline if stiff.',
    descKn: 'ಪ್ರತಿ ಬಾರಿ ಸಿಲಿಂಡರ್ ಬದಲಾಯಿಸುವಾಗ ರಬ್ಬರ್ O-ರಿಂಗ್ ಪರಿಶೀಲಿಸಿ. ಸೋಪ್ ನೊರೆ ಪರೀಕ್ಷೆ ಮಾಡಿ. ಯಾವುದೇ ಲೀಕೇಜ್ ಅನುಮಾನವಿದ್ದರೆ ತಕ್ಷಣ 8152889500 ಗೆ ಕರೆ ಮಾಡಿ.'
  }
];

export const AiBusinessAdvisor: React.FC<AiBusinessAdvisorProps> = ({
  lang,
  customer,
  onOpenOrderModal
}) => {
  const [selectedRole, setSelectedRole] = useState<'commercial_hotel' | 'catering_marriage' | 'bakery_sweets' | 'industrial_canteen'>('commercial_hotel');
  const [activeTab, setActiveTab] = useState<'chat' | 'feast_calc' | 'burner_audit' | 'rates_gst'>('chat');
  const [enableSearch, setEnableSearch] = useState<boolean>(true);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleTransferToAi = (promptText: string) => {
    setActiveTab('chat');
    handleSendMessage(promptText);
  };

  const initialGreeting: ChatMessage = {
    role: 'model',
    content: lang === 'kn'
      ? `ನಮಸ್ಕಾರ ${customer ? customer.businessName : 'ಗೌರವಾನ್ವಿತ ಗ್ರಾಹಕರೇ'}! 
ನಾನು ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ (Sandhya Enterprises) ಅಧಿಕೃತ ವಾಣಿಜ್ಯ ಎಲ್‌ಪಿಜಿ ಮತ್ತು ವ್ಯವಹಾರ ವೃದ್ಧಿ AI ಸಲಹೆಗಾರ.

ನಮ್ಮ ವಿಶೇಷತೆಗಳು:
• **ಅಧಿಕೃತ ಮಾಹಿತಿ**: ಭಾರತ್ ಗ್ಯಾಸ್ 19kg & 47.5kg ಇಂಡಸ್ಟ್ರಿಯಲ್, ಗೋ ಗ್ಯಾಸ್ ಹಾಗೂ ಪವರ್ ಗ್ಯಾಸ್ ವಿತರಣೆ (ನೆಲಮಂಗಲ, ದಾಬಸ್‌ಪೇಟೆ, ತುಮಕೂರು, ಶಿರಾ).
• **ಗ್ಯಾಸ್ ಉಳಿತಾಯ**: ಹೋಟೆಲ್ ಮಾಸಿಕ ಬಿಲ್‌ನಲ್ಲಿ 15-20% ಉಳಿತಾಯ ತಂತ್ರಗಳು ಮತ್ತು ಬರ್ನರ್ ಟ್ಯೂನಿಂಗ್.
• **ಗೂಗಲ್ ಸರ್ಚ್ ಡಾಟಾ**: ಇಂದಿನ ಪ್ರಚಲಿತ ಮಾರುಕಟ್ಟೆ ದರಗಳು ಮತ್ತು ಎಲ್‌ಪಿಜಿ ನಿಯಮಗಳು.
• **ಕ್ಯಾಟರಿಂಗ್ ಲೆಕ್ಕಾಚಾರ**: ಮದುವೆ ಊಟ, ಸಮಾರಂಭಗಳಿಗೆ ಸಿಲಿಂಡರ್ ಅಂದಾಜು.

ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ ಅಥವಾ ಕೆಳಗಿನ ಆಯ್ಕೆಗಳನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ!`
      : `Greetings ${customer ? customer.businessName : 'Valued Partner'}! 
I am the Official Sandhya Enterprises Commercial LPG & Business Growth AI Advisor.

How I can help you today:
• **Official LPG Supply**: Bharat Gas 19kg & 47.5kg Industrial, Go Gas & Power Gas across Nelamangala, Dobbaspet, Tumkur, and Sira.
• **Cost Reduction**: Techniques to trim commercial kitchen gas bills by 15-20% and balance air-to-gas flame ratios.
• **Live Search Grounding**: Up-to-date commercial rates, OMC policy notices, and industry standards powered by Google Search.
• **Banquet & Event Planning**: Accurate cylinder requirements for weddings, canteens, and bulk catering.

Feel free to type your question or select from the quick prompts below!`,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    mode: 'gemini-3.5-flash'
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || inputPrompt).trim();
    if (!messageContent || isThinking) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: messageContent,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputPrompt('');
    setIsThinking(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content
          })),
          lang,
          enableSearch,
          clientRole: selectedRole
        })
      });

      const data = await response.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'model',
            content: data.reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            grounding: data.grounding,
            mode: data.mode
          }
        ]);
      } else {
        throw new Error(data.error || 'No response returned');
      }
    } catch (err: any) {
      console.error('[AI Chat Error]:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: lang === 'kn'
            ? 'ನಮಸ್ಕಾರ! ತಾಂತ್ರಿಕ ಸಂಪರ್ಕದಲ್ಲಿ ಸಣ್ಣ ವ್ಯತ್ಯಯವಾಗಿದೆ. ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ತುರ್ತು ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ: +91 8152889500.'
            : 'Unable to reach the AI engine right now. For urgent queries, please call Sandhya Enterprises at +91 8152889500.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          mode: 'offline'
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([initialGreeting]);
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-orange-950 p-4 sm:p-5 rounded-2xl border border-slate-800 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="p-3 rounded-xl bg-orange-600 text-white shadow-md shadow-orange-600/30 flex-shrink-0">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">
                  SANDHYA ENTERPRISES • GEMINI 3.5 AI
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ONLINE ASSISTANT
                </span>
                {enableSearch && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                    <Search className="w-2.5 h-2.5" />
                    GOOGLE SEARCH GROUNDING
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white">
                {lang === 'kn' ? 'ವಾಣಿಜ್ಯ ಎಲ್‌ಪಿಜಿ & ಹೋಟೆಲ್ ವ್ಯವಹಾರ ವೃದ್ಧಿ AI ಸಲಹೆಗಾರ' : 'Commercial LPG & Kitchen Efficiency AI Advisor'}
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed mt-0.5">
                {lang === 'kn'
                  ? 'ಸಂಧ್ಯಾ ಎಂಟರ್‌ಪ್ರೈಸಸ್ ಅಧಿಕೃತ ಮಾಹಿತಿ, ಗ್ಯಾಸ್ ಬಿಲ್ ಉಳಿತಾಯ, ಬರ್ನರ್ ಟ್ಯೂನಿಂಗ್, ಮದುವೆ ಊಟ ಸಿಲಿಂಡರ್ ಲೆಕ್ಕಾಚಾರ ಹಾಗೂ ಗೂಗಲ್ ಸರ್ಚ್ ನೈಜ ಸಮಯದ ದರಗಳು.'
                  : 'Official agency insights, energy saving protocols, wedding catering volume estimates, and real-time market grounding powered by Google Search.'}
              </p>
            </div>
          </div>

          {/* Quick Actions & Role Picker */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <a
              href={`tel:${BUSINESS_INFO.phonePrimary}`}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
              <span>+91 {BUSINESS_INFO.phonePrimary}</span>
            </a>
            {onOpenOrderModal && (
              <button
                type="button"
                onClick={onOpenOrderModal}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>{lang === 'kn' ? '1-ಕ್ಲಿಕ್ ಸಿಲಿಂಡರ್ ಬುಕ್ಕಿಂಗ್' : '1-Click Order'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Official Suite Tab Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('chat')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === 'chat'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/70'
          }`}
        >
          <Bot className="w-4 h-4 text-orange-400" />
          <span>{lang === 'kn' ? 'AI ಸಲಹೆಗಾರ ಚಾಟ್' : 'AI Advisor Console'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('feast_calc')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === 'feast_calc'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/70'
          }`}
        >
          <Calculator className="w-4 h-4 text-orange-400" />
          <span>{lang === 'kn' ? 'ಮದುವೆ & ಕ್ಯಾಟರಿಂಗ್ ಲೆಕ್ಕಾಚಾರ' : 'Banquet Cylinder Calculator'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('burner_audit')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === 'burner_audit'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/70'
          }`}
        >
          <Gauge className="w-4 h-4 text-orange-400" />
          <span>{lang === 'kn' ? 'ಕಿಚನ್ ಬರ್ನರ್ & ಇಂಧನ ಆಡಿಟ್' : 'Kitchen Burner Energy Audit'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('rates_gst')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === 'rates_gst'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/70'
          }`}
        >
          <FileText className="w-4 h-4 text-orange-400" />
          <span>{lang === 'kn' ? 'ದರ & 18% ಜಿಎಸ್‌ಟಿ ಲೆಡ್ಜರ್' : 'Rates & 18% GST Ledger'}</span>
        </button>
      </div>

      {activeTab === 'feast_calc' && (
        <EventFeastCalculator
          lang={lang}
          onTransferToAi={handleTransferToAi}
          onOpenOrderModal={onOpenOrderModal}
        />
      )}

      {activeTab === 'burner_audit' && (
        <KitchenEnergyAuditor
          lang={lang}
          onTransferToAi={handleTransferToAi}
          onOpenOrderModal={onOpenOrderModal}
        />
      )}

      {activeTab === 'rates_gst' && (
        <RateBenchmarkLedger
          lang={lang}
          onTransferToAi={handleTransferToAi}
          onOpenOrderModal={onOpenOrderModal}
        />
      )}

      {activeTab === 'chat' && (
        <>
          {/* Role & Grounding Controls */}
          <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-orange-600" />
            {lang === 'kn' ? 'ನಿಮ್ಮ ವ್ಯವಹಾರ ಶ್ರೇಣಿ:' : 'Business Profile:'}
          </span>
          <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
            <button
              type="button"
              onClick={() => setSelectedRole('commercial_hotel')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                selectedRole === 'commercial_hotel'
                  ? 'bg-orange-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'kn' ? 'ಹೋಟೆಲ್ & ರೆಸ್ಟೋರೆಂಟ್' : 'Hotel / Restaurant'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('catering_marriage')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                selectedRole === 'catering_marriage'
                  ? 'bg-orange-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'kn' ? 'ಮದುವೆ & ಕ್ಯಾಟರಿಂಗ್' : 'Banquet / Catering'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('bakery_sweets')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                selectedRole === 'bakery_sweets'
                  ? 'bg-orange-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'kn' ? 'ಬೇಕರಿ & ಸಿಹಿತಿಂಡಿ' : 'Bakery & Sweets'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('industrial_canteen')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                selectedRole === 'industrial_canteen'
                  ? 'bg-orange-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'kn' ? 'ಫ್ಯಾಕ್ಟರಿ & ಕ್ಯಾಂಟೀನ್' : 'Factory / Canteen'}
            </button>
          </div>
        </div>

        {/* Google Search Grounding Toggle */}
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={enableSearch}
              onChange={(e) => setEnableSearch(e.target.checked)}
              className="w-4 h-4 text-orange-600 rounded border-slate-300 focus:ring-orange-500 cursor-pointer"
            />
            <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
              <Search className="w-3 h-3 text-blue-600" />
              {lang === 'kn' ? 'ಗೂಗಲ್ ಸರ್ಚ್ ಡೇಟಾ ಬಳಸಿ (Google Search Grounding)' : 'Google Search Grounding (Live Market Data)'}
            </span>
          </label>
        </div>
      </div>

      {/* 4 Core Best Practice Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {PRESET_ADVICE.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-orange-400 transition-all shadow-2xs space-y-1.5 group"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-orange-50 group-hover:bg-orange-100 text-orange-600 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight">
                  {lang === 'kn' ? item.titleKn : item.titleEn}
                </h3>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                {lang === 'kn' ? item.descKn : item.descEn}
              </p>
            </div>
          );
        })}
      </div>

      {/* Interactive Chat Console (Multi-turn with scrollable thread) */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-md overflow-hidden flex flex-col h-[520px]">
        {/* Chat Stream Header */}
        <div className="px-4 py-2.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-orange-400" />
            <span className="font-black uppercase tracking-wider text-[11px]">
              {lang === 'kn' ? 'ಲೈವ್ AI ಸಮಾಲೋಚನೆ (Live Consultation)' : 'Live AI Consultation Console'}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
              gemini-3.5-flash
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetChat}
              title="Reset conversation"
              className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-[11px] font-bold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{lang === 'kn' ? 'ಹೊಸ ಚಾಟ್' : 'Reset'}</span>
            </button>
          </div>
        </div>

        {/* Scrollable Message Thread */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-50/60">
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={idx}
                className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[78%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-2xs ${
                      isUser
                        ? 'bg-orange-600 text-white rounded-br-xs font-medium'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.content}</div>

                    {/* Google Search Grounding Sources */}
                    {msg.grounding && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5">
                        <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-blue-600">
                          <Search className="w-3 h-3" />
                          <span>Google Search Grounding Sources:</span>
                        </div>

                        {msg.grounding.webSearchQueries && msg.grounding.webSearchQueries.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {msg.grounding.webSearchQueries.map((q, qIdx) => (
                              <span
                                key={qIdx}
                                className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[10px] font-semibold border border-blue-100"
                              >
                                "{q}"
                              </span>
                            ))}
                          </div>
                        )}

                        {msg.grounding.groundingChunks && msg.grounding.groundingChunks.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {msg.grounding.groundingChunks.map((chunk, cIdx) => {
                              if (!chunk.web) return null;
                              return (
                                <a
                                  key={cIdx}
                                  href={chunk.web.uri}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold border border-slate-300 transition-colors"
                                >
                                  <span className="truncate max-w-[160px]">{chunk.web.title || 'Official Source'}</span>
                                  <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Metadata line: Time, Copy Button, Mode */}
                  <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-slate-400 font-semibold">
                    <span>{msg.time}</span>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(msg.content, idx)}
                      className="hover:text-slate-700 flex items-center gap-0.5 transition-colors"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-2.5 h-2.5 text-emerald-600" />
                          <span className="text-emerald-600 font-bold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-2.5 h-2.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    {msg.mode && (
                      <>
                        <span>•</span>
                        <span className="text-[9px] uppercase font-mono text-slate-400">{msg.mode}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isThinking && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2 shadow-2xs">
                <Sparkles className="w-4 h-4 text-orange-600 animate-spin" />
                <span>
                  {enableSearch
                    ? lang === 'kn'
                      ? 'ಗೂಗಲ್ ಸರ್ಚ್ ಮೂಲಕ ಲೈವ್ ಡೇಟಾ ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ...'
                      : 'Consulting Sandhya Commercial LPG knowledge & Google Search...'
                    : lang === 'kn'
                    ? 'AI ಸಲಹೆಗಾರ ಲೆಕ್ಕಾಚಾರ ಮಾಡುತ್ತಿದೆ...'
                    : 'AI Advisor is formulating recommendations...'}
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-2 bg-slate-100 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-[10px] font-black uppercase text-slate-500 whitespace-nowrap flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-orange-600" />
            {lang === 'kn' ? 'ತ್ವರಿತ ಪ್ರಶ್ನೆಗಳು:' : 'Quick Prompts:'}
          </span>
          <button
            type="button"
            onClick={() => handleSendMessage(lang === 'kn' ? 'ಹೋಟೆಲ್‌ನಲ್ಲಿ ಗ್ಯಾಸ್ ಖರ್ಚು 20% ಕಡಿಮೆ ಮಾಡುವುದು ಹೇಗೆ?' : 'How can I reduce commercial kitchen LPG bill by 20%?')}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-orange-50 border border-slate-300 hover:border-orange-400 text-slate-800 font-bold whitespace-nowrap transition-colors"
          >
            {lang === 'kn' ? '💡 20% ಗ್ಯಾಸ್ ಉಳಿತಾಯ' : '💡 Save 20% LPG'}
          </button>
          <button
            type="button"
            onClick={() => handleSendMessage(lang === 'kn' ? '1000 ಜನರ ಮದುವೆ ಊಟಕ್ಕೆ ಎಷ್ಟು ಸಿಲಿಂಡರ್ ಬೇಕು?' : 'How many cylinders are required for 1000 guests marriage feast?')}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-orange-50 border border-slate-300 hover:border-orange-400 text-slate-800 font-bold whitespace-nowrap transition-colors"
          >
            {lang === 'kn' ? '🍲 ಮದುವೆ ಸಿಲಿಂಡರ್ ಲೆಕ್ಕ' : '🍲 Wedding Hall Estimate'}
          </button>
          <button
            type="button"
            onClick={() => handleSendMessage(lang === 'kn' ? 'ಕರ್ನಾಟಕದಲ್ಲಿ ಇಂದಿನ ಕಮರ್ಷಿಯಲ್ 19kg ಸಿಲಿಂಡರ್ ಸರ್ಕಾರಿ ದರ ಎಷ್ಟು?' : 'What is the current prevailing commercial 19kg LPG cylinder price in Karnataka?')}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-orange-50 border border-slate-300 hover:border-orange-400 text-slate-800 font-bold whitespace-nowrap transition-colors flex items-center gap-1"
          >
            <Search className="w-2.5 h-2.5 text-blue-600" />
            {lang === 'kn' ? '📊 ಪ್ರಸ್ತುತ ಕಮರ್ಷಿಯಲ್ ದರ' : '📊 Current Market Rate'}
          </button>
          <button
            type="button"
            onClick={() => handleSendMessage(lang === 'kn' ? 'ಭಾರತ್ ಗ್ಯಾಸ್ 19kg ಮತ್ತು 47.5kg ಇಂಡಸ್ಟ್ರಿಯಲ್ ಸಿಲಿಂಡರ್ ನಡುವಿನ ವ್ಯತ್ಯಾಸವೇನು?' : 'What is the benefit of switching to Bharat Gas 47.5kg Industrial cylinders?')}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-orange-50 border border-slate-300 hover:border-orange-400 text-slate-800 font-bold whitespace-nowrap transition-colors"
          >
            {lang === 'kn' ? '🔥 19kg vs 47.5kg ಬಲ್ಕ್' : '🔥 19kg vs 47.5kg Bulk'}
          </button>
          <button
            type="button"
            onClick={() => handleSendMessage(lang === 'kn' ? 'ಅನಿಲ ಸೋರಿಕೆ (Gas Leak) ಕಂಡುಬಂದರೆ ತುರ್ತು ಕ್ರಮಗಳೇನು?' : 'What is the emergency protocol if we smell gas leak in commercial kitchen?')}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-orange-50 border border-slate-300 hover:border-orange-400 text-slate-800 font-bold whitespace-nowrap transition-colors"
          >
            {lang === 'kn' ? '🚨 ಗ್ಯಾಸ್ ಲೀಕ್ ತುರ್ತು ಸುರಕ್ಷತೆ' : '🚨 Gas Leak Safety'}
          </button>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder={
              lang === 'kn'
                ? 'ಗ್ಯಾಸ್ ಉಳಿತಾಯ, ಮಾರುಕಟ್ಟೆ ದರ, ಮದುವೆ ಆರ್ಡರ್ ಅಥವಾ ಬಿಸಿನೆಸ್ ಬಗ್ಗೆ ಕೇಳಿ...'
                : 'Ask about cutting LPG bills, current market price, wedding feast estimate, safety...'
            }
            className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm font-medium bg-slate-50 rounded-xl border border-slate-300 focus:outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 text-slate-900"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isThinking}
            className="px-4 sm:px-5 py-2.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lang === 'kn' ? 'ಕಳುಹಿಸಿ' : 'Send'}</span>
          </button>
        </form>
      </div>
        </>
      )}
    </div>
  );
};
