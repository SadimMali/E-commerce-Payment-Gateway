import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  username: string;
  first_name: string;
  last_name: string;
  phone_number: number;
  location: string;
  email: string;
  password: string;
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: [true, "First name is required"],
  },
  last_name: {
    type: String,
    required: [true, "Last name is required"],
  },
  phone_number: {
    type: Number,
    required: [true, "Phone number is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },

  location: {
    type: String,
    required: [true, "Location is required"],
  },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model("User", UserSchema);

export default UserModel;
