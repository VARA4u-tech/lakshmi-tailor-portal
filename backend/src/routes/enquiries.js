import express from "express";
import { supabase } from "../config/supabase.js";
import { sendEnquiryEmail } from "../config/mailer.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// POST /api/enquiries - Public: submit a new contact enquiry
router.post("/", async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    if (!name || !phone || !message) {
      return res
        .status(400)
        .json({ error: "Name, phone, and message are required." });
    }

    // 1. Save to Supabase
    const { data, error } = await supabase
      .from("enquiries")
      .insert([{ name, phone, message, status: "new" }])
      .select()
      .single();

    if (error) throw error;

    // 2. Send email notification to owner (non-blocking)
    sendEnquiryEmail({ name, phone, message }).catch((err) =>
      console.error("Email send failed:", err.message),
    );

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully!",
      enquiry: data,
    });
  } catch (err) {
    console.error("POST /enquiries error:", err);
    res.status(500).json({ error: err.message || "Internal server error." });
  }
});

// GET /api/enquiries - Protected (Admin only): view all enquiries
router.get("/", verifyToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({ success: true, enquiries: data });
  } catch (err) {
    console.error("GET /enquiries error:", err);
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/enquiries/:id - Protected: update enquiry status
router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["new", "in_progress", "resolved"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }

    const { data, error } = await supabase
      .from("enquiries")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, enquiry: data });
  } catch (err) {
    console.error("PATCH /enquiries/:id error:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/enquiries/:id - Protected: delete an enquiry
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("enquiries").delete().eq("id", id);

    if (error) throw error;

    res.json({ success: true, message: "Enquiry deleted." });
  } catch (err) {
    console.error("DELETE /enquiries/:id error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
