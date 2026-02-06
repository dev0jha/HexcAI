import type { ContactRequestQuery, DevelopersQuery } from "./query.types"

export const queryKeys = {
   user: () => ["user"],
   auth: () => ["auth"],
   developers: {
      all: () => ["developers"],
      lists: () => [...queryKeys.developers.all(), "list"],
      list: (filters: DevelopersQuery) => [...queryKeys.developers.lists(), filters],
      techStacks: () => [...queryKeys.developers.all(), "tech-stacks"],
   },
   contactRequests: {
      all: () => ["contact-requests"],
      lists: () => [...queryKeys.contactRequests.all(), "list"],
      list: (filters: ContactRequestQuery) => [...queryKeys.contactRequests.lists(), filters],
      details: () => [...queryKeys.contactRequests.all(), "detail"],
      detail: (id: string) => [...queryKeys.contactRequests.details(), id],
   },
}
