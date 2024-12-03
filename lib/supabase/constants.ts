export type SortFilterItem = {
    title: string;
    slug: string | null;
  };
  
  export const defaultSort: SortFilterItem = {
    title: 'Newest',
    slug: 'newest'
  };
  
  export const sorting: SortFilterItem[] = [
    defaultSort,
    { title: 'Price: Low to high', slug: 'price-asc' },
    { title: 'Price: High to low', slug: 'price-desc' }
  ];
  
  export const TAGS = {
    collections: 'collections',
    products: 'products',
    cart: 'cart'
  };

  export const DEFAULT_OPTION = 'Default Title';