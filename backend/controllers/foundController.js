import { Found, FoundSchemaZod } from "../models/Found.js";
import { Item } from "../models/Item.js";
export const createFoundItem = async (req, res) => {
  try {
    const validatedData = FoundSchemaZod.parse({
      ...req.body,
      finder: req.user,
      date: req.body.date,
      image: req.file ? req.file.path : null,
    });

    console.log("Validated data", validatedData);

    const newFound = new Found(validatedData);

    const savedFound = await newFound.save();

    await Item.findByIdAndUpdate(validatedData.item, {
        status: "found",
        // finder: req.user._id,
    })
    return res.status(201).json({
      message: "Report created successfully",
      success: true,
      found: savedFound,
    });
  } catch (error) {
    console.error("Error in createFound:", error);
    return res.status(400).json({
      message: error.errors ? error.errors[0].message : "Invalid input data",
      success: false,
    });
  }
};

export const deleteFoundItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFound = await Found.findByIdAndDelete(id);

    if (!deletedFound) {
      return res.status(404).json({
        message: "Item not found ",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Item deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in deleteFound:", error);
    return res.status(400).json({
      message: error.errors ? error.errors[0].message : "Invalid input data",
      success: false,
    });
  }
};

export const updateFoundItem = async (req, res) => {
  try {
    const { id } = req.params;

    const validatedData = FoundSchemaZod.partial().parse({
      ...req.body,
      image: req.file ? req.file.path : null,
    });

    const updatedFound = await Found.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!updatedFound) {
      return res.status(404).json({
        message: "Item not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Item updated successfully",
      success: true,
      found: updatedFound,
    });
  } catch (error) {
    console.error("Error in updateFound:", error);
    return res.status(400).json({
      message: error.errors ? error.errors[0].message : "Invalid input data",
      success: false,
    });
  }
};

export const getFoundItems = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const query = search
      ? { description: { $regex: search, $options: "i" } }
      : {};

    const foundItems = await Found.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("finder", "name email")
      .populate("item", "nameItem category")
      .exec();

    const count = await Found.countDocuments(query);

    return res.status(200).json({
      foundItems,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error in getFoundItems:", error);
    return res.status(500).json({
      message: "An error occurred while fetching found items",
      success: false,
    });
  }
};

export const getSingleFoundItem = async (req, res) => {
    try {
        const { id } = req.params;
        const foundItem = await Found.findById(id)
            .populate('finder', 'name email')
            .populate('item', 'nameItem category');

        if (!foundItem) {
            return res.status(404).json({
                message: "Found item not found",
                success: false
            });
        }

        return res.status(200).json({
            foundItem,
            success: true
        });
    } catch (error) {
        console.error("Error in getSingleFoundItem:", error);
        return res.status(500).json({
            message: "An error occurred while fetching the found item",
            success: false
        });
    }
};
