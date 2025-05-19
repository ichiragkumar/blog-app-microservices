import  {Request, Response} from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

export const loginUser =  async (req: Request, res: Response) => {
    try {
        const {email , name, image } = req.body;

        const user = await User.findOne({email});
        if(user){
            res.status(400).json({message: "User already exists"});
        }
        const newUser = await  User.create({email, name, image});


        const token = jwt.sign({id: newUser}, process.env.JWT_SECRET! as string , {
            expiresIn : "5d"
        });
        res.status(200).json({
            msg: "Login Successful",
            token
        });

     }catch( error : any) {
        res.status(500).json({message: error.message});
    }

}