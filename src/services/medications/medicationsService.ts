import { medications } from "../../data/syntheticHealthData";
import { simulateApi } from "../api/mockClient";

export async function getMedications() {
  return simulateApi(medications);
}