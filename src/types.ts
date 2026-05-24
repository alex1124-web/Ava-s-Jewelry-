export interface Product {
  id: string;
  name: string;
  collection: 'heritage-gold' | 'diamond-edit' | 'bespoke-creations';
  price: number;
  image: string;
  description: string;
  details: string[];
  carat?: string;
  materialOptions: string[];
  gemstone?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedMaterial: string;
  engraving?: string;
  giftWrapped: boolean;
}

export interface ConsultationBooking {
  id: string;
  clientName: string;
  clientEmail: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  customDesignIdea?: string;
}

export interface StyleQuizAnswers {
  aesthetic: string;
  metalPreference: string;
  lifestyle: string;
  gemstoneHighlight: string;
}
