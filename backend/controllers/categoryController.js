import slugify from "slugify";
import Category from "../schema/categoryModel.js";

// Get all Categories
export const getAllCategories = async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const categories = await Category.find().skip(skip).limit(limit)
    const total = await Category.countDocuments();
    res.status(200).json({
      message: "Success",
      page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

// Get single Category
export const getCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ status: "Error", message: "Category Not Found" });
    }

    res.status(200).json({ status: "Success",  category });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// Add Category
export const addCategory = async (req, res) => {
  try {
    const newCategory = new Category({
      name: req.body.name,
      slug: slugify(req.body.name, { lower: true, strict: true }),
      description: req.body.description,
      status: req.body.status,
    });

    await newCategory.save();
    res.status(201).json({ status: "Success", message: "Category Added Successfully",  newCategory });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    let updateData = { ...req.body };

    if (updateData.name) {
      updateData.slug = slugify(updateData.name, { lower: true, strict: true });
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ status: "Error", message: "Category Not Found" });
    }

    res.status(200).json({ status: "Success", message: "Category Updated Successfully",  updatedCategory });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ status: "Error", message: "Category Not Found" });
    }

    res.status(200).json({ status: "Success", message: "Category Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};
