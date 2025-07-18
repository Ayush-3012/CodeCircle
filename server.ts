// server.ts
import { initSocket } from "@/lib/socketServer";
import { createServer } from "http";
import next from "next";
import { parse } from "url";

const port = 5000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  initSocket(server);

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
