// this is for the find items report
import mongoose from "mongoose";
import { z } from "zod";

const FoundSchemaZod = z.object({
    item: z.string().min(1, "Item ID is required"),
    finder: z.string().min(1, "Finder ID is required"),
    status: z.enum(["pending", "claimed", "unclamied"]),
    location: z.string().min(5, "Location is required"),
    date: z.string().min(10, "Date is required"),
    contact: z.string().regex(/^\d{10}$/, "Contact number must be exactly 10 digits"),
    image: z.string().optional(),
})

const FoundSchema = new mongoose.Schema({
    item : {type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true},
    finder: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    status: {type: String, enum: ["claimed", "unclaimed"], default: "unclaimed"},
    location: {type: String, required: true},
    date: {type: String, required: true},
    description: {type: String, required: true},
    contact: {type: String},
    image: {type: String},
    createdAt: {type: Date, default: Date.now},
})

export const Found = mongoose.model("Found", FoundSchema);
export { FoundSchemaZod };