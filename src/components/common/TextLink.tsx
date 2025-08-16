"use client";

import Link from "next/link";

interface TextLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function TextLink({ href, children, className }: TextLinkProps) {
  return (
    <Link
      href={href}
      className="transition-colors cursor-pointer hover:text-green-600"
    >
      <p className={`${className || ""}`}>{children}</p>
    </Link>
  );
}
