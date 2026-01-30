import z from "zod/v3";

export const githubRepoSchema = z.object({
  owner: z.string(),
  repo: z.string(),
});

export type GitHubRepoSchema = z.infer<typeof githubRepoSchema>;
