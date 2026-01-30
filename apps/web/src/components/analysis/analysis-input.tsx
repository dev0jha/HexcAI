"use client";

import { IconBrandGithub, IconLoader2, IconSearch } from "@tabler/icons-react";

import { DashboardCard } from "@/components/layout/dashboard-card";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  useAnalysisActions,
  useAnalysisState,
} from "@/hooks/screens/analysis.hooks";

export function AnalysisInputTrigger() {
  const { isAnalyzing, state } = useAnalysisState();
  const { handleAnalyze, repoUrl, setRepoURL } = useAnalysisActions();

  return (
    <DashboardCard className="relative flex-1 border bg-neutral-800/40 p-6">
      <form onSubmit={handleAnalyze} className="space-y-4">
        <div>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row">
            <InputGroup className="z-80 h-11 rounded-md border-zinc-800 bg-neutral-900 text-zinc-100 placeholder:text-center">
              <InputGroupAddon align="inline-start">
                <IconBrandGithub className="h-4 w-4 text-white/60" />
              </InputGroupAddon>

              <InputGroupInput
                id="repo-url"
                type="url"
                placeholder="https://github.com/user/repository"
                value={repoUrl}
                onChange={(e) => setRepoURL(e.target.value)}
                disabled={isAnalyzing}
              />
            </InputGroup>

            <div className="flex items-center justify-center">
              <Button
                type="submit"
                disabled={isAnalyzing || !repoUrl}
                className="h-14 w-full gap-2 border-2 border-neutral-50/10 py-4 sm:w-auto"
              >
                {isAnalyzing ? (
                  <>
                    <IconLoader2 className="h-4 w-4 animate-spin" />
                    Analyzing
                  </>
                ) : (
                  <>
                    <IconSearch className="h-4 w-4" />
                    Analyze
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>

      {isAnalyzing && (
        <div className="mt-8 flex items-center gap-3">
          <IconLoader2 className="h-5 w-5 animate-spin" />
          <p className="text-sm">
            {state.status === "responding" ? state.currentStatus : ""}
          </p>
        </div>
      )}
    </DashboardCard>
  );
}
