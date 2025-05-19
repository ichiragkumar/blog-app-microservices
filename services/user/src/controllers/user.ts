import User from "../models/User";
import jwt from "jsonwebtoken";
import requestHandler from "../utils/requestHandler";
import { AuthenticatedRequest } from "../middleware/isAuth";

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
    token : token,
    user: newUser,
    message : "User created successfully"
  });

});

export const myProfile = requestHandler(
  async (req: AuthenticatedRequest, res) => {
    const user = req.user;
    if (!user) {
      console.log("i am here");
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    res.status(200).json(user);
  }
);
