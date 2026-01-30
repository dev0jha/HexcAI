import type React from "react";

import { mockAnalysisResult } from "@/data/mock-data";
import { AnalysisStore } from "@/hooks/scopedstores/analysis.store";
import { attempt, attemptSync } from "@/utils/attempt";

/*
 * read usage for analysis repo url
 * **/
export function useAnalysisInput() {
  const [repoUrl, setRepoURL] = AnalysisStore.useAtom("repoUrl");
  return {
    repoUrl,
    setRepoURL,
  };
}

/**
 * read operations for analysis state
 * **/
export function useAnalysisState() {
  const [state] = AnalysisStore.useAtom("state");

  const scores =
    state.status === "complete"
      ? state.result.scores
      : mockAnalysisResult.scores;

  return {
    state,
    isAnalyzing: state.status === "responding",
    isComplete: state.status === "complete",
    isError: state.status === "error",
    scoreValues: [
      scores.codeQuality,
      scores.architecture,
      scores.security,
      scores.gitPractices,
      scores.documentation,
    ],
  };
}

/*
 * actions for analysis state
 * ***/
export function useAnalysisActions() {
  const { repoUrl, setRepoURL } = useAnalysisInput();

  const [, setState] = AnalysisStore.useAtom("state");

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    if (!repoUrl) return;

    setState({
      status: "responding",
      currentStatus: "Starting analysis...",
    });

    const fetchResponse = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repoUrl }),
    });

    if (!fetchResponse.ok) {
      setState({
        status: "error",
        error: `HTTP ${fetchResponse.status}: ${fetchResponse.statusText}`,
      });
      return;
    }

    const reader = fetchResponse.body?.getReader();
    if (!reader) {
      setState({ status: "error", error: "No response body" });
      return;
    }

    const decoder = new TextDecoder();
    let buffer = "";
    let gotResult = false;

    const streamAttempt = await attempt(async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;

          const data = trimmed.slice(6).trim();
          if (!data) continue;

          const parsed = attemptSync(() => JSON.parse(data));
          if (!parsed.ok) continue;

          const chunk = parsed.data;

          if (chunk.error) throw new Error(chunk.error);

          if (chunk.status) {
            setState({
              status: "responding",
              currentStatus: chunk.status,
            });
          }

          if (chunk.result) {
            setState({
              status: "complete",
              result: chunk.result,
            });
            gotResult = true;
            return true;
          }
        }
      }

      if (!gotResult) throw new Error("incomplete response end");
      return true;
    });

    reader.releaseLock();

    if (!streamAttempt.ok) {
      setState({
        status: "error",
        error: streamAttempt.error.message,
      });
    }
  }

  return {
    handleAnalyze,
    setRepoURL,
    repoUrl,
  };
}
