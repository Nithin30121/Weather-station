// vite.config.js
// This file configures Vite (your development server + build tool)

import { defineConfig } from "vite";          // Helper to define Vite config
import react from "@vitejs/plugin-react";    // React plugin for Vite
import tailwindcss from "@tailwindcss/vite"; // Tailwind plugin for Vite (Tailwind v4 style)

export default defineConfig({
  // plugins are like "add-ons" that extend what Vite can do
  plugins: [
    react(),       // enables React fast refresh, JSX support
    tailwindcss(), // enables Tailwind processing
  ],
});
