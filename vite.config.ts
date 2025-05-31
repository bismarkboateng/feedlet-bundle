import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  build: {
    lib: {
      entry: "src/App.tsx",
      name: "FeedbackWidget",
      fileName: "widget",
      formats: ["iife"],
    },
  },
});
 