// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hlgpdjaamyhrvxglhesg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsZ3BkamFhbXlocnZ4Z2xoZXNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMjcwNDYsImV4cCI6MjA1NzgwMzA0Nn0.GJCaDdY_fRBrcAZr9qbA05PlXrFkG0KcwVspGYrk424";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);