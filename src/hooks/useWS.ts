import { useEffect, useRef } from "react";

const useWS = (data: any, onmessage: (e: MessageEvent<any>) => void) => {
  const ws = useRef<WebSocket>();

  useEffect(() => {
    if (data) {
      ws.current = new WebSocket(data);

      ws.current.onopen = () => {
        console.log("Connection opened");

        if (ws.current) ws.current.onmessage = (e) => onmessage(e);
      };

      ws.current.onclose = () => console.log("Connection closed");
    }
  }, [data]);

  return ws;
};

export default useWS;
