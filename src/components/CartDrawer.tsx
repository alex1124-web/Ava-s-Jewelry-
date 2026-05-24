import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShieldCheck, HelpCircle, Sparkles, Check, Gift } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  cartItems,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const [checkoutComplete, setCheckoutComplete] = React.useState(false);
  const [noteToAtelier, setNoteToAtelier] = React.useState('');

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);
    
    // Simulate luxurious transaction
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      setTimeout(() => {
        onClearCart();
        setCheckoutComplete(false);
        onClose();
      }, 5000);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="shopping-bag-drawer" role="dialog" aria-modal="true">
      {/* Background panel */}
      <div 
        className="absolute inset-0 bg-[#000000]/65 backdrop-blur-[2px] transition-opacity" 
        onClick={onClose}
      />

      {/* Main Drawer Shell */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fbf9f9] text-[#1b1b1c] border-l border-[#735c00]/25 flex flex-col justify-between shadow-2xl rounded-none">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#735c00]/10">
            <span className="font-serif text-lg tracking-[0.15em] text-[#000000] uppercase font-normal flex items-center gap-2">
              Your Acquisition Bag ({cartItems.length})
            </span>
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-black p-1 transition-colors"
              id="cart-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
            {checkoutComplete ? (
              /* Success Stage */
              <div className="h-full flex flex-col justify-center items-center text-center space-y-4 px-4 py-12">
                <div className="w-14 h-14 bg-[#735c00]/10 flex items-center justify-center border border-[#735c00]/20 mb-2">
                  <Check className="w-6 h-6 text-[#735c00]" />
                </div>
                <h3 className="font-serif text-2xl text-[#000000] font-normal tracking-wide">
                  Transaction Authorized
                </h3>
                <div className="w-12 h-[1px] bg-[#735c00]/40 my-3" />
                <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                  We have registered your secure acquisition proposal. Our Private Client Lead will contact you directly via phone & email within 2 hours to confirm insured White Glove delivery logistics and bespoke details.
                </p>
                <p className="font-serif italic text-xs text-[#735c00] pt-6">
                  "Generations of peerless luxury is now yours to inherit."
                </p>
              </div>
            ) : isCheckingOut ? (
              /* Processing Stage */
              <div className="h-full flex flex-col justify-center items-center text-center space-y-4 py-24">
                <div className="relative">
                  <div className="w-12 h-12 border-2 border-[#735c00]/20 border-t-[#735c00] animate-spin rounded-none mb-3" />
                  <Sparkles className="w-4 h-4 text-[#fed65b] absolute top-[14px] left-[14px] animate-pulse" />
                </div>
                <h3 className="font-serif text-lg text-neutral-800 tracking-wider uppercase font-medium">
                  Authorizing Vault Funds
                </h3>
                <p className="font-sans text-[11px] text-neutral-400 uppercase tracking-widest animate-pulse">
                  Encoding secure armored delivery insurance ledger...
                </p>
              </div>
            ) : cartItems.length === 0 ? (
              /* Empty Stage */
              <div className="h-full flex flex-col justify-center items-center text-center py-20">
                <span className="font-serif italic text-3xl text-neutral-300 block mb-4">
                  The Bag is Airy
                </span>
                <p className="font-sans text-xs text-neutral-500 max-w-[240px] leading-relaxed mx-auto">
                  Browse our meticulously selected collections or schedule a bespoke consultation to populate this vault.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 font-sans text-xs uppercase tracking-[0.2em] font-medium text-[#735c00] border border-[#735c00] hover:bg-[#735c00] hover:text-[#fbf9f9] px-6 py-2.5 transition-all rounded-none"
                >
                  Return to Atelier
                </button>
              </div>
            ) : (
              /* Cart List Stage */
              <div className="space-y-6">
                <div className="space-y-4">
                  {cartItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 p-4 border border-neutral-100 bg-[#f6f3f4] rounded-none relative"
                    >
                      {/* Product Mini Thumb */}
                      <div className="w-20 h-24 flex-shrink-0 bg-neutral-200">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Configured Item Specs details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-serif text-[15px] text-[#000000] font-normal leading-tight pr-6">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(idx)}
                              className="text-neutral-400 hover:text-red-500 transition-colors absolute top-3 right-3"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="space-y-1 mt-1.5 font-sans text-[10px] text-neutral-500 uppercase tracking-wider">
                            <p className="font-medium text-neutral-700">
                              Base: {item.selectedMaterial}
                            </p>
                            
                            {item.engraving && (
                              <p className="text-[#735c00] font-serif lowercase italic tracking-widest">
                                Engraved: <span className="uppercase font-bold">"{item.engraving}"</span>
                              </p>
                            )}

                            {item.giftWrapped && (
                              <p className="text-neutral-600 flex items-center gap-1">
                                <Gift className="w-3 h-3 text-[#735c00]" />
                                Champagne Wrapping Box
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Adjust qty and Price display */}
                        <div className="flex justify-between items-center mt-3 pt-2 border-t border-neutral-200/40">
                          <div className="flex items-center border border-neutral-300 rounded-none bg-white">
                            <button
                              onClick={() => onUpdateQuantity(idx, -1)}
                              className="px-2 py-1 hover:bg-neutral-100 text-neutral-500"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 font-sans text-xs text-neutral-800 font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(idx, 1)}
                              className="px-2 py-1 hover:bg-neutral-100 text-neutral-500"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <span className="font-sans text-sm font-semibold text-neutral-800">
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sub-block of notes for Atelier customization */}
                <div className="bg-white p-4 border border-neutral-200 text-xs rounded-none">
                  <label className="font-sans text-[10px] text-neutral-500 uppercase tracking-widest font-semibold block mb-2">
                    Special Inscription Notes for Atelier
                  </label>
                  <textarea
                    rows={2}
                    value={noteToAtelier}
                    onChange={(e) => setNoteToAtelier(e.target.value)}
                    placeholder="Specify ring sizing requests (e.g. US 6.5) or request custom diamond grade verification letters..."
                    className="w-full bg-transparent border border-neutral-300 p-2 text-xs text-neutral-700 outline-none focus:border-[#735c00] transition-colors rounded-none placeholder-neutral-300"
                  />
                </div>

                {/* Assurance details */}
                <div className="space-y-3 bg-neutral-100 p-4 border border-neutral-200 text-[10px] text-neutral-500 uppercase tracking-widest leading-relaxed">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#735c00]" />
                    <span>Complimentary Armored Courier Transit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#735c00]" />
                    <span>Comprehensive Lloyd's Full Value Insurance Included</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          {!checkoutComplete && !isCheckingOut && cartItems.length > 0 && (
            <div className="border-t border-[#735c00]/15 bg-white p-6 space-y-4">
              <div className="flex justify-between items-baseline font-sans">
                <span className="text-xs uppercase font-medium text-neutral-500 tracking-wider">
                  Est. Delivery Subtotal
                </span>
                <span className="text-xl font-semibold text-neutral-800">
                  ${calculateSubtotal().toLocaleString()}
                </span>
              </div>
              
              <div className="w-full h-[0.5px] bg-[#735c00]/15" />

              <form onSubmit={handleCheckoutSubmit} className="space-y-3">
                <p className="font-sans text-[10px] text-neutral-400 text-center uppercase tracking-wider">
                  No immediate payment required • Securing high-value escrow holding details only
                </p>
                <button
                  type="submit"
                  className="w-full bg-[#000000] hover:bg-[#735c00] text-white text-xs uppercase tracking-[0.2em] font-semibold py-4 px-6 rounded-none transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#fed65b]" />
                  <span>Authorize Secure Acquisition</span>
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
