import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Create a single supabase client for the entire session
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  }
)

// Helper to handle Supabase Date responses
export const formatSupabaseDate = (date: string) => {
  return new Date(date).toISOString()
}

// Type guard for Supabase errors
export const isSupabaseError = (error: unknown): error is { message: string; details: string } => {
  return typeof error === 'object' && error !== null && 'message' in error
}

// Generic error handler for Supabase operations
export const handleSupabaseError = (error: unknown) => {
  if (isSupabaseError(error)) {
    throw new Error(`Supabase error: ${error.message}`)
  }
  throw error
}