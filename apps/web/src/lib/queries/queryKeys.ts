import type { ContactRequestQuery, DevelopersQuery, CandidatesQuery } from "./query.types"

export const queryKeys = {
   user: () => ["user"],
   auth: () => ["auth"],
   developers: {
      all: () => ["developers"],
      lists: () => [...queryKeys.developers.all(), "list"],
      list: (filters: DevelopersQuery) => [...queryKeys.developers.lists(), filters],
      details: () => [...queryKeys.developers.all(), "detail"],
      detail: (username: string) => [...queryKeys.developers.details(), username],
      techStacks: () => [...queryKeys.developers.all(), "tech-stacks"],
   },
   candidates: {
      all: () => ["candidates"],
      lists: () => [...queryKeys.candidates.all(), "list"],
      list: (filters: CandidatesQuery) => [...queryKeys.candidates.lists(), filters],
   },
   contactRequests: {
      all: () => ["contact-requests"],
      lists: () => [...queryKeys.contactRequests.all(), "list"],
      list: (filters: ContactRequestQuery) => [...queryKeys.contactRequests.lists(), filters],
      details: () => [...queryKeys.contactRequests.all(), "detail"],
      detail: (id: string) => [...queryKeys.contactRequests.details(), id],
   },
   analyses: {
      all: () => ["analyses"],
      lists: () => [...queryKeys.analyses.all(), "list"],
      details: () => [...queryKeys.analyses.all(), "detail"],
      detail: (id: string) => [...queryKeys.analyses.details(), id],
   },
}
