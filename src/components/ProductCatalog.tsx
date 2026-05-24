import React from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { Search, SlidersHorizontal, Diamond, Sparkles, Filter } from 'lucide-react';

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
  initialCollectionFilter?: string;
}

export default function ProductCatalog({ onSelectProduct, initialCollectionFilter }: ProductCatalogProps) {
  const [selectedCollection, setSelectedCollection] = React.useState<string>(initialCollectionFilter || 'all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [maxPrice, setMaxPrice] = React.useState<number>(30000);

  // Sync with prop changes if any (e.g. user clicked "Shop Now" on homepage)
  React.useEffect(() => {
    if (initialCollectionFilter) {
      setSelectedCollection(initialCollectionFilter);
    }
  }, [initialCollectionFilter]);

  const collections = [
    { id: 'all', name: 'All Curation' },
    { id: 'heritage-gold', name: 'Heritage Gold' },
    { id: 'diamond-edit', name: 'The Diamond Edit' },
    { id: 'bespoke-creations', name: 'Bespoke Creations' }
  ];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCollection = selectedCollection === 'all' || product.collection === selectedCollection;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price <= maxPrice;
    return matchesCollection && matchesSearch && matchesPrice;
  });

  return (
    <section className="py-24 px-6 md:px-20 max-w-[1440px] mx-auto" id="selected-masterpieces">
      {/* Title block */}
      <div className="text-center mb-16">
        <span className="font-sans text-xs font-semibold text-neutral-500 uppercase tracking-[0.3em] block mb-3">
          The Vault
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#000000] tracking-wide">
          Selected Masterpieces
        </h2>
        <div className="w-16 h-[1px] bg-[#735c00]/40 mx-auto mt-6" />
      </div>

      {/* Filter and Search Bar */}
      <div className="border border-[#735c00]/15 bg-[#fbf9f9] p-6 mb-12 flex flex-col lg:flex-row gap-6 justify-between items-center rounded-none shadow-sm">
        {/* Collection Selector Tabs */}
        <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-center lg:justify-start">
          {collections.map((coll) => (
            <button
              key={coll.id}
              onClick={() => setSelectedCollection(coll.id)}
              className={`font-sans text-xs uppercase font-medium tracking-[0.15em] px-4 py-2 transition-all rounded-none border ${
                selectedCollection === coll.id
                  ? 'bg-[#000000] text-[#fbf9f9] border-[#000000]'
                  : 'bg-transparent text-neutral-600 border-transparent hover:text-[#735c00] hover:border-[#735c00]/25'
              }`}
            >
              {coll.name}
            </button>
          ))}
        </div>

        {/* Search Input / Price Filter */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-stretch sm:items-center">
          {/* Search */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search precious pieces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border border-neutral-300 focus:outline-none focus:border-[#735c00] py-2 pl-9 pr-4 font-sans text-xs uppercase tracking-wider text-neutral-800 placeholder-neutral-400 rounded-none transition-all"
            />
          </div>

          {/* Max Price Filter */}
          <div className="flex items-center gap-3 bg-neutral-50 border border-neutral-200 px-4 py-2 rounded-none">
            <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-neutral-500">
              Max Value:
            </span>
            <input
              type="range"
              min="5000"
              max="30000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-[#735c00] cursor-pointer w-24 h-1 bg-neutral-200"
            />
            <span className="font-sans text-xs font-semibold text-[#735c00]">
              ${maxPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Main Catalog Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-neutral-200 rounded-none bg-neutral-50/50">
          <Diamond className="w-8 h-8 text-neutral-300 mx-auto mb-4 animate-pulse" />
          <p className="font-serif text-lg text-neutral-600">No masterpieces match your precise filters</p>
          <button
            onClick={() => {
              setSelectedCollection('all');
              setSearchQuery('');
              setMaxPrice(30000);
            }}
            className="mt-4 font-sans text-xs uppercase font-medium tracking-widest text-[#735c00] underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image Frame */}
              <div className="aspect-[4/5] overflow-hidden bg-neutral-100 relative border border-transparent group-hover:border-[#735c00]/20 transition-all duration-500">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Label Pill (e.g. Carat) */}
                {product.carat && (
                  <div className="absolute top-4 left-4 bg-[#fbf9f9]/95 text-neutral-800 text-[9px] font-sans font-semibold uppercase tracking-[0.2em] px-3 py-1 border border-[#735c00]/15 rounded-none shadow-sm flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-[#735c00]" />
                    <span>{product.carat}</span>
                  </div>
                )}

                {/* Hover Quick View Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-[#000000]/70 py-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                  <span className="text-[#fbf9f9] font-sans text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-2">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    Bespoke Tailoring Console
                  </span>
                </div>
              </div>

              {/* Subtext info */}
              <div className="mt-6 flex flex-col space-y-2">
                <span className="font-sans text-[10px] text-neutral-400 uppercase tracking-[0.25em]">
                  {product.collection.replace('-', ' ')}
                </span>
                
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-[#000000] group-hover:text-[#735c00] transition-colors leading-tight">
                    {product.name}
                  </h3>
                  <span className="font-sans text-sm font-semibold text-neutral-800 ml-4">
                    ${product.price.toLocaleString()}
                  </span>
                </div>

                <p className="font-sans text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                <div className="pt-2">
                  <span className="font-sans text-[10px] font-semibold text-[#735c00] uppercase tracking-widest inline-block border-b border-[#735c00]/20 pb-0.5 group-hover:border-[#735c00] transition-colors">
                    Tailor & Acquire
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
