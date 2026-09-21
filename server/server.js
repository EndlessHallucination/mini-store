import { createApp } from "./src/app.js";
import { connectDB } from "./src/config/db.js";

const PORT = process.env.PORT || 3000;

try {
  const app = createApp();
  await connectDB();
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
} catch (error) {
  console.error("Failed to start server:", error.message);
  process.exit(1);
}
