import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      plugins: [react()],
      server: {
        port: 5173,
        https: {
          cert: "../local-dev/certificates/cert.pem",
          key: "../local-dev/certificates/key.pem",
        },
      },
    };
  }

  return {
    plugins: [react()],
  };
});
