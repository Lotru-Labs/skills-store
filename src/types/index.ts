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
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}
