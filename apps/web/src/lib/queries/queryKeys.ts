export const queryKeys = {
   user: () => ["user"],
   auth: () => ["auth"],
   contactRequests: {
      all: () => ["contact-requests"],
      lists: () => [...queryKeys.contactRequests.all(), "list"],
      list: (filters: Record<string, any>) => [...queryKeys.contactRequests.lists(), filters],
      details: () => [...queryKeys.contactRequests.all(), "detail"],
      detail: (id: string) => [...queryKeys.contactRequests.details(), id],
   },
}
