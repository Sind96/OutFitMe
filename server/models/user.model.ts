import mongoose, { type Types } from "mongoose";

interface IFavouriteOutfit {
  _id?: Types.ObjectId;
  top: string;
  bottom: string;
  shoe: string;
  createdAt?: Date;
}

interface IUser {
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  favouriteOutfits: IFavouriteOutfit[];
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "/default-profile.png",
    },
    favouriteOutfits: [
      {
        top: String,
        bottom: String,
        shoe: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
