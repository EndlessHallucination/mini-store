export function getCorsOptions() {
  if (!process.env.CLIENT_URL) {
    throw new Error("CLIENT_URL is not set in server/.env");
  }

  return { origin: process.env.CLIENT_URL };
}
