"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`로그인 실패: ${error.message}`);
    } else {
      setMessage("로그인 성공! 메인 페이지로 이동합니다.");
      setTimeout(() => router.push("/"), 1000);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex justify-center px-4 mt-20">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h1 className="mb-4 text-xl font-bold text-center">로그인</h1>
        <input
          type="email"
          placeholder="이메일"
          className="w-full p-2 mb-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full p-2 mb-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 text-white transition bg-green-600 rounded hover:bg-green-700"
        >
          로그인
        </button>
        {message && <p className="mt-2 text-sm text-center">{message}</p>}
        <p className="mt-4 text-sm text-center text-gray-600">
          계정이 없으신가요?{" "}
          <Link href="/signup" className="text-green-600 hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
