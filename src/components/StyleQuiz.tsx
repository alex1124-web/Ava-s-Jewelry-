import React from 'react';
import { Sparkles, ArrowRight, RotateCcw, Diamond, ShoppingBag, Eye } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';

interface StyleQuizProps {
  onSelectProduct: (product: Product) => void;
}

export default function StyleQuiz({ onSelectProduct }: StyleQuizProps) {
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);
  const [answers, setAnswers] = React.useState<string[]>([]);
  const [matchedProduct, setMatchedProduct] = React.useState<Product | null>(null);

  const questions = [
    {
      title: "Select your signature atmosphere",
      subtitle: "Where do you envision yourself wearing this family masterpiece?",
      key: 'atmosphere',
      options: [
        { label: "An intimate velvet-clad opera box or cocktail suite", value: "opera" },
        { label: "A minimalist gallery opening or high-profile summit", value: "gallery" },
        { label: "Sun-drenched yacht decks or private summer seaside villas", value: "seaside" }
      ]
    },
    {
      title: "Identify your metallic affinity",
      subtitle: "Which base gold hue speaks most intimately to your skin?",
      key: 'metal',
      options: [
        { label: "Warm, heavy 18K Yellow Gold with ancestral beats", value: "gold" },
        { label: "Pure, high-density Platinum-950 with absolute sheen", value: "platinum" },
        { label: "Nostalgic, warm Rose Gold carrying classic heritage", value: "rose" }
      ]
    },
    {
      title: "Determine your focal stone selection",
      subtitle: "Which deep color or crystal symmetry captures your soul?",
      key: 'gems',
      options: [
        { label: "High-Brilliance Ethically Sourced Flawless Diamonds", value: "diamond" },
        { label: "Venture Blue Ceylon Sapphire or deep Forest Emerald", value: "emerald-sapphire" },
        { label: "Luminous organic pearls or absolute metal-only engravings", value: "metal-pearl" }
      ]
    }
  ];

  const handleOptionSelect = (value: string) => {
    const updatedAnswers = [...answers, value];
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate Matches
      calculateMatch(updatedAnswers);
    }
  };

  const calculateMatch = (finalAnswers: string[]) => {
    const [atmosphere, metal, gem] = finalAnswers;
    
    let matchedId = 'heritage-gold-cuff'; // Default

    if (gem === 'diamond') {
      if (atmosphere === 'gallery') {
        matchedId = 'solitaire-studs';
      } else {
        matchedId = 'diamond-eternity-band';
      }
    } else if (gem === 'emerald-sapphire') {
      if (metal === 'platinum') {
        matchedId = 'bespoke-sapphire';
      } else {
        matchedId = 'bespoke-emerald-signet';
      }
    } else {
      if (atmosphere === 'seaside') {
        matchedId = 'heritage-aether-choker';
      } else {
        matchedId = 'heritage-gold-cuff';
      }
    }

    const prod = PRODUCTS.find(p => p.id === matchedId) || PRODUCTS[0];
    setMatchedProduct(prod);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setMatchedProduct(null);
  };

  return (
    <section className="bg-[#f0edee] py-24 px-6 md:px-20 border-t border-b border-[#735c00]/10" id="style-quiz">
      <div className="max-w-[1440px] mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="font-sans text-xs font-semibold text-[#735c00] uppercase tracking-[0.3em] block mb-2">
            The Radiance Match
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#000000] font-normal tracking-wide">
            Find Your Heirlooms
          </h2>
          <p className="font-sans text-xs text-neutral-500 max-w-md mx-auto mt-3 leading-relaxed">
            Answer three bespoke questions, and allow our heritage curator algorithms to identify your design match.
          </p>
        </div>

        <div className="max-w-[750px] mx-auto bg-[#fbf9f9] border border-[#735c00]/20 p-8 md:p-12 rounded-none shadow-md min-h-[420px] flex flex-col justify-between">
          {!matchedProduct ? (
            /* QUESTIONS FLOW */
            <div>
              {/* Progress indicators wrapper */}
              <div className="flex justify-between items-center mb-10">
                <span className="font-sans text-[10px] text-neutral-400 uppercase tracking-widest">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                
                {/* Visual Line Progress */}
                <div className="flex gap-1">
                  {questions.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1 w-8 rounded-none transition-all duration-300 ${
                        idx <= currentQuestion ? 'bg-[#735c00]' : 'bg-neutral-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Title Section */}
              <div className="space-y-2 mb-8">
                <h3 className="font-serif text-xl sm:text-2xl font-light text-neutral-900 leading-snug">
                  {questions[currentQuestion].title}
                </h3>
                <p className="font-sans text-xs text-neutral-400 capitalize">
                  {questions[currentQuestion].subtitle}
                </p>
              </div>

              {/* Options lists */}
              <div className="space-y-3">
                {questions[currentQuestion].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(opt.value)}
                    className="w-full bg-transparent hover:bg-[#f6f3f4] text-left p-5 border border-neutral-200 hover:border-[#735c00]/40 transition-all rounded-none flex justify-between items-center group cursor-pointer"
                  >
                    <span className="font-sans text-xs sm:text-sm text-neutral-700 tracking-wide">
                      {opt.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#735c00] group-hover:translate-x-1.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* RESULTS STAGE */
            <div className="flex flex-col md:flex-row gap-8 items-center py-4">
              {/* Product recommendation Frame */}
              <div className="w-full md:w-1/2 aspect-[4/5] bg-neutral-100 border border-neutral-200 overflow-hidden relative">
                <img
                  src={matchedProduct.image}
                  alt={matchedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-black/85 text-[#fed65b] text-[9px] font-sans font-bold tracking-[0.2em] px-3.5 py-1 uppercase rounded-none">
                  Aesthetic Match Match
                </div>
              </div>

              {/* Specs & Suggestion CTA */}
              <div className="w-full md:w-1/2 space-y-5">
                <div className="space-y-1">
                  <span className="font-sans text-[9px] uppercase tracking-[0.3em] font-bold text-[#735c00]">
                    Your Perfect Signature Pair
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#000000] font-normal leading-tight">
                    {matchedProduct.name}
                  </h3>
                  <p className="font-sans text-sm font-semibold text-neutral-800">
                    ${matchedProduct.price.toLocaleString()}
                  </p>
                </div>

                <p className="font-sans text-xs text-neutral-500 leading-relaxed">
                  Based on your affinity for {answers[1] === 'gold' ? 'ancestral gold' : answers[1] === 'platinum' ? 'platinum layers' : 'warm rose layers'}, we matched you with {matchedProduct.name}. {matchedProduct.description}
                </p>

                <div className="w-full h-[0.5px] bg-[#735c00]/20" />

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => onSelectProduct(matchedProduct)}
                    className="w-full bg-[#000000] hover:bg-[#735c00] text-[#fbf9f9] text-xs uppercase tracking-[0.15em] font-semibold py-3.5 rounded-none transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Eye className="w-4 h-4 text-[#fed65b]" />
                    <span>Inspect and Customise</span>
                  </button>
                  
                  <button
                    onClick={resetQuiz}
                    className="w-full bg-transparent hover:bg-neutral-100 text-neutral-500 text-[10px] uppercase tracking-widest py-2 rounded-none transition-all flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
