import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser";
import auth from "./routes/authRoute.js";

const app = express();

dotenv.config({
    path: ".env"
});

//database connection
connectDB();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//api
app.use("/api/v1/auth", auth);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));