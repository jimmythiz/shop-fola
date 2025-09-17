import Tag from "../schema/tagsSchema.js";
import slugify from "slugify"

// Get all Tags
export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json({
      status: "Success",
      data: tags
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      data: error.message
    });
  }
};

// Get single Tag
export const getTag = async (req, res) => {
  try {
    const id = req.params.id;
    const tag = await Tag.findById(id);

    if (!tag) {
      return res.status(404).json({ status: "Error", data: "Tag Not Found" });
    }

    res.status(200).json({ status: "Success", data: tag });
  } catch (error) {
    res.status(400).json({ status: "Error", data: error.message });
  }
};

// Add Tag
export const addTag = async (req, res) => {

  try {
    const newTag = new Tag({
      name: req.body.name,
      slug: slugify(req.body.name, { lower: true }),
      description: req.body.description,
      status: req.body.status
    });

    await newTag.save();
    res.status(201).json({ status: "Tag Added Successfully", data: newTag });
  } catch (error) {
    res.status(400).json({ status: "Error", data: error.message });
  }
};

// Update Tag
export const updateTag = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = {...req.body}
    if (updateData.name){
      updateData.slug = slugify(updateData.name)
    }
    const updatedTag = await Tag.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedTag) {
      return res.status(404).json({ status: "Error", data: "Tag Not Found" });
    }

    res.status(200).json({ status: "Tag Updated Successfully", data: updatedTag });
  } catch (error) {
    res.status(400).json({ status: "Error", data: error.message });
  }
};

// Delete Tag
export const deleteTag = async (req, res) => {
  try {
    const id = req.params.id;
    const tag = await Tag.findByIdAndDelete(id);

    if (!tag) {
      return res.status(404).json({ status: "Error", data: "Tag Not Found" });
    }

    res.status(200).json({ status: "Tag Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ status: "Error", data: error.message });
  }
};
