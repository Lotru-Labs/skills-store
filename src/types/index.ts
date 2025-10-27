// Type definitions for the marketplace

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  isOSS: boolean; // Open Source Software - if true, skill is open source; if false and price is 0, it's free (closed source)
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
