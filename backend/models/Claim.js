// this is for the find items report

import mongoose from "mongoose";
import { z } from "zod";

// Zod schema for validation
const ClaimSchemaZod = z.object({
    item: z.string().min(1, "Item ID is required"),
    claimant: z.string().min(1, "Claimant ID is required"),
    status: z.enum(["pending", "approved", "rejected"]).optional(),
});

// Mongoose schema
const ClaimSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    claimant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
});

export const Claim = mongoose.model("Claim", ClaimSchema);
export { ClaimSchemaZod };
