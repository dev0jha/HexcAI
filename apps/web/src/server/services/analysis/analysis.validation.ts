import { t } from "elysia"

export const repoAnalysisRequestBody = t.Object({
  repoUrl: t.String(),
})
