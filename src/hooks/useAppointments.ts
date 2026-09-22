import { useCallback } from "react";
import { useAsyncResource } from "./useAsyncResource";
import { getAppointments } from "../services/appointments/appointmentsService";

export function useAppointments() {
  const fetcher = useCallback(() => getAppointments(), []);
  return useAsyncResource(fetcher);
}