import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
    email: {
      type: String,
      required: true,
      unique: true, // DB level par duplicate rokta hai
      lowercase: true,
      trim: true,
    },
    // select: false => queries mein password default se nahi aata
    password: { type: String, required: true, select: false },
    avatar: { type: String, default: "" },
  },
  {
    timestamps: true, // createdAt, updatedAt
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password; // safety net: kabhi bhi response mein nahi jaayega
        return ret;
      },
    },
  }
);

// Save se pehle password hash karo (sirf tab jab password change hua ho)
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

export default mongoose.model("User", userSchema);