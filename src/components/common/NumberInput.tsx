"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

export default function NumberInput({
  value,
  onChange,
  min = 1,
  max = 999,
  step = 1,
  className = "",
}: NumberInputProps) {
  const [localValue, setLocalValue] = useState(value.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // 입력값이 공백이면 그대로 두고 blur 시 처리
    if (val === "") {
      setLocalValue("");
      return;
    }

    // 숫자만 입력 가능 (잘못된 문자는 무시)
    if (!/^\d*$/.test(val)) return;

    setLocalValue(val);
  };

  const handleBlur = () => {
    let num = Number(localValue);

    if (!localValue || isNaN(num)) {
      toast.error(`최소 ${min} 이상 입력해야 합니다.`);
      num = min;
    } else if (num < min) {
      toast.error(`최소 ${min} 이상 입력해야 합니다.`);
      num = min;
    } else if (num > max) {
      toast.error(`최대 ${max}까지 입력 가능합니다.`);
      num = max;
    }

    setLocalValue(num.toString());
    onChange(num);
  };

  const increase = () => {
    const newValue = Math.min(max, Number(localValue || value) + step);
    setLocalValue(newValue.toString());
    onChange(newValue);
  };

  const decrease = () => {
    const newValue = Math.max(min, Number(localValue || value) - step);
    setLocalValue(newValue.toString());
    onChange(newValue);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={decrease}
        className="w-10 h-10 flex items-center justify-center border rounded-full text-xl font-bold hover:bg-gray-100 disabled:opacity-50"
        disabled={Number(localValue) <= min}
      >
        -
      </button>

      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-16 text-center border rounded-md text-lg"
      />

      <button
        type="button"
        onClick={increase}
        className="w-10 h-10 flex items-center justify-center border rounded-full text-xl font-bold hover:bg-gray-100 disabled:opacity-50"
        disabled={Number(localValue) >= max}
      >
        +
      </button>
    </div>
  );
}
