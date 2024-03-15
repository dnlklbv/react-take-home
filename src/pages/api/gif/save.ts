import { supabase } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      return res.status(401).end();
    }

    const data = JSON.parse(req.body);
    const { error, status } = await supabase.from("saved").insert({
      user_email: session.user.email,
      gif_id: data.gifId,
    });

    if (error) {
      throw error;
    }

    res.status(status).end();
  } catch (error) {
    res.status(500).json({ error });
  }
}
