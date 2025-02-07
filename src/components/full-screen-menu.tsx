"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/community", label: "Community Ranking" },
  { href: "/users", label: "Search Users" },
  { href: "/similarity", label: "Ranking Similarity" },
  { href: "/correlation", label: "Character Correlation" },
  { href: "/rank", label: "Rank" },
];

export default function FullScreenMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <Button
        onClick={toggleMenu}
        variant="ghost"
        size="icon"
        className={`fixed top-4 right-4 z-50 p-2 focus:outline-hidden transition-colors duration-200 ${
          isOpen
            ? "text-white hover:text-black"
            : "text-primary bg-frieren-green/20 hover:bg-frieren-green/30"
        }`}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        )}
      </Button>

      <div
        onClick={toggleMenu}
        className={`fixed inset-0 z-40 flex items-center justify-center bg-linear-to-br from-green-700 to-blue-600/60 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav>
          <ul className="text-center">
            {navLinks.map((link) => (
              <li key={link.href} className="my-6">
                <Link
                  href={link.href}
                  className="text-4xl font-bold text-white hover:text-white/80 transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
