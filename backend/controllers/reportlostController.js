import { Item, ItemSchemaZod } from "../models/Item.js";

export const createReport = async (req, res) => {
  try {
    // console.log("Request body:", req.body); // Log the request body

    // Prepare the data for validation
    const itemData = {
      ...req.body,
      user: req.user, // Use the user ID from the authentication middleware
      date: req.body.date // Convert the date string to a Date object
    };

    // Validate the input using Zod
    const validatedData = ItemSchemaZod.parse(itemData);

    // Create a new item
    const newItem = new Item(validatedData);

    // Save the item
    const savedItem = await newItem.save();
    // console.log("Saved item:", savedItem); // Log the saved item

    return res.status(201).json({
      message: "Report created successfully",
      success: true,
      item: savedItem
    });
  } catch (error) {
    console.error("Error in createReport:", error); // Log the full error
    return res.status(400).json({
      message: error.errors ? error.errors[0].message : "Invalid input data",
      success: false
    });
  }
};

export const deleteReport = async(req,res)=>{
  try{
    const {id} = req.params;
    
    const deletedItem = await Item.findByIdAndDelete(id);

    if(!deletedItem){
      return res.status(404).json({
        message: "Item not found",
        success: false
      })
    }

    return res.status(200).json({
      message: "Item deleted successfully",
      success: true
    })
  }
  catch(error){
    console.error("Error in deleteReport:", error);
    return res.status(400).json({
      message: error.errors ? error.errors[0].message : "Invalid input data",
      success: false
    })
  }
}

