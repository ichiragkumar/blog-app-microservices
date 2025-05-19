import dotenv from "dotenv";
import express from "express";
import connectToDB from "./utils/db";
import userRoutes from "./routes/user";
import cors from "cors";
import { connectToCloudinaryDB } from "./utils/coudinaryDB";

dotenv.config();



const app = express();
connectToDB()
connectToCloudinaryDB()

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", userRoutes);


const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});