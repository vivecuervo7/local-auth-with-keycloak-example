import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  if (command === "serve") {
    return {
      plugins: [react()],
      server: {
        port: 5173,
        https: {
          cert: process.env.VITE_CERT ?? "",
          key: process.env.VITE_CERT_KEY ?? "",
        },
      },
    };
  }

  return {
    plugins: [react()],
  };
});
