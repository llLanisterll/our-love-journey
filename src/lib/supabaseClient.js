import { createClient } from '@supabase/supabase-js';

// Fallback default values for local development if environment variables are not set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhY2Nlc3NfdG9rZW4iOiJleGFtcGxlIn0=';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
