import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userEmail } = JSON.parse(req.body);

    const { data } = await supabase
      .from("saved")
      .select("*")
      .eq("user_email", userEmail);

    if (!data) {
      return res.status(200).json([]);
    }

    res.status(200).json(data.map((item) => item.gif_id));
  } catch (error) {
    res.status(500).json({ error });
  }
}
