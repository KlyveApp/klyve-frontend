"use client";

import * as React from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { IconArrowUp, IconSparkles, IconPaperclip } from "@tabler/icons-react";

export default function ChatPage() {
  const [input, setInput] = React.useState("");

  // Destructure and provide a fallback check
  const chat = useChat({
    api: "/api/chat",
  });

  const { messages, append } = chat;

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || !append) return; // Guard clause

    setInput("");
    await append({
      role: "user",
      content: trimmedInput,
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) form.requestSubmit();
    }
  };

  return (
    <div className="relative flex flex-col h-[calc(100vh-var(--header-height))] bg-background">
      {messages.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
            <div className="p-4 rounded-full bg-linear-to-r from-emerald-500 via-green-400 to-cyan-400 text-white shadow-lg">
              <IconSparkles size={48} />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              How can Klyve help you today?
            </h1>
            <div className="flex flex-wrap justify-center gap-2 max-w-lg mt-4">
              {[
                "Summarize my recent notes",
                "Draft a professional proposal",
                "Analyze my resume for feedback",
                "Plan my weekly schedule",
              ].map((prompt) => (
                <Button
                  key={prompt}
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs bg-muted/50 hover:bg-muted"
                  // Use optional chaining or check for existence
                  onClick={() => append?.({ role: "user", content: prompt })}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {messages.length > 0 && (
        <div className="flex-1 overflow-y-auto p-4 space-y-6 max-w-3xl mx-auto w-full pt-8">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm md:text-base leading-relaxed ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted shadow-sm border border-border/40"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="w-full max-w-3xl mx-auto px-4 pb-8 pt-2">
        <form
          onSubmit={onSubmit}
          className="relative flex items-end w-full gap-2 rounded-2xl bg-muted/50 p-2 ring-1 ring-border focus-within:ring-ring/50"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-xl shrink-0"
          >
            <IconPaperclip size={20} />
          </Button>

          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            placeholder="Message Klyve..."
            className="flex-1 min-h-[40px] max-h-[200px] py-2.5 resize-none bg-transparent border-none focus:ring-0 outline-none text-sm md:text-base"
          />

          <Button
            type="submit"
            size="icon"
            className={`h-10 w-10 rounded-xl shrink-0 ${input.trim() ? "bg-primary" : "bg-muted"}`}
            disabled={!input.trim()}
          >
            <IconArrowUp size={20} />
          </Button>
        </form>
      </div>
    </div>
  );
}
