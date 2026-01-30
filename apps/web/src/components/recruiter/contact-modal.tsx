"use client";

import type React from "react";
import { useState } from "react";

import { Loader2, Send } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Developer } from "@/types";

interface ContactModalProps {
  developer: Developer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSend: (message: string) => void;
}

export function ContactModal({
  developer,
  open,
  onOpenChange,
  onSend,
}: ContactModalProps) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onSend(message);
    setMessage("");
    setIsSending(false);
    onOpenChange(false);
  }

  if (!developer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-4 sm:max-w-md sm:p-6 lg:max-w-lg">
        <DialogHeader className="space-y-2 sm:space-y-3">
          <DialogTitle className="text-xl font-semibold sm:text-2xl">
            Contact Developer
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Send a message to request contact with this developer.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-muted/50 flex items-center gap-3 rounded-lg border p-3 sm:gap-4 sm:p-5">
          <Avatar className="h-12 w-12 shrink-0 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
            <AvatarImage
              src={developer.avatar || "/placeholder.svg"}
              alt={developer.name}
            />
            <AvatarFallback className="text-base sm:text-lg">
              {developer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-semibold sm:text-lg">
              {developer.name}
            </p>
            <p className="text-muted-foreground text-sm sm:text-base">
              Score: {developer.score}/100
            </p>
          </div>
        </div>

        <form onSubmit={handleSend} className="space-y-4 sm:space-y-5">
          <div className="space-y-2 sm:space-y-3">
            <Label
              htmlFor="message"
              className="text-sm font-medium sm:text-base"
            >
              Your Message
            </Label>
            <Textarea
              id="message"
              placeholder="Hi, I'm reaching out because..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
              className="min-h-[100px] resize-none text-sm sm:min-h-[120px] sm:text-base"
            />
            <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
              This message will be sent to the developer for review. They will
              decide whether to accept your request.
            </p>
          </div>

          <DialogFooter className="flex-col-reverse gap-2 pt-2 sm:flex-row sm:gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full bg-transparent sm:w-auto sm:min-w-[100px]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSending || !message.trim()}
              className="w-full gap-2 sm:w-auto sm:min-w-[140px]"
            >
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Request
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
