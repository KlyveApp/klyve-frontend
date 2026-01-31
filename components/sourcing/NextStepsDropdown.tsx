"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface NextStepsDropdownProps {
  defaultValue?: string;
  onSelect?: (value: string) => void;
}

export default function NextStepsDropdown({ defaultValue = "", onSelect }: NextStepsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: "send_follow_up", label: "Send Follow Up" },
    { value: "send_second_follow_up", label: "Send 2nd Follow Up" },
    { value: "send_thank_you_email", label: "Send Thank You Email" },
    { value: "send_catch_up_email", label: "Send Catch Up Email" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || "Next step...";

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onSelect?.(value);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-xs bg-background border border-input rounded-md px-3 py-1.5 text-foreground shadow-sm outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-colors flex items-center justify-between hover:bg-muted/50"
      >
        <span className={selectedValue ? "" : "text-muted-foreground"}>
          {selectedLabel}
        </span>
        <ChevronDown
          size={14}
          className={`text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-input rounded-md shadow-lg overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className="w-full text-left text-xs px-3 py-2 hover:bg-muted/50 transition-colors text-foreground"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
