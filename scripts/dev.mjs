import { spawn } from "node:child_process";
import { createConnection, createServer } from "node:net";
import { fileURLToPath } from "node:url";

const DEFAULT_PORT = 5173;
const PROBE_HOST = "127.0.0.1";
const DEV_HOST = "0.0.0.0";

const isAcceptingConnections = (port) =>
  new Promise((resolve) => {
    const socket = createConnection({ port, host: PROBE_HOST });
    const finish = (occupied) => {
      socket.destroy();
      resolve(occupied);
    };

    socket.setTimeout(200, () => finish(false));
    socket.once("connect", () => finish(true));
    socket.once("error", () => finish(false));
  });

const canListen = (port) =>
  new Promise((resolve) => {
    const server = createServer();

    server.once("error", () => resolve(false));
    server.once("listening", () => {
      server.close(() => resolve(true));
    });
    server.listen({ port, host: PROBE_HOST, exclusive: true });
  });

const findAvailablePort = async (start) => {
  for (let port = start; port <= 65535; port += 1) {
    if (!(await isAcceptingConnections(port)) && (await canListen(port))) return port;
  }

  throw new Error(`No available TCP port found from ${start}.`);
};

const port = await findAvailablePort(DEFAULT_PORT);
if (port !== DEFAULT_PORT) {
  console.log(`[elfui-docs] Port ${DEFAULT_PORT} is occupied; using ${port}.`);
}

const vitepressBin = fileURLToPath(
  new URL("../node_modules/vitepress/bin/vitepress.js", import.meta.url),
);
const child = spawn(
  process.execPath,
  [vitepressBin, "dev", ".", "--host", DEV_HOST, "--port", String(port), "--strictPort"],
  {
    stdio: "inherit",
    env: { ...process.env, ELFUI_DOCS_PORT: String(port) },
  },
);

child.once("error", (error) => {
  console.error("[elfui-docs] Failed to start VitePress.", error);
  process.exitCode = 1;
});

child.once("exit", (code, signal) => {
  process.exitCode = code ?? (signal ? 1 : 0);
});

const forwardSignal = (signal) => {
  if (!child.killed) child.kill(signal);
};

process.once("SIGINT", () => forwardSignal("SIGINT"));
process.once("SIGTERM", () => forwardSignal("SIGTERM"));
