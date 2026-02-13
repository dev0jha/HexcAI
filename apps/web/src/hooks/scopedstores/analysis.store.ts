import { Atom } from "jotai"

import { atomizeValues, createScopedAtoms } from "@/lib/state/scoped-stores"
import type { AnalyzedRepo } from "@/types"

export type AnalysisState =
   | { status: "idle" }
   | { status: "responding"; currentStatus: string }
   | { status: "complete"; result: AnalyzedRepo }
   | { status: "error"; error: string }

interface AnalyisisStoreState {
   repoUrl: Atom<string>
   state: Atom<AnalysisState>
}

export const AnalysisStore = createScopedAtoms<AnalyisisStoreState>(
   defaults =>
      atomizeValues({
         repoUrl: "",
         state: { status: "idle" },
         ...defaults,
      }) satisfies AnalyisisStoreState
)
