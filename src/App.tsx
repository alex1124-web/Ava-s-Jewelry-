import React from 'react';
import Navigation from './components/Navigation';
import ProductCatalog from './components/ProductCatalog';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import BespokeConsultation from './components/BespokeConsultation';
import StyleQuiz from './components/StyleQuiz';
import { Product, CartItem, ConsultationBooking } from './types';
import { ArrowRight, Compass, Calendar, Sparkles, X, Mail, ShieldCheck, Heart, Share2, Instagram } from 'lucide-react';

export default function App() {
  // Navigation & Core screen anchors
  const [activeScreen, setActiveScreen] = React.useState<'home' | 'catalog' | 'bespoke' | 'quiz' | 'heritage'>('home');
  const [selectedCollectionFilter, setSelectedCollectionFilter] = React.useState<string>('all');

  // Interactive local states
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [isOpenCart, setIsOpenCart] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  // Success States and notifications
  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [newsletterSuccess, setNewsletterSuccess] = React.useState(false);
  const [successBooking, setSuccessBooking] = React.useState<any | null>(null);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Smooth scroll helper
  const scrollToAnchor = (id: string, screen: 'home' | 'catalog' | 'bespoke' | 'quiz' | 'heritage' = 'home') => {
    setActiveScreen(screen);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Cart operations
  const handleAddToBag = (newItem: CartItem) => {
    setCart((prevCart) => {
      // Check if duplicate with same customization metal is already in cart
      const existingIdx = prevCart.findIndex(
        (item) =>
          item.product.id === newItem.product.id &&
          item.selectedMaterial === newItem.selectedMaterial &&
          item.engraving === newItem.engraving
      );

      if (existingIdx > -1) {
        const copy = [...prevCart];
        copy[existingIdx].quantity += 1;
        return copy;
      }
      return [...prevCart, newItem];
    });

    showToast(`"${newItem.product.name}" added to your acquisition bag.`);
  };

  const handleUpdateQuantity = (idx: number, delta: number) => {
    setCart((prevCart) => {
      const copy = [...prevCart];
      copy[idx].quantity += delta;
      if (copy[idx].quantity < 1) copy[idx].quantity = 1;
      return copy;
    });
  };

  const handleRemoveItem = (idx: number) => {
    const item = cart[idx];
    setCart((prevCart) => prevCart.filter((_, i) => i !== idx));
    showToast(`Removed "${item.product.name}" from your bag.`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 8000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f9] text-[#1b1b1c] font-sans overflow-x-hidden selection:bg-[#fed65b] selection:text-[#745c00]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#1b1b1c] text-[#fbf9f9] border border-[#735c00]/30 py-3.5 px-6 rounded-none flex items-center gap-3 transition-all transform translate-y-0 shadow-xl max-w-sm animate-bounce">
          <Sparkles className="w-4 h-4 text-[#fed65b]" />
          <span className="font-sans text-xs uppercase tracking-wider">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-neutral-400 hover:text-white ml-2">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Booking Confirmation Dialog (Invitation) */}
      {successBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" onClick={() => setSuccessBooking(null)} />
          <div className="relative bg-[#fbf9f9] text-[#1b1b1c] border border-[#735c00]/30 max-w-[550px] w-full p-8 md:p-12 rounded-none shadow-2xl text-center z-10">
            <div className="w-14 h-14 bg-[#735c00]/10 flex items-center justify-center mx-auto border border-[#735c00]/25 mb-4">
              <Mail className="w-6 h-6 text-[#735c00]" />
            </div>
            
            <span className="font-sans text-[10px] text-[#735c00] uppercase tracking-[0.3em] font-medium block">
              Atelier Private Salon Ticket
            </span>
            <h3 className="font-serif text-2xl text-black font-normal tracking-wide mt-2">
              Invitation Scheduled
            </h3>
            <div className="w-12 h-[0.5px] bg-[#735c00]/30 mx-auto my-4" />

            <div className="bg-[#f0edee] p-5 text-left border border-neutral-100 rounded-none space-y-3 font-sans text-xs text-neutral-700">
              <p>
                <strong className="text-neutral-500 uppercase text-[9px] tracking-widest block">Client Honorific</strong>
                <span className="font-serif italic text-sm text-neutral-900">{successBooking.clientName}</span>
              </p>
              <p>
                <strong className="text-neutral-500 uppercase text-[9px] tracking-widest block">Reserved Specialization</strong>
                <span>{successBooking.serviceType}</span>
              </p>
              <p>
                <strong className="text-neutral-500 uppercase text-[9px] tracking-widest block">Salon Date & Time</strong>
                <span className="uppercase tracking-wide font-medium text-neutral-900">{successBooking.preferredDate} @ {successBooking.preferredTime}</span>
              </p>
              <p>
                <strong className="text-neutral-500 uppercase text-[9px] tracking-widest block">Escrow Valuation</strong>
                <span>Estimated budget rating {successBooking.budgetRating}</span>
              </p>
            </div>

            <p className="font-sans text-[11px] text-neutral-400 leading-relaxed mt-4">
              A physical velvet-stamped invitation packet and private lounge directions have been dispatch to <strong>{successBooking.clientEmail}</strong> via courier.
            </p>

            <button
              onClick={() => setSuccessBooking(null)}
              className="mt-6 w-full bg-black text-white py-3 font-sans text-xs uppercase tracking-[0.2em] font-semibold rounded-none hover:bg-[#735c00] transition-colors"
            >
              Exquisite, thank you
            </button>
          </div>
        </div>
      )}

      {/* Main Luxury Navigation */}
      <Navigation
        cartItemCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsOpenCart(true)}
        activeScreen={activeScreen}
        onNavigate={(screen) => {
          setActiveScreen(screen);
          if (screen === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (screen === 'catalog') {
            setSelectedCollectionFilter('all');
            scrollToAnchor('selected-masterpieces', 'catalog');
          } else if (screen === 'bespoke') {
            scrollToAnchor('bespoke-consultation', 'bespoke');
          } else if (screen === 'quiz') {
            scrollToAnchor('style-quiz', 'quiz');
          } else if (screen === 'heritage') {
            scrollToAnchor('heritage-section', 'heritage');
          }
        }}
      />

      {/* HOME PAGE VIEWPORT (Renders standard high-end screens layout sequentially) */}
      <main className="flex-1 pt-16">
        
        {/* SECTION 1: HERO SCENE */}
        <section className="relative h-[95vh] w-full overflow-hidden flex items-end">
          <div className="absolute inset-0 z-0">
            <img
              alt="Hero Diamond Necklace Preview"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzlxpDn4ef8zeygyG-Z1f3cYIzGfcD8rrqhCXbWFPGxh-JEYDXros7NUgOjqZ1UDxZ2cTOEbS6YHHwpT7o9qxajrr3Xj2l4DFjhEwG0DVpWLE7Ygo1-Mh9gj-HHWjijpQgIe_KiB6qOey2irCffNnZ4yWSmnWHgus-GIvp7guI488bIB3hhXrM_uP7R_vlbLOPhWSIZkpSq9ynnaS8R95HmcoGcKsUhWig4gfegWUf8Zg78ntzjmUt8rTWpeEyvjAGzFXHPji-h61Y"
              className="w-full h-full object-cover brightness-[0.7] scale-100"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="relative z-10 w-full px-6 pb-20 md:px-20 md:pb-28 max-w-[1440px] mx-auto">
            <div className="max-w-2xl space-y-6">
              <span className="font-sans text-xs text-[#fed65b] uppercase tracking-[0.4em] font-semibold block transition-transform duration-1000">
                Atelier Ava Paris
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white leading-[1.1] font-normal tracking-wide">
                The Art of <br />Eternal Radiance
              </h1>
              <p className="font-sans text-sm sm:text-base text-white/85 max-w-md leading-relaxed font-light">
                Exquisite craftsmanship meets timeless elegancy. Discover the profound heritage of peerless diamonds and handcrafted gold.
              </p>
              
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSelectedCollectionFilter('all');
                    scrollToAnchor('selected-masterpieces', 'catalog');
                  }}
                  className="bg-white text-black font-sans text-xs font-semibold px-10 py-4 hover:bg-[#fed65b] hover:text-black transition-all uppercase tracking-[0.2em] rounded-none shadow-md cursor-pointer duration-300"
                >
                  Explore the Collection
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: CURATED COLLECTIONS INTRO (Bento layout simulation as depicted in request design) */}
        <section className="py-24 px-6 md:px-20 max-w-[1440px] mx-auto" id="selected-masterpieces-intro">
          <div className="text-center mb-16">
            <span className="font-sans text-xs font-semibold text-neutral-500 uppercase tracking-[0.3em]">Curation</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mt-3 font-normal text-black">Selected Masterpieces</h2>
            <p className="font-sans text-xs text-neutral-400 mt-2 max-w-sm mx-auto">
              Inspect our most exclusive signatures individually finished inside Ava's private atelier chambers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Bento Block 1: Heritage Gold */}
            <div 
              onClick={() => {
                setSelectedCollectionFilter('heritage-gold');
                scrollToAnchor('selected-masterpieces', 'catalog');
              }}
              className="md:col-span-7 group cursor-pointer overflow-hidden flex flex-col justify-between border border-transparent hover:border-[#735c00]/15 bg-white p-4 transition-all duration-500"
            >
              <div className="aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-neutral-100">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGDTzewzQLLtb-UjPhLCtPZplTrfQLeiH4t99fEU4jA_0jYYIcYGJAiB4CqNk_xaZTlTKR-caQeueNHDbLtqQhedE6rocgDlXxCSFV02FS4MTSErVf4wOGK1UIRrchlw5JypyNJAu-H6IOJDqDmpYi57wtq0Si0IgR3v_E3XBVoTux1NgIlzzQD-KFNRxdrIE_abx-niq4J7e_TrFxayK4a_pC_VBG62qTU0jR_HOWYay-z2BJ_3IFHDeu10g1xIG0wKCD5eUv0DBk"
                  alt="Heritage Gold Jewelry Piece"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-6 flex justify-between items-end">
                <div>
                  <h3 className="font-serif text-2xl font-normal text-black group-hover:text-[#735c00] transition-colors">Heritage Gold</h3>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[#735c00] mt-2 inline-block border-b border-[#735c00]/30 pb-0.5 group-hover:border-[#735c00]">
                    Shop Now
                  </span>
                </div>
              </div>
            </div>

            {/* Bento Block 2: The Diamond Edit */}
            <div 
              onClick={() => {
                setSelectedCollectionFilter('diamond-edit');
                scrollToAnchor('selected-masterpieces', 'catalog');
              }}
              className="md:col-span-5 group cursor-pointer overflow-hidden flex flex-col justify-between border border-transparent hover:border-[#735c00]/15 bg-white p-4 transition-all duration-500"
            >
              <div className="aspect-[4/5] overflow-hidden bg-neutral-100">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3_CvQcAtfWyiSj6cymq6bvr2mn1XO6VCyS1nzfuOuJT6dIf4hD5JtVOeKHGp_TaqRPNow2suTFwZNpMGII3BobHN7wdJKwfBdR2cpv-_xAS6lea8XhsWOaYgTPdQl44d2ElFprmwpiHVu3y1phXd2nokgode6XJHnFrbQxpDSoxRvD1OwNQdOdG0KJJXHS1x0BiVzH7nsDbv2Q2neg-r_FQzDGMnRMTTMhGLx-XAyWVnOHw1kwhWnmM6wMcwYdSlImReliQ139Zyd"
                  alt="Prism Diamond Edit Earrings"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-6">
                <h3 className="font-serif text-2xl font-normal text-black group-hover:text-[#735c00] transition-colors">The Diamond Edit</h3>
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#735c00] mt-2 inline-block border-b border-[#735c00]/30 pb-0.5 group-hover:border-[#735c00]">
                  Shop Now
                </span>
              </div>
            </div>

            {/* Bento Block 3: Bespoke Creations Design Sketching */}
            <div 
              onClick={() => {
                setSelectedCollectionFilter('bespoke-creations');
                scrollToAnchor('selected-masterpieces', 'catalog');
              }}
              className="md:col-span-12 group cursor-pointer overflow-hidden border border-transparent hover:border-[#735c00]/15 bg-white p-4 transition-all duration-500"
            >
              <div className="aspect-[16/9] md:max-h-[500px] overflow-hidden bg-neutral-100">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKZJuLnZ015LHXn9EeXd_M2Jvu7X2WUqemnyh0iKR6JURhcuTDLEm3ujpsNnZvRkQcj3nJyEAesmittEYts5g3NB2u7G2MFCJqw79h9baKtJbi1YgolLp1gCv4tyBxL8EVESNa6YvkjXTJ86Sq2RHC6n6VcqdNy45XRla90bd3R4VWROqf-BavOqjZV1oyDVbDpPYdGhCL3Q6BVf3TMQkr8s9eq9zQz68CQOK-MVVlGvium8FYx_dezcI2GyOdR9bgM55NcIsgmsXp"
                  alt="Custom bespoke sketches and draft diamonds layout vellum paper"
                  className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-6">
                <h3 className="font-serif text-2xl font-normal text-black group-hover:text-[#735c00] transition-colors">Bespoke Creations</h3>
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#735c00] mt-2 inline-block border-b border-[#735c00]/30 pb-0.5 group-hover:border-[#735c00]">
                  Shop Now
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* INTEGRATION VIEW: COLLAPSED CURATED PRODUCT VAULT CATALOG (Live Filterable Vault) */}
        <ProductCatalog
          onSelectProduct={(product) => setSelectedProduct(product)}
          initialCollectionFilter={selectedCollectionFilter}
        />

        {/* SECTION 3: THE BESPOKE LUXURY EXPERIENCE PANEL */}
        <BespokeConsultation
          onSuccessBooking={(bookingDetails) => {
            setSuccessBooking(bookingDetails);
            showToast("Bespoke Private Consultation Scheduled Successfully!");
          }}
        />

        {/* SECTION 4: HERITAGE & CRAFTSMANSHIP HISTORY STORY */}
        <section className="py-28 px-6 md:px-20 max-w-[1440px] mx-auto border-t border-neutral-150" id="heritage-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Craftsman image column */}
            <div className="order-2 lg:order-1 relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp_9nYQ5SPgjkaUcwNvxz39uGX86stPb4hNxHBGeGVVRFgg29mMX_NXTotEDnUxZ26OjRAXMJCVopqu1g_CvdZp1vRkeJfkMhn5ZNmkVufdtm_h7ZjXVx3_C_D_HhVy6Yo8Pz3DBDc9_HzbneLEaMg9A-1YdXAUc20jpJkOv1XUmnMZyhcm-ud91mvcayecNUJJubBCNH58EwoVwa0NUWkUdmCJBNeebvxz1GRLVkebgdfAlMWWKCarSiZ1kSH7KSSR8mqrLZeIuxy"
                alt="High-contrast greyscale master bench jeweler at historical workdesk"
                className="w-full h-auto grayscale object-cover border border-neutral-200"
                referrerPolicy="no-referrer"
              />
              {/* Thin golden outline overlay frame typical of editorial layouts */}
              <div className="absolute -inset-4 border border-[#735c00]/25 pointer-events-none translate-x-1 translate-y-1" />
            </div>

            {/* Story column */}
            <div className="order-1 lg:order-2 space-y-8">
              <span className="font-sans text-xs font-semibold text-neutral-400 uppercase tracking-[0.3em] block">
                Our Heritage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl italic font-normal text-black leading-tight">
                A Legacy Written in <br />Gold and Stone
              </h2>

              <p className="font-serif italic text-lg text-neutral-700 leading-relaxed border-l-2 border-[#735c00]/30 pl-6 my-4">
                "For three generations, we have sought the purest expressions of nature's beauty. Our commitment goes beyond aesthetics; it is a vow of ethical sourcing and the preservation of ancient techniques that otherwise would be lost to time."
              </p>

              <div className="space-y-4 font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                <p>
                  Every Ava&apos;s piece is handcrafted in our atelier, where master jewelers spend hundreds of hours ensuring every setting is perfect and every stone is secure. We only work with conflict-free diamonds and recycled gold, ensuring your piece is as beautiful for the world as it is for you.
                </p>
                <p>
                  Passed down from mother to child, from master to apprentice, our commitment to exquisite symmetry remains absolute. We ensure each precious alloy and diamond crystalline structure inherits structural grace.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 5: RADIANCE STYLE QUIZ MATCH INTEGRATION */}
        <StyleQuiz onSelectProduct={(product) => setSelectedProduct(product)} />

        {/* SECTION 6: INNER CIRCLE NEWSLETTER FORM */}
        <section className="py-24 bg-[#f6f3f4] border-t border-b border-[#735c00]/15 text-center">
          <div className="px-6 max-w-lg mx-auto space-y-6">
            <span className="font-sans text-[10px] text-[#735c00] uppercase tracking-[0.3em] font-semibold block">
              Atelier Correspondence
            </span>
            <h2 className="font-serif text-3xl text-black font-normal tracking-wide">
              Join the Inner Circle
            </h2>
            <p className="font-sans text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
              Be the first to explore our private seasonal capsule releases and receive formal physical invitations to regional atelier lounge previews.
            </p>

            {newsletterSuccess ? (
              <div className="bg-[#735c00]/10 text-[#735c00] p-4 text-xs font-sans uppercase tracking-widest border border-[#735c00]/30 font-semibold animate-fade-in-down rounded-none">
                ✓ Correspondence Established. Welcome to the Inner Circle.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="relative mt-8 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="YOUR EMAIL ADDRESS"
                  className="w-full bg-transparent border-0 border-b border-neutral-400 py-3.5 px-0 focus:ring-0 focus:border-[#735c00] font-sans text-xs uppercase tracking-[0.2em] transition-all outline-none text-center"
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-3 font-sans text-xs uppercase tracking-widest text-[#735c00] hover:text-black font-semibold transition-colors duration-200 cursor-pointer"
                  id="newsletter-subscribe-btn"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#1b1b1c] text-[#fbf9f9] border-t border-[#735c00]/20 pt-20 pb-12">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-12 gap-y-12 gap-x-8 pb-16 border-b border-neutral-800">
          
          {/* Logo Brand info */}
          <div className="col-span-12 md:col-span-4 space-y-4">
            <span className="font-serif text-2xl tracking-[0.2em] text-[#fed65b] uppercase block font-normal">
              Ava's Jewelry
            </span>
            <p className="font-sans text-xs text-neutral-400 max-w-xs leading-relaxed">
              Defining the pinnacle of high-luxury master jewelry, ethical diamond sourcing, and heritage gold-chasing for over three generations.
            </p>
          </div>

          {/* Links collections */}
          <div className="col-span-6 md:col-span-4 space-y-4">
            <h4 className="font-serif text-sm text-[#fed65b] tracking-wider uppercase font-medium">Atelier Navigation</h4>
            <div className="grid grid-cols-1 gap-2 font-sans text-xs text-neutral-400">
              <button onClick={() => scrollToAnchor('selected-masterpieces-intro', 'home')} className="text-left hover:text-[#fed65b] transition-all">Collections Curation</button>
              <button onClick={() => scrollToAnchor('bespoke-consultation', 'bespoke')} className="text-left hover:text-[#fed65b] transition-all">Bespoke Consultations</button>
              <button onClick={() => scrollToAnchor('style-quiz', 'quiz')} className="text-left hover:text-[#fed65b] transition-all">Radiance Match Quiz</button>
              <button onClick={() => scrollToAnchor('heritage-section', 'heritage')} className="text-left hover:text-[#fed65b] transition-all">Our Legacy & Artistry</button>
            </div>
          </div>

          {/* Customer Care info holding */}
          <div className="col-span-6 md:col-span-4 space-y-4">
            <h4 className="font-serif text-sm text-[#fed65b] tracking-wider uppercase font-medium">Lounge Locations</h4>
            <div className="font-sans text-xs text-neutral-400 space-y-2 leading-relaxed">
              <p>📍 Place Vendôme 12, Paris 75001</p>
              <p>📍 New Bond Street 46, London W1S</p>
              <p>📍 Fifth Avenue Lounge 711, New York NY 10022</p>
            </div>
          </div>

        </div>

        {/* Social and Legals */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 pt-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4 font-sans text-[10px] text-neutral-500 uppercase tracking-widest">
          <p>© 2026 AVA&apos;S JEWELRY ATELIER SERVICES. ALL RIGHTS RESERVED WORLDWIDE.</p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white flex items-center gap-1">
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
            <a href="#" className="hover:text-white flex items-center gap-1">
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Curation</span>
            </a>
          </div>
        </div>
      </footer>

      {/* POPUP DRAWERS & DETAIL DIALOGS */}
      <ProductDetail
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToBag={handleAddToBag}
      />

      <CartDrawer
        isOpen={isOpenCart}
        cartItems={cart}
        onClose={() => setIsOpenCart(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCart([])}
      />
    </div>
  );
}
