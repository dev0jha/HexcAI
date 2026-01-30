import { Card } from "@/components/ui/card";
import { useAnalysisState } from "@/hooks/screens/analysis.hooks";

export function ErrorMessage() {
  const { isError, state } = useAnalysisState();

  return (
    <>
      {isError && (
        <Card className="border-destructive/50 bg-destructive/5 p-6">
          <div className="flex items-center gap-3">
            <div className="border-destructive flex h-5 w-5 items-center justify-center rounded-full border-2">
              <span className="text-destructive text-xs">!</span>
            </div>
            <p className="text-destructive text-sm">
              {state.status === "error" ? state.error : ""}
            </p>
          </div>
        </Card>
      )}
    </>
  );
}
