"use client";

import React from "react";

interface KlyveLogoProps {
  size?: number;
  className?: string;
}

export default function KlyveLogo({ size = 40, className = "" }: KlyveLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        opacity="0.9"
      />
      
      {/* Middle interleaving circle - offset */}
      <circle
        cx="50"
        cy="40"
        r="28"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        opacity="0.7"
      />
      
      {/* Inner circle - opposite offset */}
      <circle
        cx="50"
        cy="60"
        r="20"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
      
      {/* Connecting arc */}
      <path
        d="M 50 5 Q 75 25 78 50"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
        strokeLinecap="round"
      />
      
      {/* Decorative dots at intersections */}
      <circle cx="50" cy="12" r="3" fill="currentColor" opacity="0.8" />
      <circle cx="50" cy="80" r="2.5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
