import { supabase } from '../config'
import { Database } from '../types'

type Product = Database['public']['Tables']['products']['Row']
type Category = Database['public']['Tables']['categories']['Row']

export async function getProducts({ 
  category,
  sort = 'created_at',
  direction = 'desc',
  limit = 100
}: {
  category?: string
  sort?: string
  direction?: 'asc' | 'desc'
  limit?: number
}) {
  let query = supabase
    .from('products')
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .limit(limit)
    .order(sort, { ascending: direction === 'asc' })

  if (category) {
    query = query.eq('categories.slug', category)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

export async function getProduct(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')

  if (error) throw error
  return data
}

export async function getCategory(slug: string) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}