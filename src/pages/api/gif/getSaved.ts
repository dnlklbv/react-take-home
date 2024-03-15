import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userEmail } = JSON.parse(req.body);

  const { data } = await supabase
    .from("saved")
    .select("*")
    .eq("user_email", userEmail);

  res.status(200).json(data.map((item) => item.gif_id));
}
