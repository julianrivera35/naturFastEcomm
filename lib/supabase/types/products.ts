import { StaticImageData } from "next/image";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: (string | StaticImageData)[];
  category_id: string;
  slug: string;
  in_stock: boolean;
  created_at: string;
}
  
  export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    created_at: string;
  }
  
  export interface ProductWithCategory extends Product {
    category: Category;
  }