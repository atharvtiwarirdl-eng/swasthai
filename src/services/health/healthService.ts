import {
  activityRecords,
  aiInsights,
  constellationLinks,
  constellationNodes,
  healthMetrics,
  sleepRecords,
  symptomEvents,
  timelineEvents,
  todaySnapshot,
  vitalSeries,
  vitals,
} from "../../data/syntheticHealthData";
import { type TrendWindow } from "../../types/health";
import { simulateApi } from "../api/mockClient";

export async function getHealthOverview() {
  return simulateApi({
    todaySnapshot,
    healthMetrics,
    vitals,
    vitalSeries,
    sleepRecords,
    activityRecords,
    symptomEvents,
    constellationNodes,
    constellationLinks,
    aiInsights,
  });
}

export async function getVitals() {
  return simulateApi(vitals);
}

export async function getConstellation() {
  return simulateApi({ nodes: constellationNodes, relationships: constellationLinks });
}

export async function getTrendSummary(window: TrendWindow) {
  const byWindow = {
    daily: { heartRateDelta: -1.2, sleepDelta: 0.4, activityDelta: 6.1 },
    weekly: { heartRateDelta: -2.4, sleepDelta: 0.7, activityDelta: 10.3 },
    monthly: { heartRateDelta: -3.7, sleepDelta: 1.0, activityDelta: 14.8 },
  };
  return simulateApi(byWindow[window]);
}

export async function getTimelineEvents() {
  return simulateApi(timelineEvents);
}