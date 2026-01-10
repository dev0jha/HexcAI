"use client"

import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Developer } from "@/types"
import { getScoreLabel } from "@/types"
import { MapPin, ExternalLink, Trophy } from "lucide-react"

interface DeveloperCardProps {
  developer: Developer
  onContact?: () => void
  rank?: number
}

export function DeveloperCard({ developer, onContact, rank }: DeveloperCardProps) {
  const scoreLabel = getScoreLabel(developer.score)

  return (
    <Card className="p-6 relative">
      {rank && rank <= 3 && (
        <div
          className={`absolute -top-2 -left-2 h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
            rank === 1
              ? "bg-yellow-500 text-yellow-950"
              : rank === 2
                ? "bg-gray-300 text-gray-800"
                : "bg-amber-600 text-amber-950"
          }`}
        >
          {rank === 1 ? <Trophy className="h-4 w-4" /> : rank}
        </div>
      )}
      {rank && rank > 3 && (
        <div className="absolute -top-2 -left-2 h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
          {rank}
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full">
          <Image
            src={developer.avatar || "/placeholder.svg?height=64&width=64&query=developer portrait"}
            alt={developer.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold truncate">{developer.name}</h3>
              <p className="text-sm text-muted-foreground">@{developer.username}</p>
            </div>
            <Badge
              variant="secondary"
              className={`shrink-0 font-bold ${
                developer.score >= 90
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : developer.score >= 80
                    ? "bg-success/20 text-success border border-success/30"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {developer.score}
            </Badge>
          </div>
          {developer.location && (
            <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {developer.location}
            </div>
          )}
        </div>
      </div>

      <div className="mt-3">
        <span
          className={`text-xs font-medium ${
            developer.score >= 90 ? "text-primary" : developer.score >= 80 ? "text-success" : "text-muted-foreground"
          }`}
        >
          {scoreLabel}
        </span>
      </div>

      {developer.bio && <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{developer.bio}</p>}

      <div className="mt-4 flex flex-wrap gap-2">
        {developer.techStack.slice(0, 5).map((tech) => (
          <Badge key={tech} variant="outline" className="text-xs">
            {tech}
          </Badge>
        ))}
        {developer.techStack.length > 5 && (
          <Badge variant="outline" className="text-xs">
            +{developer.techStack.length - 5}
          </Badge>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <Button onClick={onContact} className="flex-1">
          Contact
        </Button>
        <Link href={`/profile/${developer.username}`}>
          <Button variant="outline" size="icon" className="bg-transparent">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  )
}
