export const buildPrompt = (repoData: any) => {
  return `
	Analyze this GitHub repository and provide scores and feedback based on the following criteria:

	Repository: ${repoData.name}
	Description: ${repoData.description ?? "No description"}
	Language: ${repoData.language}
	Stars: ${repoData.stargazers_count}
	Forks: ${repoData.forks_count}
	Issues: ${repoData.open_issues_count}

	You can use the available tools to fetch additional information like README content and programming languages used in the repository to provide a more accurate analysis.

	Please provide a detailed analysis in the following JSON format:
	{
	  "scores": {
		"codeQuality": number (0-100),
		"architecture": number (0-100),
		"security": number (0-100),
		"gitPractices": number (0-100),
		"documentation": number (0-100)
	  },
	  "feedback": string[] (5-7 detailed feedback points),
	  "totalScore": number (weighted average)
	}

	Scoring guidelines:
	- Code Quality: Clean code, proper naming, structure
	- Architecture: Project organization, design patterns
	- Security: Safe practices, no obvious vulnerabilities
	- Git Practices: Commit messages, branch management, PRs
	- Documentation: README, code comments, API docs

	Calculate totalScore as: (codeQuality*0.3 + architecture*0.2 + security*0.2 + gitPractices*0.15 + documentation*0.15)


	DONT GIVE ME JSON BLOCK ONLY RETURN THE RAW JSON IN A FORMAT , I CAN PARSE IT DIRECTLY!
	`
}
