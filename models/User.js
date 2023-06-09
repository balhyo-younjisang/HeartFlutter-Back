import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, // email
    username: { type: String, required: true }, // username 
    password: { type: String, required: true }, // password
    server: { type: String },
});

userSchema.pre("save", async function () {
    if (this.isModified("password"))
        this.password = await bcrypt.hash(this.password, 5);
})

const User = mongoose.model("User", userSchema);
export default User;