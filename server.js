/**
 * Entry point. Keeps HTTP server bootstrapping separate from app config.
 * Render/Railway will run `npm start`.
 */
const app = require("./src/app");
const { env } = require("./src/config/env");

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT} (${env.NODE_ENV})`);
});