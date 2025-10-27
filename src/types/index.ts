// Type definitions for the marketplace

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  isPaid: boolean;
  author: string;
  downloads: number;
  rating: number;
  version: string;
  tags: string[];
  imageUrl: string;
  lastUpdated: string;
  compatibility: string[];
  icon?: string; // Optional icon: URL for image or short text (1-3 chars) if no image
  installUrl?: string; // Optional URL to the skill's installation endpoint
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}
