import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../types'

export const createClient = () => {
  return createServerComponentClient<Database>({
    cookies
  })
}

export const createBrowserClient = () => {
  return createClientComponentClient<Database>()
}

export async function getUserProfile(userId: string) {
  const { data, error } = await createClient()
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

export async function updateUserProfile(userId: string, updates: any) {
  const { data, error } = await createClient()
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}