import slugify from "slugify";
import Category from "../schema/categoryModel.js";

// Get all Categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: "Success",
      data: categories,
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

    res.status(200).json({ status: "Success", data: category });
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
    res.status(201).json({ status: "Success", message: "Category Added Successfully", data: newCategory });
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

    res.status(200).json({ status: "Success", message: "Category Updated Successfully", data: updatedCategory });
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
