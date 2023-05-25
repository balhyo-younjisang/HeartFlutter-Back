import mongoose from "mongoose";

const serverSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    members: [{ type: String }],
    date: { type: Date },
    level: { type: Number, required: true },
    click: { type: Number, required: true },
    premium: Boolean,
})

const Server = mongoose.model("Server", serverSchema);
export default Server;