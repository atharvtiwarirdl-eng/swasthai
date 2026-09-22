import { useCallback } from "react";
import { useAsyncResource } from "./useAsyncResource";
import { getHealthOverview } from "../services/health/healthService";

export function useHealthOverview() {
  const fetcher = useCallback(() => getHealthOverview(), []);
  return useAsyncResource(fetcher);
}