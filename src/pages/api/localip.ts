// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import localIpAddress from "local-ip-address";

type Data = {
  ip: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const ip = localIpAddress();
  res.status(200).json({ ip });
}
