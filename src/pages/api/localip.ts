// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { internalIpV4 } from "internal-ip";

type Data = {
  ip: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const ip = await internalIpV4();
  if (ip) res.status(200).json({ ip });
  return res
    .status(200)
    .json({ ip: "server error couldn't find local IP v4 address" });
}
