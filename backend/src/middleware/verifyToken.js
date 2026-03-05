import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

// Verify JWT from Supabase Auth (sent in Authorization header from frontend)
export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided. Unauthorized." });
  }

  const token = authHeader.split(" ")[1];

  // Use the anon key client to verify the JWT
  const supabaseAuth = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    { global: { headers: { Authorization: `Bearer ${token}` } } },
  );

  const {
    data: { user },
    error,
  } = await supabaseAuth.auth.getUser();

  if (error || !user) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }

  req.user = user;
  next();
};
