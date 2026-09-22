import { appointments } from "../../data/syntheticHealthData";
import { simulateApi } from "../api/mockClient";

export async function getAppointments() {
  return simulateApi(appointments);
}