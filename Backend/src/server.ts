import type { Express } from "express";
const port = process.env.PORT! || 3020;

export async function runServer(app: Express) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
