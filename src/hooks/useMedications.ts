import { useCallback } from "react";
import { useAsyncResource } from "./useAsyncResource";
import { getMedications } from "../services/medications/medicationsService";

export function useMedications() {
  const fetcher = useCallback(() => getMedications(), []);
  return useAsyncResource(fetcher);
}