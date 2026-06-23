import { createClient } from '@supabase/supabase-js'

// (Project Settings -> API)
const NEXT_PUBLIC_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
