import { useCallback } from "react";
import { useAsyncResource } from "./useAsyncResource";
import { getNotifications } from "../services/notifications/notificationsService";

export function useNotifications() {
  const fetcher = useCallback(() => getNotifications(), []);
  return useAsyncResource(fetcher);
}