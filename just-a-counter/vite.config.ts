import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  server: {
    allowedHosts: [
      "justaproject-app-qkxfej-722b7f-46-224-50-130.traefik.me",
      "justaproject-app-ysal6i-0566b0-46-224-50-130.traefik.me",
    ],
  },
});
