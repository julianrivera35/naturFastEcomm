export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          price: number
          category_id: string
          images: string[]
          in_stock: boolean
          slug: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          price: number
          category_id: string
          images?: string[]
          in_stock?: boolean
          slug: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          price?: number
          category_id?: string
          images?: string[]
          in_stock?: boolean
          slug?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          created_at: string
          user_id: string
          status: 'pending' | 'processing' | 'completed' | 'cancelled'
          total: number
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          total: number
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          total?: number
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
        }
      }
      posts: {
        Row: {
          id: string
          created_at: string
          title: string
          content: string
          author_id: string
          slug: string
          published: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          content: string
          author_id: string
          slug: string
          published?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          content?: string
          author_id?: string
          slug?: string
          published?: boolean
        }
      }
      promotions: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          discount_percent: number
          starts_at: string
          ends_at: string
          active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          discount_percent: number
          starts_at: string
          ends_at: string
          active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          discount_percent?: number
          starts_at?: string
          ends_at?: string
          active?: boolean
        }
      }
    }
  }
}