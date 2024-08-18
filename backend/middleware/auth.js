import  jwt  from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
    path:"../middleware/.env"
});

const isAuthenticated = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        console.log(token);
        if(!token){
            return res.status(401).json({
                message:"User not authenticated",
                success:false
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded.userId;
        next();
    }
    catch(error){
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export default isAuthenticated