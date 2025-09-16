import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-2 mt-2 text-sm text-center text-gray-600 bg-gray-100 border-t">
      <p>© 2025 Gmarket Clone. All rights reserved.</p>
      <a
        href="https://github.com/hyperbora/next-mart"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-2 text-gray-700 transition-colors hover:text-green-600"
      >
        <FaGithub size={24} />
        <span>View on GitHub</span>
      </a>
    </footer>
  );
}
