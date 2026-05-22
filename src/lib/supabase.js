import { createClient } from '@supabase/supabase-js'

// Supabase接続クライアント（環境変数から読み込み）
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
