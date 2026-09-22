import { reportsData } from "../../data/syntheticHealthData";
import { simulateApi } from "../api/mockClient";

export async function getReports() {
  return simulateApi(reportsData);
}

export async function getReportById(reportId: string) {
  const report = reportsData.find((item) => item.id === reportId) ?? null;
  return simulateApi(report);
}