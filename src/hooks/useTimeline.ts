import { useCallback } from "react";
import { useAsyncResource } from "./useAsyncResource";
import { getTimelineEvents } from "../services/health/healthService";

export function useTimeline() {
  const fetcher = useCallback(() => getTimelineEvents(), []);
  return useAsyncResource(fetcher);
}