import { supabase } from '../config'
import { Database } from '../types'

type CartItem = {
  id: string
  user_id: string
  product_id: string
  quantity: number
}

export async function getCart(userId: string) {
  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      *,
      products (
        id,
        title,
        price,
        images
      )
    `)
    .eq('user_id', userId)

  if (error) throw error
  return data
}

export async function addToCart(item: Omit<CartItem, 'id'>) {
  const { data, error } = await supabase
    .from('cart_items')
    .upsert(item)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function removeFromCart(userId: string, productId: string) {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .match({ user_id: userId, product_id: productId })

  if (error) throw error
}

export async function updateCartItemQuantity(
  userId: string, 
  productId: string, 
  quantity: number
) {
  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .match({ user_id: userId, product_id: productId })
    .select()
    .single()

  if (error) throw error
  return data
}