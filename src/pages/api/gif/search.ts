import type { NextApiRequest, NextApiResponse } from "next";
import { GiphyFetch } from "@giphy/js-fetch-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const gf = new GiphyFetch(process?.env?.GIPHY_API_KEY || "");

  const { q } = req.query;
  const { data } = await gf.search(q as string);

  res.status(200).json(data);
}
