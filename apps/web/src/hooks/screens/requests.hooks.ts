import { useState } from "react";

import { mockContactRequests } from "@/data/mock-data";
import type { ContactRequest } from "@/types";

export const useRequestsState = () => {
  const [requests, setRequests] =
    useState<ContactRequest[]>(mockContactRequests);

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const acceptedRequests = requests.filter((r) => r.status === "accepted");
  const rejectedRequests = requests.filter((r) => r.status === "rejected");

  return {
    requests,
    setRequests,
    pendingRequests,
    acceptedRequests,
    rejectedRequests,
  };
};
