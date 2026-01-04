"use client";

import React, { useState } from "react";
import { ListFilter, ArrowDownAZ } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MailList } from "@/components/mail/mail-list";
import { MailDisplay } from "@/components/mail/mail-display";
import { mails } from "@/app/(dashboard)/inbox/data";

export default function MailPage() {
  const [selectedMail, setSelectedMail] = useState(mails[0]);

  // States for filtering/sorting
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const displayedMails = showUnreadOnly ? mails.filter((m) => !m.read) : mails;

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      {/* --- Mail List Panel --- */}
      <div className="w-[400px] flex-shrink-0 border-r flex flex-col">
        {/* --- New Sort & Filter Header --- */}
        <div className="h-[52px] flex items-center px-4 border-b gap-2">
          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showUnreadOnly}
                onCheckedChange={setShowUnreadOnly}
              >
                Unread
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Has Attachments
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ArrowDownAZ className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Sort
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Date: Newest
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Date: Oldest</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* --- Mail List Content --- */}
        <div className="flex-1 overflow-hidden pt-4">
          <MailList
            items={displayedMails}
            selectedMail={selectedMail}
            setSelectedMail={setSelectedMail}
          />
        </div>
      </div>

      {/* --- Mail Display (Right) --- */}
      <div className="flex-1 flex flex-col min-w-0">
        <MailDisplay mail={selectedMail} />
      </div>
    </div>
  );
}
