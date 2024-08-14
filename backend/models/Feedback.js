import mongoose from "mongoose";
import { z } from "zod";

// Zod schema for validation
const FeedbackSchemaZod = z.object({
    user: z.string().min(1, "User ID is required"),
    feedback: z.string().min(1, "Feedback is required"),
});

// Mongoose schema
const FeedbackSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    feedback: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const Feedback = mongoose.model("Feedback", FeedbackSchema);
export { FeedbackSchemaZod };
