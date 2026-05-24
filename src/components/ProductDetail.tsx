import React from 'react';
import { Product, CartItem } from '../types';
import { X, Sparkles, Truck, Award, Hammer, MessageSquarePlus, Gift, Heart, Info, Check } from 'lucide-react';

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
  onAddToBag: (item: CartItem) => void;
}

export default function ProductDetail({ product, onClose, onAddToBag }: ProductDetailProps) {
  if (!product) return null;

  const [selectedMaterial, setSelectedMaterial] = React.useState<string>(product.materialOptions[0] || '18K Yellow Gold');
  const [diamondGrade, setDiamondGrade] = React.useState<'vvs1' | 'if' | 'vs1'>('vvs1');
  const [engraving, setEngraving] = React.useState<string>('');
  const [giftWrapped, setGiftWrapped] = React.useState<boolean>(false);
  const [wishlisted, setWishlisted] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState<'specs' | 'heritage' | 'delivery'>('specs');

  // Dynamic price calculation
  const getCalculatedPrice = () => {
    let basePrice = product.price;

    // Material additions
    if (selectedMaterial.includes('Platinum')) {
      basePrice += 2500;
    } else if (selectedMaterial.includes('White Gold')) {
      basePrice += 600;
    } else if (selectedMaterial.includes('Rose Gold')) {
      basePrice += 800;
    }

    // Diamond grade additions
    if (diamondGrade === 'if') basePrice += 4500;
    if (diamondGrade === 'vvs1') basePrice += 1800;

    // Optional gold foil wrapping or custom engraving additions (Complimentary!)
    if (giftWrapped) basePrice += 250; // White glove fee

    return basePrice;
  };

  const handleAcquire = () => {
    const configuredItem: CartItem = {
      product: {
        ...product,
        price: getCalculatedPrice() // Keep the configured price
      },
      quantity: 1,
      selectedMaterial,
      engraving: engraving.trim() ? engraving.trim() : undefined,
      giftWrapped
    };
    onAddToBag(configuredItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="customization-console" role="dialog" aria-modal="true">
      {/* Background overlay */}
      <div 
        className="fixed inset-0 bg-[#000000]/70 backdrop-blur-[4px] transition-opacity" 
        onClick={onClose}
      />

      <div className="flex min-h-screen items-center justify-center p-4 md:p-8">
        <div className="relative w-full max-w-[1100px] bg-[#fbf9f9] text-[#1b1b1c] rounded-none shadow-2xl overflow-hidden border border-[#735c00]/25 flex flex-col lg:flex-row">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-[#000000] hover:text-[#735c00] p-1.5 bg-[#fbf9f9]/90 border border-neutral-200 transition-all rounded-none"
            aria-label="Close panel"
            id="detail-close-btn"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Media Gallery */}
          <div className="w-full lg:w-1/2 bg-[#eae7e8] relative flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full min-h-[350px] max-h-[600px] object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Soft gold gradient layer overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            
            {/* Engraving Preview Text Inscription */}
            {engraving && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#000000]/80 text-[#f6f3f4] border border-[#735c00]/30 py-2.5 px-6 rounded-none text-center max-w-[85%] shadow-md">
                <span className="font-sans text-[9px] uppercase tracking-[0.25em] block text-neutral-400 mb-1">
                  Atelier Engraving Preview:
                </span>
                <span className="font-serif italic text-sm tracking-widest text-[#fed65b] font-medium block">
                  "{engraving}"
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Customization Panel */}
          <div className="w-full lg:w-1/2 p-6 md:p-10 flex flex-col justify-between max-h-[90vh] overflow-y-auto hide-scrollbar">
            <div>
              {/* Collection breadcrumb */}
              <div className="flex items-center justify-between mb-3 mt-4 lg:mt-0">
                <span className="font-sans text-[10px] text-[#735c00] uppercase tracking-[0.3em] font-medium">
                  {product.collection.replace('-', ' ')}
                </span>
                
                {/* Wishlist toggle */}
                <button 
                  onClick={() => setWishlisted(!wishlisted)}
                  className="text-neutral-500 hover:text-red-500 transition-colors flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  <span>{wishlisted ? 'Saved' : 'Wishlist'}</span>
                </button>
              </div>

              {/* Title & Custom Pricing */}
              <h1 className="font-serif text-2xl sm:text-3xl text-[#000000] font-normal tracking-wide mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-sans text-xl font-semibold text-[#000000]">
                  ${getCalculatedPrice().toLocaleString()}
                </span>
                <span className="font-sans text-[10px] text-neutral-400 uppercase tracking-widest">
                  Custom Configured Value
                </span>
              </div>

              {/* Exquisiteness divider */}
              <div className="w-full h-[0.5px] bg-[#735c00]/15 mb-6" />

              {/* Segment 1: Metal / Material Selection */}
              <div className="mb-6">
                <label className="font-sans text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-semibold block mb-3">
                  Noble Metal Selection
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {product.materialOptions.map((material) => (
                    <button
                      key={material}
                      onClick={() => setSelectedMaterial(material)}
                      className={`font-sans text-xs uppercase tracking-wider py-2.5 px-3 border text-left flex items-center justify-between transition-all rounded-none ${
                        selectedMaterial === material
                          ? 'border-[#000000] bg-[#000000] text-white font-medium'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-[#735c00]/40'
                      }`}
                    >
                      <span>{material}</span>
                      {selectedMaterial === material && <Check className="w-3 h-3 text-[#fed65b]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Segment 2: Gem Clarity Select */}
              <div className="mb-6">
                <div className="flex justify-between items-baseline mb-3">
                  <label className="font-sans text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-semibold">
                    Gemological Grade Match
                  </label>
                  <span className="font-sans text-[9px] text-[#735c00] uppercase tracking-wide">
                    All ethically verified
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setDiamondGrade('vs1')}
                    className={`font-sans text-xs flex flex-col py-2 px-3 border text-center transition-all rounded-none ${
                      diamondGrade === 'vs1'
                        ? 'border-[#000000] bg-[#000000] text-white'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-[#735c00]/40'
                    }`}
                  >
                    <span className="font-bold">VS-1</span>
                    <span className="text-[9px] opacity-80 mt-0.5">Very Slight</span>
                  </button>

                  <button
                    onClick={() => setDiamondGrade('vvs1')}
                    className={`font-sans text-xs flex flex-col py-2 px-3 border text-center transition-all rounded-none ${
                      diamondGrade === 'vvs1'
                        ? 'border-[#000000] bg-[#000000] text-white'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-[#735c00]/40'
                    }`}
                  >
                    <span className="font-bold">VVS-1 (+ $1,800)</span>
                    <span className="text-[9px] opacity-80 mt-0.5">V.V.S. Radiance</span>
                  </button>

                  <button
                    onClick={() => setDiamondGrade('if')}
                    className={`font-sans text-xs flex flex-col py-2 px-3 border text-center transition-all rounded-none ${
                      diamondGrade === 'if'
                        ? 'border-[#000000] bg-[#000000] text-white'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-[#735c00]/40'
                    }`}
                  >
                    <span className="font-bold">IF (+ $4,500)</span>
                    <span className="text-[9px] opacity-80 mt-0.5">Internally Flawless</span>
                  </button>
                </div>
              </div>

              {/* Segment 3: Custom Engraving Inscription */}
              <div className="mb-6 bg-neutral-50 p-4 border border-neutral-100 rounded-none">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-sans text-[10px] text-neutral-700 uppercase tracking-[0.2em] font-semibold flex items-center gap-1.5">
                    <MessageSquarePlus className="w-3.5 h-3.5 text-[#735c00]" />
                    Atelier Engraving (Complimentary)
                  </label>
                  <span className="font-mono text-[9px] text-neutral-400">
                    {25 - engraving.length} chars left
                  </span>
                </div>
                <p className="font-sans text-[10px] text-neutral-400 mb-2">
                  Specify name, romantic coordinates, or private dates to be sculpted inside your band.
                </p>
                <input
                  type="text"
                  maxLength={25}
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value)}
                  placeholder="EX: A.V.A & M  MCMLX"
                  className="w-full bg-white border border-neutral-200 px-3 py-2 text-xs uppercase tracking-[0.15em] focus:outline-none focus:border-[#735c00] rounded-none font-serif placeholder-neutral-300"
                />
              </div>

              {/* Segment 4: Luxury Keeping Box Wrapping */}
              <div className="mb-8 flex items-center justify-between bg-white p-3 border border-neutral-100 rounded-none">
                <div className="flex gap-3 items-center">
                  <div className="p-2 bg-[#fed65b]/10 text-[#735c00]">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-sans text-xs font-semibold text-neutral-800 block">
                      Champagne Keeper Gift Box
                    </span>
                    <span className="font-sans text-[10px] text-neutral-400 block">
                      Includes custom calligraphic envelope (+ $250)
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={giftWrapped}
                  onChange={(e) => setGiftWrapped(e.target.checked)}
                  className="w-4 h-4 accent-[#735c00] cursor-pointer rounded-none"
                />
              </div>

              {/* Editorial Info Segment Tabs */}
              <div className="mb-8">
                {/* Headers */}
                <div className="flex border-b border-neutral-200">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`flex-1 py-2 font-sans text-[10px] uppercase tracking-[0.15em] text-center border-b font-medium transition-colors ${
                      activeTab === 'specs' ? 'border-[#735c00] text-[#735c00]' : 'border-transparent text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('heritage')}
                    className={`flex-1 py-2 font-sans text-[10px] uppercase tracking-[0.15em] text-center border-b font-medium transition-colors ${
                      activeTab === 'heritage' ? 'border-[#735c00] text-[#735c00]' : 'border-transparent text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    Our Assurance
                  </button>
                  <button
                    onClick={() => setActiveTab('delivery')}
                    className={`flex-1 py-2 font-sans text-[10px] uppercase tracking-[0.15em] text-center border-b font-medium transition-colors ${
                      activeTab === 'delivery' ? 'border-[#735c00] text-[#735c00]' : 'border-transparent text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    Delivery
                  </button>
                </div>

                {/* Content */}
                <div className="py-4 text-xs text-neutral-600 leading-relaxed font-sans">
                  {activeTab === 'specs' && (
                    <ul className="space-y-1.5 list-none">
                      {product.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#735c00] font-sans mt-0.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {activeTab === 'heritage' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-neutral-800 font-semibold text-[11px] uppercase tracking-wider">
                        <Award className="w-3.5 h-3.5 text-[#735c00]" />
                        Lineage Guarantee
                      </div>
                      <p>
                        Every piece undergoes rigorous testing at Ava's Paris Atelier and carries a unique micro-engraving proof of heritage. Conflict-free and ethically approved by international sovereign jewel committees.
                      </p>
                    </div>
                  )}
                  {activeTab === 'delivery' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-neutral-800 font-semibold text-[11px] uppercase tracking-wider">
                        <Truck className="w-3.5 h-3.5 text-[#735c00]" />
                        White Glove Global Transit
                      </div>
                      <p>
                        Complimentary armored courier transport with full value insurance worldwide. Direct hand-delivery by custom agents. Please allow 5-7 calendar days for custom-setting.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Bottom Section */}
            <div className="border-t border-neutral-200 pt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAcquire}
                className="flex-1 bg-[#000000] hover:bg-[#735c00] text-white text-xs uppercase tracking-[0.2em] font-semibold py-4 px-6 rounded-none transition-all flex items-center justify-center gap-2 group shadow-md"
                id="acquire-btn"
              >
                <Sparkles className="w-4 h-4 text-[#fed65b] group-hover:rotate-12 transition-transform" />
                <span>Acquire Configured Piece</span>
              </button>
              
              <button
                onClick={onClose}
                className="font-sans text-xs uppercase tracking-widest text-neutral-500 hover:text-black hover:bg-neutral-100 py-4 px-6 border border-neutral-200 transition-colors text-center rounded-none"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
