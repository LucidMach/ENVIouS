import { readFileSync, unlinkSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";
import { WebSocketServer } from "ws";

// creating a secure websocketserver
const wss = new WebSocketServer({ port: 5000 });

wss.on("connection", async (ws) => {
  console.log("a client connected");

  let i = 0;
  while (ws.OPEN) {
    // capture image using fswebcam
    const fileName = i + ".jpg";
    const filePath = join(".", fileName);
    const captureImg = "fswebcam " + filePath;
    execSync(captureImg);

    // encode image to base64
    const imgB64 = "data:image/jpg;base64," + readFileSync(filePath, "base64");

    // send image
    ws.send(imgB64);
    unlinkSync(filePath);
    i++;
  }

  ws.on("close", () => {
    console.log("client disconnected");
  });
});

export {};
