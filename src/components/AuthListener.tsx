"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAppStore } from "@/store/useAppStore";

export default function AuthListener() {
  const setSession = useAppStore((state) => state.setSession);

  useEffect(() => {
    // 초기 세션 로드
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // 세션 변경 감지
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setSession]);

  return null; // 화면에 아무것도 렌더링하지 않음
}
