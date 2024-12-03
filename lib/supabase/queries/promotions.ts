import { supabase } from '../config'
import { Database } from '../types'

type Promotion = Database['public']['Tables']['promotions']['Row']

export async function getActivePromotions() {
  const now = new Date().toISOString()
  
  const { data, error } = await supabase
    .from('promotions')
    .select('*')
    .eq('active', true)
    .lte('starts_at', now)
    .gte('ends_at', now)

  if (error) throw error
  return data
}

export async function getPromotion(id: string) {
  const { data, error } = await supabase
    .from('promotions')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function createPromotion(promotion: Omit<Promotion, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('promotions')
    .insert(promotion)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updatePromotion(id: string, updates: Partial<Promotion>) {
  const { data, error } = await supabase
    .from('promotions')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deletePromotion(id: string) {
  const { error } = await supabase
    .from('promotions')
    .delete()
    .eq('id', id)

  if (error) throw error
}