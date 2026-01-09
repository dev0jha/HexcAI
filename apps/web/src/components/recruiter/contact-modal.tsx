"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Developer } from "@/types"
import { Loader2, Send } from "lucide-react"

interface ContactModalProps {
  developer: Developer | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSend: (message: string) => void
}

export function ContactModal({ developer, open, onOpenChange, onSend }: ContactModalProps) {
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim()) return

    setIsSending(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onSend(message)
    setMessage("")
    setIsSending(false)
    onOpenChange(false)
  }

  if (!developer) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md lg:max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="space-y-2 sm:space-y-3">
          <DialogTitle className="text-xl sm:text-2xl font-semibold">Contact Developer</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Send a message to request contact with this developer.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-5 rounded-lg bg-muted/50 border">
          <Avatar className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 shrink-0">
            <AvatarImage src={developer.avatar || "/placeholder.svg"} alt={developer.name} />
            <AvatarFallback className="text-base sm:text-lg">
              {developer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-base sm:text-lg truncate">{developer.name}</p>
            <p className="text-sm sm:text-base text-muted-foreground">Score: {developer.score}/100</p>
          </div>
        </div>

        <form onSubmit={handleSend} className="space-y-4 sm:space-y-5">
          <div className="space-y-2 sm:space-y-3">
            <Label htmlFor="message" className="text-sm sm:text-base font-medium">
              Your Message
            </Label>
            <Textarea
              id="message"
              placeholder="Hi, I'm reaching out because..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
              className="text-sm sm:text-base resize-none min-h-[100px] sm:min-h-[120px]"
            />
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              This message will be sent to the developer for review. They will decide whether to accept your request.
            </p>
          </div>

          <DialogFooter className="flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)} 
              className="w-full sm:w-auto sm:min-w-[100px] bg-transparent"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSending || !message.trim()} 
              className="w-full sm:w-auto sm:min-w-[140px] gap-2"
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
  )
}
