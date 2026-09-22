import { useCallback } from "react";
import { useAsyncResource } from "./useAsyncResource";
import { getReports } from "../services/reports/reportsService";

export function useReports() {
  const fetcher = useCallback(() => getReports(), []);
  return useAsyncResource(fetcher);
}