"use client";

import Image from "next/image";
import Link from "next/link";

import { ExternalLink, MapPin, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Developer } from "@/types";
import { getScoreLabel } from "@/types";

interface DeveloperCardProps {
  developer: Developer;
  onContact?: () => void;
  rank?: number;
}

export function DeveloperCard({
  developer,
  onContact,
  rank,
}: DeveloperCardProps) {
  const scoreLabel = getScoreLabel(developer.score);

  return (
    <Card className="relative p-6">
      {rank && rank <= 3 && (
        <div
          className={`absolute -top-2 -left-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
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
        <div className="bg-muted text-muted-foreground absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium">
          {rank}
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full">
          <Image
            src={
              developer.avatar ||
              "/placeholder.svg?height=64&width=64&query=developer portrait"
            }
            alt={developer.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="truncate font-semibold">{developer.name}</h3>
              <p className="text-muted-foreground text-sm">
                @{developer.username}
              </p>
            </div>
            <Badge
              variant="secondary"
              className={`shrink-0 font-bold ${
                developer.score >= 90
                  ? "bg-primary/20 text-primary border-primary/30 border"
                  : developer.score >= 80
                    ? "bg-success/20 text-success border-success/30 border"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {developer.score}
            </Badge>
          </div>
          {developer.location && (
            <div className="text-muted-foreground mt-2 flex items-center gap-1 text-sm">
              <MapPin className="h-3 w-3" />
              {developer.location}
            </div>
          )}
        </div>
      </div>

      <div className="mt-3">
        <span
          className={`text-xs font-medium ${
            developer.score >= 90
              ? "text-primary"
              : developer.score >= 80
                ? "text-success"
                : "text-muted-foreground"
          }`}
        >
          {scoreLabel}
        </span>
      </div>

      {developer.bio && (
        <p className="text-muted-foreground mt-3 line-clamp-2 text-sm">
          {developer.bio}
        </p>
      )}

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
  );
}
