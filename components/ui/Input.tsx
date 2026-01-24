"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  containerClassName?: string;
}

export default function Input({
  icon: Icon,
  containerClassName = "",
  className = "",
  ...props
}: InputProps) {
  return (
    <div className={`relative group ${containerClassName}`}>
      {Icon && (
        <Icon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground transition-colors"
          size={16}
        />
      )}
      <input
        className={`w-full bg-background border border-input rounded-md outline-none focus:ring-1 focus:ring-ring text-sm transition-all placeholder:text-muted-foreground ${
          Icon ? "pl-9 pr-3" : "px-3"
        } py-2.5 ${className}`}
        {...props}
      />
    </div>
  );
}
