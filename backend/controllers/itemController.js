import { Item, ItemSchemaZod } from "../models/Item.js";

export const createItem = async (req, res) => {
  try {
    // console.log("Request body:", req.body); // Log the request body

    // Prepare the data for validation
    const itemData = {
      ...req.body,
      user: req.user, // Use the user ID from the authentication middleware
      date: req.body.date, // Convert the date string to a Date object
    };

    console.log("Item data:", itemData); // Log the item data

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
      item: savedItem,
    });
  } catch (error) {
    console.error("Error in createItem:", error); // Log the full error
    return res.status(400).json({
      message: error.errors ? error.errors[0].message : "Invalid input data",
      success: false,
    });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({
        message: "Item not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Item deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in deleteItem:", error);
    return res.status(400).json({
      message: error.errors ? error.errors[0].message : "Invalid input data",
      success: false,
    });
  }
};

export const updatedItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const validatedData = ItemSchemaZod.partial().parse(updatedData);

    const updatedItem = await Item.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({
        message: "Item not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Item updated successfully",
      success: true,
      item: updatedItem,
    });
  } catch (error) {
    console.error("Error in updateItem:", error);
    return res.status(400).json({
      message: error.errors ? error.errors[0].message : "Invalid input data",
      success: false,
    });
  }
};

export const getLostItems = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const query = search 
      ? { 
          nameItem: { $regex: search, $options: 'i' },
          status: "lost"
        } 
      : { status: "lost" };

    const items = await Item.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('user', 'name email') // Populate user details if needed
      .exec();

    const count = await Item.countDocuments(query);

    if (items.length === 0) {
      // If no items are found
      return res.status(200).json({
        message: "No such available item",
        success: false
      });
    }

    // If items are found, send them in the response
    return res.status(200).json({
      items,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      success: true
    });
  } catch (error) {
    console.error("Error in getLostItems:", error);
    return res.status(500).json({
      message: "An error occurred while fetching lost items",
      success: false
    });
  }
};

export const getSingleLostItems =async (req, res) => {
  try{
    const {id} = req.params;
    const item = await Item.findById(id);

    if(!item){
      return res.status(404).json({
        message: "Item not found",
        success: false
      })
    }
    return res.status(200).json({
      item,
      success: true
    })
  }
  catch(error){
    console.error("Error in getSingleLostItems:", error);
    return res.status(500).json({
      message: "An error occurred while fetching lost items",
      success: false
    });
  }
}