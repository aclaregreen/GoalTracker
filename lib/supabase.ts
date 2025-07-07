import { createClient } from "@supabase/supabase-js";

// 🔁 Replace these with your actual values:
const SUPABASE_URL = "https://lyfaxlekhzvhxlxdidml.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5ZmF4bGVraHp2aHhseGRpZG1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExNDc2OTEsImV4cCI6MjA2NjcyMzY5MX0.snj5Sb6FI73r6-kLvf9KRuE4USpPyRuhtM0udtDxyxE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
