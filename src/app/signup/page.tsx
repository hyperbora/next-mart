"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    if (!fullName) {
      setMessage("이름을 입력하세요.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("올바른 이메일 주소를 입력해주세요.");
      return;
    }

    const phoneDigits = phone.replace(/\D/g, "");
    const phoneRegex = /^01[0-9]{8,9}$/;
    if (!phoneRegex.test(phoneDigits)) {
      setMessage("올바른 전화번호를 입력해주세요. 예: 01012345678");
      return;
    }

    if (password.length < 6) {
      setMessage("비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phoneDigits,
        },
      },
    });

    if (error) {
      setMessage(`회원가입 실패: ${error.message}`);
    } else {
      setMessage("회원가입 성공! 메인 페이지로 이동합니다...");
      setTimeout(() => router.push("/"), 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  return (
    <div className="flex justify-center mt-20 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4 text-center">회원가입</h1>
        <input
          type="email"
          placeholder="이메일"
          className="border p-2 w-full mb-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          type="password"
          placeholder="비밀번호 (6자 이상)"
          className="border p-2 w-full mb-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          type="text"
          placeholder="이름"
          className="border p-2 w-full mb-2 rounded"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          type="tel"
          placeholder="전화번호 (예: 01012345678)"
          className="border p-2 w-full mb-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSignup}
          className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 transition"
          onKeyDown={handleKeyDown}
        >
          회원가입
        </button>
        {message && <p className="mt-2 text-center text-sm">{message}</p>}
      </div>
    </div>
  );
}
