import type { NextApiRequest, NextApiResponse } from "next";
import { GiphyFetch } from "@giphy/js-fetch-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const gf = new GiphyFetch(process?.env?.GIPHY_API_KEY || "");
  const { data } = await gf.trending();

  res.status(200).json(data);
}
