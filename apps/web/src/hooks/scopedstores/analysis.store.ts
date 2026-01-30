import { atom } from "jotai";

import { createScopedAtoms } from "@/lib/state/scoped-stores";
import type { AnalyzedRepo } from "@/types";

export type AnalysisState =
  | { status: "idle" }
  | { status: "responding"; currentStatus: string }
  | { status: "complete"; result: AnalyzedRepo }
  | { status: "error"; error: string };

export const AnalysisStore = createScopedAtoms(() => ({
  repoUrl: atom<string>(""),
  state: atom<AnalysisState>({ status: "idle" }),
}));
