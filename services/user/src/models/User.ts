import mongoose from "mongoose";


export interface UserInterface extends Document {
    name: string;
    email :string;
    image : string;
    instagram : string;
    facebook : string;
    linkedin : string;
    bio : string;
}


const UserSchema = new mongoose.Schema<UserInterface>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    instagram: {
        type: String,
    },
    facebook: {
        type: String,

    },
    linkedin: {
        type: String,

    },
    bio: {
        type: String,
        required: false
    }
},{
    timestamps: true
});

const User = mongoose.model<UserInterface>("User", UserSchema);


export default User;