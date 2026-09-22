export async function simulateApi<T>(payload: T, delay = 220): Promise<T> {
  await new Promise((resolve) => window.setTimeout(resolve, delay));
  return payload;
}