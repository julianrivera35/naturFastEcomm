'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { supabase } from 'lib/supabase/config';
import { v4 as uuidv4 } from 'uuid';
import { CART_COOKIE, TAGS } from 'lib/supabase/constants';

export async function createCart() {
  const cartId = uuidv4();
  const { data, error } = await supabase
    .from('carts')
    .insert({ id: cartId })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getCart(cartId: string | undefined) {
  if (!cartId) return;

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
    .eq('cart_id', cartId);

  if (error) throw error;
  return data;
}

export async function addToCart(
  cartId: string,
  items: { merchandiseId: string; quantity: number }[]
) {
  if (!cartId || !items.length) return;

  const cartItems = items.map(item => ({
    cart_id: cartId,
    product_id: item.merchandiseId,
    quantity: item.quantity
  }));

  const { error } = await supabase
    .from('cart_items')
    .upsert(cartItems, {
      onConflict: 'cart_id,product_id'
    });

  if (error) throw error;
  revalidateTag(TAGS.cart);
}

export async function removeFromCart(cartId: string, itemIds: string[]) {
  if (!cartId || !itemIds.length) return;

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('cart_id', cartId)
    .in('id', itemIds);

  if (error) throw error;
  revalidateTag(TAGS.cart);
}

export async function updateCart(
  cartId: string,
  items: { id: string; merchandiseId: string; quantity: number }[]
) {
  if (!cartId || !items.length) return;

  const updates = items.map(item => ({
    id: item.id,
    cart_id: cartId,
    product_id: item.merchandiseId,
    quantity: item.quantity
  }));

  const { error } = await supabase
    .from('cart_items')
    .upsert(updates);

  if (error) throw error;
  revalidateTag(TAGS.cart);
}

export async function createCartAndSetCookie() {
  const cart = await createCart();
  (await cookies()).set(CART_COOKIE, cart.id);
}