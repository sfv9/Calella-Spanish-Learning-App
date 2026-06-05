import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `base` is the public path the built app is served from.
// In dev (`npm run dev`) we want "/" so localhost:5174 just works.
// In production the app lives at https://apps.sfv9.com/spanish/, so all built
// asset URLs need to be prefixed with /spanish/ — otherwise the browser will
// 404 looking for them at the root.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/spanish/" : "/",
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 4173,
  },
}));
