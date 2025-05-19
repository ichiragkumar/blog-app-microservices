import User from "../models/User";
import jwt from "jsonwebtoken";
import requestHandler from "../utils/requestHandler";
import { AuthenticatedRequest } from "../middleware/isAuth";
import getBuffer from "../utils/dataUri";
import { v2 as cloudinary } from 'cloudinary';
import { Types } from "mongoose";



export const loginUser = requestHandler(async (req, res) => {
  const { email, name, image } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    res.status(400).json({ message: "User already exists" });
  }
  const newUser = await User.create({ email, name, image });

 const token = jwt.sign(
    { _id: newUser._id, email: newUser.email }, 
    process.env.JWT_SECRET as string,
    { expiresIn: "5d" }
  );

  res.status(201).json({
    message : "User created successfully",
    user: newUser,
    token:token
  });

});

export const myProfile = requestHandler(
  async (req: AuthenticatedRequest, res) => {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    res.status(200).json(user);
  }
);

export const getUserProfile = requestHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.status(200).json({
    user
  });
});


export const updateUser = requestHandler(async (req, res) => {
   const { name , instagram, facebook, linkedin, bio } = req.body;
   const user = await User.findById(req.params.id);
   if (!user) {
     res.status(404).json({ message: "User not found" });
     return;
   }
   user.name = name;
   user.instagram = instagram;
   user.facebook = facebook;
   user.linkedin = linkedin;
   user.bio = bio;
   await user.save();

    const token = jwt.sign(
    { _id: user._id, email: user.email }, 
    process.env.JWT_SECRET as string,
    { expiresIn: "5d" }
  );

  res.status(201).json({
    message : "User update successfully",
    user: user,
    token:token
  });
});


export const updateProfilePicture  = requestHandler(async (req, res) => {
    const file = req.file;
    const id = req.params.id;

    if (!file) {
      res.status(400).json({ message: "No file Chosen" });
      return;
    }

    const fileBuffer =  getBuffer(file);
    if (!fileBuffer || !fileBuffer.content) {
      res.status(400).json({ message: "Failed to  getting buffer" });
      return;
    }


    const cloud = await cloudinary.uploader.upload(fileBuffer.content, {
      folder: "blogs"
    });

    const updateUserProfile = await User.findByIdAndUpdate(
        {_id : new Types.ObjectId(id)},
      {
        image: cloud.secure_url,
      },
      { new: true }
    );


    if (!updateUserProfile) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const token = jwt.sign(
    { _id: updateUserProfile._id, email: updateUserProfile.email }, 
    process.env.JWT_SECRET as string,
    { expiresIn: "5d" }
    );

    res.status(200).json({
      message: "Profile picture updated successfully",
      user: updateUserProfile,
      token:token
    });
    return;

});