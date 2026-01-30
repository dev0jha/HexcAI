"use client";

import { ErrorMessage } from "@/components/analysis/analysis-error";
import { AnalysisInputTrigger } from "@/components/analysis/analysis-input";
import { Results } from "@/components/analysis/analysis-results";
import DashTitleShell from "@/components/dash-screentitle-text";
import { AnalysisStore } from "@/hooks/scopedstores/analysis.store";

export default function AnalyzePage() {
  return (
    <AnalysisStore.Provider>
      <div className="mx-auto mt-4 flex-1 py-2 sm:mt-6 sm:py-8 lg:py-10">
        <div className="w-full space-y-8 px-4 py-8 sm:px-6 lg:px-8">
          <div className="gap-1">
            <DashTitleShell
              title="Analyze Repository"
              description="Get AI-powered feedback on your GitHub project"
            />
          </div>

          {/* input  */}
          <AnalysisInputTrigger />

          {/* Error */}
          <ErrorMessage />

          {/* Results */}
          <Results />
        </div>
      </div>
    </AnalysisStore.Provider>
  );
}
