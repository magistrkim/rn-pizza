import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";

// const URL = "https://tzbgxacnohjompoimcmz.supabase.co";
// const KEY =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6Ymd4YWNub2hqb21wb2ltY216Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxMTEwNjksImV4cCI6MjAzODY4NzA2OX0.x4fjFW3a9l5dJhuvMl9QiOkpIZ2oYKBnDro7VCmvHY0";

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = URL;
const supabaseAnonKey = KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
