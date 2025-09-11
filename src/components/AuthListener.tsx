"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAppStore } from "@/store/useAppStore";

export default function AuthListener() {
  const setSession = useAppStore((state) => state.setSession);
  const checkAdmin = useAppStore((state) => state.checkAdmin);
  const setIsAdmin = useAppStore((state) => state.setIsAdmin);

  useEffect(() => {
    const supabase = createClient();
    // 초기 세션 로드
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // 세션 변경 감지
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);

        if (!session?.user?.id) {
          setIsAdmin(false);
          return;
        }

        (async () => {
          await checkAdmin(session.user.id);
        })();
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setSession, checkAdmin, setIsAdmin]);

  return null;
}
