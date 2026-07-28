import { createClient } from '@supabase/supabase-js';

const defaultUrl = 'https://hreaxzxotefitgbhcora.supabase.co';
const defaultKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyZWF4enhvdGVmaXRnYmhjb3JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyMDQ4MzUsImV4cCI6MjEwMDc4MDgzNX0.x4zC-QBt90uFFRYAnf3FMtu2mgrscqsflcbmX7NhWHw';

const supabaseUrl = 
    (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL)) ||
    defaultUrl;

const supabaseAnonKey = 
    (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY)) ||
    defaultKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


