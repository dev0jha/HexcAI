"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, AlertCircle } from "lucide-react"

interface VisibilityToggleProps {
  initialValue: boolean
  score: number
}

export function VisibilityToggle({ initialValue, score }: VisibilityToggleProps) {
  const [isOpen, setIsOpen] = useState(initialValue)
  const canBeVisible = score >= 80

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {isOpen && canBeVisible ? (
            <div className="rounded-lg bg-primary/10 p-2">
              <Eye className="h-5 w-5 text-primary" />
            </div>
          ) : (
            <div className="rounded-lg bg-muted p-2">
              <EyeOff className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
          <div>
            <Label htmlFor="visibility" className="text-base font-semibold">
              Open to Recruiters
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              {isOpen && canBeVisible
                ? "Recruiters can view your profile and send contact requests"
                : "Your profile is hidden from recruiters"}
            </p>
          </div>
        </div>
        <Switch
          id="visibility"
          checked={isOpen && canBeVisible}
          onCheckedChange={setIsOpen}
          disabled={!canBeVisible}
        />
      </div>

      {!canBeVisible && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted p-3">
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            You need a score of 80+ to be visible to recruiters. Current: {score}
          </p>
        </div>
      )}

      {isOpen && canBeVisible && (
        <div className="mt-4 flex items-center gap-2">
          <Badge variant="outline" className="border-primary text-primary">
            Visible to recruiters
          </Badge>
        </div>
      )}
    </Card>
  )
}
