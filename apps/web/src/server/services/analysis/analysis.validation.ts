import { t } from "elysia";
import z from "zod/v3";

export const repoAnalysisRequestBodySchema = t.Object({
  repoUrl: t.String(),
});

export const score = z
  .number({ message: "Score must be a number" })
  .min(0, "Score cannot be below 0")
  .max(100, "Score cannot be above 100");

export type AnalysisScores = z.infer<typeof score>;

export const scoresSchema = z
  .object({
    codeQuality: score,
    architecture: score,
    security: score,
    gitPractices: score,
    documentation: score,
  })
  .refine(
    (data) =>
      data.codeQuality +
        data.architecture +
        data.security +
        data.gitPractices +
        data.documentation >
      0,
    {
      message: "At least one score must be non-zero",
      path: ["scores"],
    }
  );

export const analysisResponse = z.object({
  scores: scoresSchema,
  feedback: z.array(z.string(), { message: "Invalid feedback array type" }),
  totalScore: z.number({ message: "Invalid totalScore type" }),
});

export type AnalysisResponse = z.infer<typeof analysisResponse>;
