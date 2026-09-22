import { appNotifications } from "../../data/syntheticHealthData";
import { simulateApi } from "../api/mockClient";

export async function getNotifications() {
  return simulateApi(appNotifications);
}