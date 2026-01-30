"use client";

import { useState } from "react";

import Link from "next/link";

import { ExternalLink, Mail, Search, Trash2 } from "lucide-react";

import Container from "@/components/core/Container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

interface Candidate {
  id: string;
  name: string;
  username: string;
  avatar: string;
  score: number;
  techStack: string[];
  location: string;
  contactedDate: string;
  status: "pending" | "interested" | "not-interested";
}

// Mock data - replace with actual data
const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    username: "sarahj",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    score: 94,
    techStack: ["React", "TypeScript", "Node.js"],
    location: "San Francisco, CA",
    contactedDate: "2025-01-05",
    status: "interested",
  },
  {
    id: "2",
    name: "Michael Chen",
    username: "mchen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    score: 89,
    techStack: ["Python", "Django", "PostgreSQL"],
    location: "New York, NY",
    contactedDate: "2025-01-03",
    status: "pending",
  },
];

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.techStack.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "all" || candidate.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function handleRemove(id: string) {
    setCandidates(candidates.filter((c) => c.id !== id));
  }

  return (
    <Container className="py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">My Candidates</h1>
          <p className="text-muted-foreground mt-1">
            Manage developers you've contacted
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value) => value && setStatusFilter(value)}
          >
            <SelectTrigger className="w-full sm:w-48">
              <span className="truncate">
                {statusFilter === "all"
                  ? "All Status"
                  : statusFilter === "pending"
                    ? "Pending"
                    : statusFilter === "interested"
                      ? "Interested"
                      : "Not Interested"}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="interested">Interested</SelectItem>
              <SelectItem value="not-interested">Not Interested</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {filteredCandidates.map((candidate) => (
            <Card key={candidate.id} className="p-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-start gap-4">
                  <Avatar className="h-12 w-12 shrink-0">
                    <AvatarImage src={candidate.avatar} alt={candidate.name} />
                    <AvatarFallback>
                      {candidate.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{candidate.name}</h3>
                      <Badge
                        variant="secondary"
                        className={
                          candidate.score >= 90
                            ? "bg-primary/20 text-primary border-primary/30 border"
                            : "bg-success/20 text-success border-success/30 border"
                        }
                      >
                        {candidate.score}
                      </Badge>
                      <Badge
                        variant={
                          candidate.status === "interested"
                            ? "default"
                            : candidate.status === "pending"
                              ? "secondary"
                              : "outline"
                        }
                        className="capitalize"
                      >
                        {candidate.status === "not-interested"
                          ? "Not Interested"
                          : candidate.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      @{candidate.username}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {candidate.location}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {candidate.techStack.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-muted-foreground mt-2 text-xs">
                      Contacted on{" "}
                      {new Date(candidate.contactedDate).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "short", day: "numeric" }
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 sm:flex-col">
                  <Link
                    href={`/profile/${candidate.username}`}
                    className="flex-1 sm:flex-none"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Profile
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive flex-1 sm:flex-none"
                    onClick={() => handleRemove(candidate.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredCandidates.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No candidates found.</p>
          </div>
        )}
      </div>
    </Container>
  );
}
