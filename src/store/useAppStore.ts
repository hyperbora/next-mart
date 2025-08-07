import { create } from "zustand";
import type { Session } from "@supabase/supabase-js";

interface AppState {
  // 로그인 세션
  session: Session | null;
  setSession: (session: Session | null) => void;

  // UI 상태
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // 세션
  session: null,
  setSession: (session) => set({ session }),

  // UI 상태
  isSidebarOpen: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
