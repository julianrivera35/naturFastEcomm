import { supabase } from '../config'
import { Database } from '../types'

type Post = Database['public']['Tables']['posts']['Row']

export async function getPosts({
  limit = 10,
  offset = 0,
  published = true
}: {
  limit?: number
  offset?: number
  published?: boolean
}) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles (
        username,
        avatar_url
      )
    `)
    .eq('published', published)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return data
}

export async function getPost(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles (
        username,
        avatar_url
      )
    `)
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

export async function createPost(post: Omit<Post, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('posts')
    .insert(post)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updatePost(id: string, updates: Partial<Post>) {
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deletePost(id: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) throw error
}