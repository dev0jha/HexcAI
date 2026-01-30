"use client";

import { Suspense, useState } from "react";

import { Search, TrendingUp } from "lucide-react";
import { toast } from "sonner";

import Container from "@/components/core/Container";
import { ContactModal } from "@/components/recruiter/contact-modal";
import { DeveloperCard } from "@/components/recruiter/developer-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { mockDevelopers } from "@/data/mock-data";
import type { Developer } from "@/types";

const techOptions = [
  "All",
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Go",
  "AWS",
  "Docker",
];
const scoreOptions = ["All", "90+", "80-89", "70-79"];

function DiscoverContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [techFilter, setTechFilter] = useState("All");
  const [scoreFilter, setScoreFilter] = useState("All");
  const [sortBy, setSortBy] = useState("score-desc");
  const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  const visibleDevelopers = mockDevelopers.filter(
    (dev) => dev.isOpenToRecruiters && dev.score >= 80
  );

  const filteredDevelopers = visibleDevelopers.filter((dev) => {
    const matchesSearch =
      dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dev.techStack.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesTech =
      techFilter === "All" || dev.techStack.some((tech) => tech === techFilter);

    const matchesScore =
      scoreFilter === "All" ||
      (scoreFilter === "90+" && dev.score >= 90) ||
      (scoreFilter === "80-89" && dev.score >= 80 && dev.score < 90) ||
      (scoreFilter === "70-79" && dev.score >= 70 && dev.score < 80);

    return matchesSearch && matchesTech && matchesScore;
  });

  const sortedDevelopers = [...filteredDevelopers].sort((a, b) => {
    switch (sortBy) {
      case "score-desc":
        return b.score - a.score;
      case "score-asc":
        return a.score - b.score;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return b.score - a.score;
    }
  });

  function handleContact(developer: Developer) {
    setSelectedDeveloper(developer);
    setModalOpen(true);
  }

  function handleSendRequest() {
    toast.success("Contact request sent to developer!");
  }

  return (
    <Container className="py-8">
      <div className="space-y-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Discover Developers</h1>
            <p className="text-muted-foreground mt-1">
              Find and connect with verified, high-quality developers ranked by
              their DevScore
            </p>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-3xl lg:grid-cols-[2fr_1fr_1fr_1fr]">
            <div>
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="search"
                  placeholder="Search by name or technology..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="tech-filter" className="sr-only">
                Technology
              </Label>
              <Select
                value={techFilter}
                onValueChange={(value) => value && setTechFilter(value)}
              >
                <SelectTrigger id="tech-filter">
                  <span className="truncate">
                    {techFilter === "All" ? "All Technologies" : techFilter}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {techOptions.map((tech) => (
                    <SelectItem key={tech} value={tech}>
                      {tech === "All" ? "All Technologies" : tech}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="score-filter" className="sr-only">
                Score Range
              </Label>
              <Select
                value={scoreFilter}
                onValueChange={(value) => value && setScoreFilter(value)}
              >
                <SelectTrigger id="score-filter">
                  <span className="truncate">
                    {scoreFilter === "All"
                      ? "All Scores"
                      : `Score ${scoreFilter}`}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {scoreOptions.map((score) => (
                    <SelectItem key={score} value={score}>
                      {score === "All" ? "All Scores" : `Score ${score}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sort-by" className="sr-only">
                Sort By
              </Label>
              <Select
                value={sortBy}
                onValueChange={(value) => value && setSortBy(value)}
              >
                <SelectTrigger id="sort-by">
                  <span className="flex items-center gap-2 truncate">
                    <TrendingUp className="h-4 w-4 shrink-0" />
                    {sortBy === "score-desc"
                      ? "Highest Score"
                      : sortBy === "score-asc"
                        ? "Lowest Score"
                        : sortBy === "name-asc"
                          ? "Name A-Z"
                          : "Name Z-A"}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score-desc">
                    <span className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Highest Score
                    </span>
                  </SelectItem>
                  <SelectItem value="score-asc">Lowest Score</SelectItem>
                  <SelectItem value="name-asc">Name A-Z</SelectItem>
                  <SelectItem value="name-desc">Name Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            Showing {sortedDevelopers.length} developer
            {sortedDevelopers.length !== 1 ? "s" : ""} sorted by{" "}
            {sortBy === "score-desc"
              ? "highest score"
              : sortBy === "score-asc"
                ? "lowest score"
                : sortBy === "name-asc"
                  ? "name (A-Z)"
                  : "name (Z-A)"}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedDevelopers.map((developer, index) => (
            <DeveloperCard
              key={developer.id}
              developer={developer}
              onContact={() => handleContact(developer)}
              rank={sortBy === "score-desc" ? index + 1 : undefined}
            />
          ))}
        </div>

        {sortedDevelopers.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No developers found matching your criteria.
            </p>
          </div>
        )}

        <ContactModal
          developer={selectedDeveloper}
          open={modalOpen}
          onOpenChange={setModalOpen}
          onSend={handleSendRequest}
        />
      </div>
    </Container>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={null}>
      <DiscoverContent />
    </Suspense>
  );
}
