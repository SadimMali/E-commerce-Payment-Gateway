import mongoose, {Schema, Document, mongo} from "mongoose";

interface User extends Document {
    username: string;
    first_name: string;
    last_name: string;
    phone_number: number;
    location: string;
    enail: string;
    pasword: string;
}


const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
    } //add more....
})


const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model("User", UserSchema) 