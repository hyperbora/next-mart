import { create } from "zustand";
import type { Session } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

interface AppState {
  // 로그인 세션
  session: Session | null;
  setSession: (session: Session | null) => void;

  // UI 상태
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
  checkAdmin: (userId: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  // 세션
  session: null,
  setSession: (session) => set({ session }),

  // UI 상태
  isSidebarOpen: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  isAdmin: false,
  setIsAdmin: (admin: boolean) => {
    set(() => ({ isAdmin: admin }));
  },
  checkAdmin: async (userId: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("roles")
      .select("role")
      .eq("user_id", userId);

    if (!error && data?.some((r) => r.role === "admin")) {
      set({ isAdmin: true });
    } else {
      set({ isAdmin: false });
    }
  },
}));
