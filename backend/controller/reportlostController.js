export const createReport = async (req,res)=>{
    try{
        const {nameItem,description,location,date,contact} = req.body;
    }catch(error){
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}