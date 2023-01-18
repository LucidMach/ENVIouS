import { readFileSync, unlinkSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";
import { WebSocketServer } from "ws";

// creating a secure websocketserver
const wss = new WebSocketServer({ port: 5000 });

wss.on("connection", async (ws) => {
  console.log("a client connected");

  let prevTime = Date.now();
  let fps: number;

  let i = 0;
  ws.on("message", (msg) => {
    if (msg.toString() === "READY") {
      // capture image using fswebcam
      const fileName = i + ".jpeg";
      const filePath = join(".", fileName);
      const captureImg = "streamer -f jpeg -o " + filePath;
      execSync(captureImg);

      // encode image to base64
      const imgB64 =
        "data:image/jpg;base64," + readFileSync(filePath, "base64");

      // send image
      ws.send(imgB64);
      unlinkSync(filePath);

      // calculating server fps
      if (Date.now() - prevTime > 1000) {
        fps = i;
        prevTime = Date.now();
        i = 0;
      }

      console.log("SERVER FPS: " + fps);
      i++;
    }
  });

  ws.on("close", () => {
    console.log("client disconnected");
  });
});

export {};
