import React from 'react';
import { Calendar, Clock, Sparkles, ChevronRight, Check, Send, Award, HelpCircle } from 'lucide-react';

interface BespokeConsultationProps {
  onSuccessBooking: (bookingDetails: any) => void;
}

export default function BespokeConsultation({ onSuccessBooking }: BespokeConsultationProps) {
  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [selectedService, setSelectedService] = React.useState<string>('Custom Engagement Ring Drafting');
  const [selectedDate, setSelectedDate] = React.useState<string>('');
  const [selectedTime, setSelectedTime] = React.useState<string>('');
  const [clientName, setClientName] = React.useState<string>('');
  const [clientEmail, setClientEmail] = React.useState<string>('');
  const [budgetRating, setBudgetRating] = React.useState<string>('$15,000 - $30,000');
  const [designIdeaInput, setDesignIdeaInput] = React.useState<string>('');
  const [assistantLogs, setAssistantLogs] = React.useState<Array<{ role: 'user' | 'atelier', text: string }>>([
    {
      role: 'atelier',
      text: "Greetings. I am Ava's Virtual Master Goldsmith. Describe the precious metal, gemstone preference, and emotional themes of your desired masterpiece, and I will draft a structural styling blueprint."
    }
  ]);
  const [isTyping, setIsTyping] = React.useState(false);

  const services = [
    { title: 'Custom Ring Design', desc: 'Craft high-jewelry rings with chosen carats and ancestral alignments.' },
    { title: 'Sovereign Pendant or Choker', desc: 'Sculpt bespoke chokers contouring the neckline with pearls or diamonds.' },
    { title: 'Family Heirloom Reconstruction', desc: 'Restore, melt, or align ancestral heritage gold into modern contours.' },
    { title: 'Rare Natural Gemstone Sourcing', desc: 'Commission our agents to retrieve certified conflict-free top-grade gems.' }
  ];

  /* Custom styled dates (Quiet luxury calendar grid simulation) */
  const dates = [
    { label: 'Mon, May 25', value: '2026-05-25' },
    { label: 'Tue, May 26', value: '2026-05-26' },
    { label: 'Wed, May 27', value: '2026-05-27' },
    { label: 'Thu, May 28', value: '2026-05-28' },
    { label: 'Fri, May 29', value: '2026-05-29' },
    { label: 'Sat, May 30', value: '2026-05-30' },
  ];

  const timeSlots = [
    '10:00 AM - Morning Tea',
    '11:30 AM - Salon Gallery Visit',
    '02:00 PM - Afternoon Tea',
    '04:30 PM - Twilight Champagne Consultation'
  ];

  const handleAssistantSend = () => {
    if (!designIdeaInput.trim()) return;

    const userText = designIdeaInput;
    setAssistantLogs(prev => [...prev, { role: 'user', text: userText }]);
    setDesignIdeaInput('');
    setIsTyping(true);

    // Dynamic responses representing a master jeweler
    setTimeout(() => {
      let replyText = '';
      const textLower = userText.toLowerCase();

      if (textLower.includes('ring') || textLower.includes('engagement') || textLower.includes('diamond')) {
        replyText = "Fascinating choice. For a custom ring, I would strongly advice an architectural bezel or hand-chased prong setting in solid Platinum-950 to complement the pristine diamond brilliance. Adding VVS1 round brilliants creates a striking, modern look.";
      } else if (textLower.includes('sapphire') || textLower.includes('blue') || textLower.includes('emerald')) {
        replyText = "An exquisite color focus. A Ceylon Sapphire or emerald pairs sublimely with 18K yellow gold textured in a hammered 'Ancient beating' finish. It channels powerful heritage authority while remaining refined.";
      } else if (textLower.includes('pearl') || textLower.includes('necklace') || textLower.includes('gold')) {
        replyText = "Remarkable. We source high-grade Japanese Akoya pearls matching them for identical soft pink luster. Set on an ultra-delicate 18K Yellow Gold mesh, it evokes a modern liquid gold fluid movement.";
      } else {
        replyText = "A beautiful canvas to mold. Translating this theme requires balancing asymmetric white space and architectural stability. I recommend solid 18K Yellow gold accents accented with low-contrast, highly reflective micro-diamonds. That way, the structure behaves like a singular gallery item.";
      }

      setAssistantLogs(prev => [...prev, { role: 'atelier', text: replyText }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmitBooking = () => {
    if (!clientName || !clientEmail || !selectedDate || !selectedTime) {
      alert("Kindly complete all requested personal and calendar details to schedule your consultation.");
      return;
    }

    const bookingDetails = {
      serviceType: selectedService,
      preferredDate: selectedDate,
      preferredTime: selectedTime,
      clientName,
      clientEmail,
      budgetRating,
      assistantConsultOutput: assistantLogs[assistantLogs.length - 1].text
    };

    onSuccessBooking(bookingDetails);
    setStep(1); // reset step
    setSelectedDate('');
    setSelectedTime('');
    setClientName('');
    setClientEmail('');
  };

  return (
    <section className="bg-neutral-900 text-white py-24 px-6 md:px-20" id="bespoke-consultation">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Information and booking wizard status */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <span className="font-sans text-xs font-semibold text-[#fed65b] uppercase tracking-[0.4em] block">
              One of One Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
              Your Vision, <br />Our Craftsmanship
            </h2>
            <p className="font-sans text-sm text-neutral-400 leading-relaxed max-w-md">
              Experience the absolute sanctuary of bespoke high jewelry. Collaborating with our master artisans means translating your private emotional journey, family coat-of-arms, or legacy memories into enduring structures of gold and stone.
            </p>

            {/* Stepper Progress indicators */}
            <div className="pt-6 space-y-4 max-w-xs">
              <div className={`flex items-center gap-3 font-sans text-xs uppercase tracking-widest ${step === 1 ? 'text-[#fed65b]' : 'text-neutral-500'}`}>
                <span className={`w-6 h-6 border flex items-center justify-center font-bold ${step === 1 ? 'border-[#fed65b] text-[#fed65b]' : 'border-neutral-700'}`}>1</span>
                <span>Select Specialization</span>
              </div>
              <div className={`flex items-center gap-3 font-sans text-xs uppercase tracking-widest ${step === 2 ? 'text-[#fed65b]' : 'text-neutral-500'}`}>
                <span className={`w-6 h-6 border flex items-center justify-center font-bold ${step === 2 ? 'border-[#fed65b] text-[#fed65b]' : 'border-neutral-700'}`}>2</span>
                <span>AI Artisan Drafting</span>
              </div>
              <div className={`flex items-center gap-3 font-sans text-xs uppercase tracking-widest ${step === 3 ? 'text-[#fed65b]' : 'text-neutral-500'}`}>
                <span className={`w-6 h-6 border flex items-center justify-center font-bold ${step === 3 ? 'border-[#fed65b] text-[#fed65b]' : 'border-neutral-700'}`}>3</span>
                <span>Reserve Calendar Slot</span>
              </div>
            </div>
          </div>

          <div className="border border-[#735c00]/30 p-6 bg-[#1b1b1c] rounded-none">
            <h4 className="font-serif text-sm text-[#fed65b] tracking-wider uppercase mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#fed65b]" />
              The Boutique Assurance
            </h4>
            <p className="font-sans text-[11px] text-neutral-400 leading-relaxed">
              Every curated booking includes direct access to private jewelry salons in Paris and London, complimentary transport, and handcraftings rendered in complete privacy.
            </p>
          </div>
        </div>

        {/* Right Column: Dynamic Wizard Form */}
        <div className="lg:col-span-7 bg-[#1b1b1c] border border-[#735c00]/25 p-8 md:p-12 rounded-none flex flex-col justify-between shadow-lg">
          
          {/* STEP 1: Specialization Service Selector */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="border-b border-neutral-800 pb-4">
                <span className="font-sans text-[10px] text-[#fed65b] uppercase tracking-widest block">
                  Step 1 of 3
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-light text-neutral-100 mt-1">
                  Choose Consultation Theme
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((serv) => (
                  <button
                    key={serv.title}
                    onClick={() => setSelectedService(serv.title)}
                    className={`p-5 text-left border rounded-none transition-all flex flex-col justify-between space-y-4 ${
                      selectedService === serv.title
                        ? 'border-[#fed65b] bg-[#fed65b]/5'
                        : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <h4 className={`font-serif text-[15px] ${selectedService === serv.title ? 'text-[#fed65b]' : 'text-white'}`}>
                        {serv.title}
                      </h4>
                      <p className="font-sans text-xs text-neutral-400 mt-2 leading-relaxed">
                        {serv.desc}
                      </p>
                    </div>
                    <div className="flex justify-end pt-2">
                      <span className={`text-[10px] uppercase font-sans tracking-widest font-semibold ${selectedService === serv.title ? 'text-[#fed65b]' : 'text-neutral-500'}`}>
                        {selectedService === serv.title ? 'Selected' : 'Select Service'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-8 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="bg-[#fed65b] text-[#1b1b1c] hover:bg-white text-xs uppercase tracking-[0.25em] font-semibold py-4 px-8 rounded-none transition-all flex items-center gap-2"
                >
                  <span>Continue to Drafting</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Intelligent Atelier Co-Designer Drafting */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="border-b border-neutral-800 pb-4">
                <span className="font-sans text-[10px] text-[#fed65b] uppercase tracking-widest block">
                  Step 2 of 3
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-light text-neutral-100 mt-1 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#fed65b] animate-pulse" />
                  AI Atelier Co-Designer
                </h3>
              </div>

              <p className="font-sans text-xs text-neutral-400">
                Share your inspiration (e.g. style preferences, stone carats, gold types), and the Virtual Goldsmith will draft immediate, expert architectural feedback before we meet.
              </p>

              {/* Chat Log Window */}
              <div className="border border-neutral-800 bg-neutral-950 p-4 h-64 overflow-y-auto space-y-4 rounded-none font-sans text-xs hide-scrollbar flex flex-col">
                {assistantLogs.map((log, index) => (
                  <div
                    key={index}
                    className={`flex flex-col max-w-[85%] ${
                      log.role === 'user' ? 'self-end bg-[#fed65b]/10 border border-[#fed65b]/20 p-3' : 'self-start bg-neutral-900 border border-neutral-800 p-3'
                    }`}
                  >
                    <span className="text-[9px] uppercase tracking-widest font-bold text-[#fed65b] mb-1">
                      {log.role === 'user' ? 'Client Request' : 'Atelier response'}
                    </span>
                    <p className="leading-relaxed text-neutral-200 font-serif italic text-[13px]">
                      {log.text}
                    </p>
                  </div>
                ))}

                {isTyping && (
                  <div className="self-start bg-neutral-900 border border-neutral-800 p-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#fed65b] rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-[#fed65b] rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-[#fed65b] rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={designIdeaInput}
                  onChange={(e) => setDesignIdeaInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAssistantSend();
                  }}
                  placeholder="E.g. Vintage art-deco ring in solid gold with deep ocean sapphires..."
                  className="flex-1 bg-neutral-900 border border-neutral-800 p-3 text-xs focus:outline-none focus:border-[#fed65b] rounded-none outline-none"
                />
                <button
                  onClick={handleAssistantSend}
                  className="bg-[#fed65b] hover:bg-white text-neutral-900 font-bold p-3 transition-colors rounded-none flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation CTA */}
              <div className="pt-6 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="font-sans text-xs uppercase tracking-widest text-[#fed65b] hover:text-white transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="bg-transparent border border-neutral-700 hover:border-[#fed65b] hover:text-[#fed65b] text-white text-xs uppercase tracking-[0.25em] font-semibold py-4 px-8 rounded-none transition-all flex items-center gap-2"
                >
                  <span>Continue to Calendar</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Reserve Calendar Slot */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="border-b border-neutral-800 pb-4">
                <span className="font-sans text-[10px] text-[#fed65b] uppercase tracking-widest block">
                  Step 3 of 3
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-light text-neutral-100 mt-1">
                  Schedule Private Viewing
                </h3>
              </div>

              {/* Form entries */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-sans text-[9px] uppercase tracking-widest text-neutral-500 block">
                    Your Name (Honorific)
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="E.g., Lady Victoria"
                    className="w-full bg-neutral-900 border border-neutral-800 p-3 text-xs focus:outline-none focus:border-[#fed65b] rounded-none text-white font-serif"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-sans text-[9px] uppercase tracking-widest text-neutral-500 block">
                    Secured Email Address
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="victoria@legacy.com"
                    className="w-full bg-neutral-900 border border-neutral-800 p-3 text-xs focus:outline-none focus:border-[#fed65b] rounded-none text-white font-sans"
                  />
                </div>
              </div>

              {/* Aesthetic Budget Matching range */}
              <div className="space-y-2">
                <label className="font-sans text-[9px] uppercase tracking-widest text-neutral-500 block">
                  Envisioned Commission Value Range
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['$10,000 - $25,000', '$25,000 - $75,000', '$75,000+ Unlimited'].map((b) => (
                    <button
                      key={b}
                      onClick={() => setBudgetRating(b)}
                      className={`py-2 px-1 text-center font-sans text-[10px] border rounded-none transition-all ${
                        budgetRating === b ? 'border-[#fed65b] bg-[#fed65b]/5 text-[#fed65b]' : 'border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Choices Grid */}
              <div className="space-y-2">
                <span className="font-sans text-[9px] uppercase tracking-widest text-neutral-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#fed65b]" />
                  Select Preferred Date
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {dates.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setSelectedDate(d.value)}
                      className={`py-2 px-1 text-center font-sans text-[10px] uppercase border rounded-none transition-all ${
                        selectedDate === d.value
                          ? 'border-[#fed65b] bg-[#fed65b] text-[#1b1b1c] font-semibold'
                          : 'border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots Choices Column */}
              <div className="space-y-2">
                <span className="font-sans text-[9px] uppercase tracking-widest text-neutral-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#fed65b]" />
                  Salon Booking Time
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((ts) => (
                    <button
                      key={ts}
                      onClick={() => setSelectedTime(ts)}
                      className={`p-3 text-left font-sans text-[10px] uppercase border rounded-none transition-all ${
                        selectedTime === ts
                          ? 'border-[#fed65b] bg-[#fed65b]/20 text-[#fed65b] font-semibold'
                          : 'border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      {ts}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wizard Final CTAs */}
              <div className="pt-6 flex justify-between items-center">
                <button
                  onClick={() => setStep(2)}
                  className="font-sans text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmitBooking}
                  className="bg-[#fed65b] hover:bg-white text-neutral-900 text-xs uppercase tracking-[0.2em] font-semibold py-4 px-8 rounded-none transition-all flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Reserve Private Salon</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
