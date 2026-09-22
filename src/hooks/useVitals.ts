import { useCallback } from "react";
import { useAsyncResource } from "./useAsyncResource";
import { getVitals } from "../services/health/healthService";

export function useVitals() {
  const fetcher = useCallback(() => getVitals(), []);
  return useAsyncResource(fetcher);
}