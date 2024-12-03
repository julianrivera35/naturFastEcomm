'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase } from 'lib/supabase/config';
import { TAGS } from 'lib/supabase/constants';

export async function getCart(orderId: string | undefined) {
  if (!orderId) return;

  const { data, error } = await supabase
    .from('order_items')
    .select(`
      *,
      products (
        id,
        name,
        price,
        images
      )
    `)
    .eq('order_id', orderId)
    .eq('orders.status', 'pending');

  if (error) throw error;
  return data;
}

export async function addToCart(
  orderId: string,
  items: { merchandiseId: string; quantity: number }[]
) {
  if (!orderId || !items.length) return;

  const orderItems = items.map(item => ({
    order_id: orderId,
    product_id: item.merchandiseId,
    quantity: item.quantity,
    price_at_time: 0 // Se actualizará con el precio actual del producto
  }));

  // Get current prices
  const productIds = items.map(item => item.merchandiseId);
  const { data: products } = await supabase
    .from('products')
    .select('id, price')
    .in('id', productIds);

  // Update prices
  orderItems.forEach(item => {
    const product = products?.find(p => p.id === item.product_id);
    if (product) {
      item.price_at_time = product.price;
    }
  });

  const { error } = await supabase
    .from('order_items')
    .upsert(orderItems, {
      onConflict: 'order_id,product_id'
    });

  if (error) throw error;
  revalidateTag(TAGS.cart);
}

export async function removeFromCart(orderId: string, itemIds: string[]) {
  if (!orderId || !itemIds.length) return;

  const { error } = await supabase
    .from('order_items')
    .delete()
    .eq('order_id', orderId)
    .in('id', itemIds);

  if (error) throw error;
  revalidateTag(TAGS.cart);
}

export async function updateCart(
  orderId: string,
  items: { id: string; merchandiseId: string; quantity: number }[]
) {
  if (!orderId || !items.length) return;

  const updates = items.map(item => ({
    id: item.id,
    order_id: orderId,
    product_id: item.merchandiseId,
    quantity: item.quantity
  }));

  const { error } = await supabase
    .from('order_items')
    .upsert(updates);

  if (error) throw error;
  revalidateTag(TAGS.cart);
}

export async function createCartAndSetCookie() {
  // Crear una nueva orden pendiente
  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      status: 'pending',
      total_amount: 0
    })
    .select()
    .single();

  if (error) throw error;
  
  (await cookies()).set('cartId', order.id);
  return order;
}

export async function redirectToCheckout() {
  const cartId = (await cookies()).get('cartId')?.value;
  
  if (!cartId) {
    return 'Missing cart ID';
  }

  // Update order status from 'pending' to 'processing'
  const { data: order, error } = await supabase
    .from('orders')
    .update({ status: 'processing' })
    .eq('id', cartId)
    .single();

  if (error) throw error;

  // TODO: Integrate with your payment provider
  // For now, redirect to a dummy checkout page
  redirect('/checkout');
}