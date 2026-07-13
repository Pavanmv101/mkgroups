import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Check if env vars are present, otherwise use placeholders so the app doesn't crash during build/mock phase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
  
  return createBrowserClient(
    supabaseUrl,
    supabaseKey
  )
}
