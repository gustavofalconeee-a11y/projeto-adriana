import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const adminKey = supabaseServiceKey && supabaseServiceKey !== 'COLOQUE_AQUI_SUA_SERVICE_ROLE_KEY' ? supabaseServiceKey : supabaseAnonKey;

export const supabaseAdmin = supabaseUrl && adminKey
    ? createClient(supabaseUrl, adminKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false
        }
    })
    : (null as any);

// Cliente público (pode ser usado no browser)
export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : (null as any);
