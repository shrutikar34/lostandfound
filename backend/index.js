import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser";
import auth from "./routes/authRoute.js";
import item from "./routes/itemRoute.js";
import user from "./routes/userRoute.js";
import found from "./routes/foundRoutes.js";

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
app.use("/api/v1/item", item);
app.use("/api/v1/user", user);
app.use("/api/v1/found", found);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));