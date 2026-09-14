import { spawn, type ChildProcess } from "node:child_process";
import { once } from "node:events";
import { PostgreSqlContainer } from "@testcontainers/postgresql";
import {
  E2E_PORT,
  SERVER_POLL_INTERVAL_MS,
  SERVER_START_TIMEOUT_MS,
} from "./constants";

type Environment = NodeJS.ProcessEnv;

function runCommand(
  command: string,
  args: string[],
  env: Environment
): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { env, stdio: "inherit" });

    child.once("error", reject);
    child.once("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} terminó con código ${code}`));
    });
  });
}

async function waitForServer(baseUrl: string): Promise<void> {
  const deadline = Date.now() + SERVER_START_TIMEOUT_MS;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {}

    await new Promise((resolve) => setTimeout(resolve, SERVER_POLL_INTERVAL_MS));
  }

  throw new Error(`El servidor no inició en ${baseUrl}`);
}

async function stopServer(server: ChildProcess | undefined): Promise<void> {
  if (!server || server.exitCode !== null || server.killed) return;

  server.kill("SIGTERM");
  await once(server, "exit");
}

async function main() {
  const port = Number(process.env.E2E_PORT ?? E2E_PORT);
  const baseUrl = `http://127.0.0.1:${port}`;
  const container = await new PostgreSqlContainer("postgres:16-alpine").start();
  const environment: Environment = {
    ...process.env,
    AUTH_SECRET: process.env.AUTH_SECRET ?? "e2e-auth-secret",
    DATABASE_URL: container.getConnectionUri(),
    E2E_BASE_URL: baseUrl,
    NEXT_DIST_DIR: ".next-e2e",
    NEXT_TELEMETRY_DISABLED: "1",
  };
  let server: ChildProcess | undefined;

  try {
    await runCommand(
      "pnpm",
      ["exec", "prisma", "db", "push"],
      environment
    );

    server = spawn(
      "pnpm",
      ["exec", "next", "dev", "--port", String(port)],
      { env: environment, stdio: "inherit" }
    );
    await waitForServer(baseUrl);

    await runCommand(
      "pnpm",
      [
        "exec",
        "playwright",
        "test",
        ...process.argv.slice(2).filter((argument) => argument !== "--"),
      ],
      environment
    );
  } finally {
    await stopServer(server);
    await container.stop();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
