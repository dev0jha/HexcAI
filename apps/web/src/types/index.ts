export interface User {
  id: string;
  email: string;
  name: string;
  role: "developer" | "recruiter";
  avatar?: string;
  createdAt: Date;
}

export interface Developer extends User {
  role: "developer";
  username: string;
  bio?: string;
  location?: string;
  linkedIn?: string;
  website?: string;
  techStack: string[];
  score: number;
  isOpenToRecruiters: boolean;
  analyzedRepos: AnalyzedRepo[];
}

export interface Recruiter extends User {
  role: "recruiter";
  company: string;
  position: string;
}

export interface AnalyzedRepo {
  id: string;
  name: string;
  url: string;
  description?: string;
  language: string;
  stars: number;
  analyzedAt: Date;
  scores: ScoreBreakdown;
  totalScore: number;
  feedback: string[];
}

export interface ScoreBreakdown {
  codeQuality: number;
  architecture: number;
  security: number;
  gitPractices: number;
  documentation: number;
}

export interface ContactRequest {
  id: string;
  recruiterId: string;
  developerId: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
  recruiterName: string;
  recruiterCompany: string;
  recruiterEmail?: string;
}

export type ScoreLabel =
  | "Excellent"
  | "Strong"
  | "Average"
  | "Needs Improvement";

export function getScoreLabel(score: number): ScoreLabel {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Strong";
  if (score >= 60) return "Average";
  return "Needs Improvement";
}

export function getScoreColor(score: number): string {
  if (score >= 90) return "text-primary";
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-warning";
  return "text-destructive";
}
