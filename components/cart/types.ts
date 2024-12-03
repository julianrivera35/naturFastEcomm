export interface CartItem {
    id: string;
    quantity: number;
    cost: {
      totalAmount: {
        amount: string;
        currencyCode: string;
      };
    };
    merchandise: {
      id: string;
      title: string;
      selectedOptions: {
        name: string;
        value: string;
      }[];
      product: {
        handle: string;
        title: string;
        featuredImage: {
          url: string;
          altText: string;
        };
      };
    };
  }
  
  export interface Cart {
    id?: string;
    checkoutUrl: string;
    totalQuantity: number;
    lines: CartItem[];
    cost: {
      subtotalAmount: { amount: string; currencyCode: string };
      totalAmount: { amount: string; currencyCode: string };
      totalTaxAmount: { amount: string; currencyCode: string };
    };
  }