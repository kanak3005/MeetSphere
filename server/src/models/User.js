import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: 
    { type: String, 
      required: true, 
      trim: true,
       minlength: 2, 
       maxlength: 50
       },
    email: {
      type: String,
      required: true,
      unique: true, // DB level par duplicate rokta hai
      lowercase: true,
      trim: true,
    },
    // select: false => queries mein password default se nahi aata
    password: 
    { type: String, 
      required: true, 
      select: false 
    },
    avatar: 
    { type: String,
      default: "" },
   },
   {
    timestamps: true, // createdAt, updatedAt
    toJSON: { //toJSON.transform = "Database se aane wale User object ko frontend ko bhejne se pehle clean/modify kar do."
      transform(doc, ret) {
        //doc → original Mongoose document
        //ret → us document ka JSON/object version
        ret.id = ret._id;//_id ko id banana {
    // _id: "abc123",
   // id: "abc123"

        delete ret._id; // delete _id  - toh bass ye bacha -> id: "abc123"
        delete ret.__v; // Mongoose internally __v field use kar sakta hai for versioning. but Frontend ko usually iski zarurat nahi hai.
        delete ret.password; // means JSON response mein jo password field hai.
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