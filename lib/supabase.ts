import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { SUPABASE_URL, SUPABASE_ANON_KEY } = Constants.expoConfig?.extra || {};

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase environment variables.");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // important for mobile
  },
});
