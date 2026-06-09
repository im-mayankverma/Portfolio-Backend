/**
 * Generic CRUD controller factory for simple collections.
 * Keeps your code DRY and consistent across resources.
 */
const { asyncHandler } = require("../utils/asyncHandler");

const createCrudControllers = (Model) => {
  const getAll = asyncHandler(async (req, res) => {
    const docs = await Model.find().sort({ createdAt: -1 });
    res.json(docs);
  });

  const getById = asyncHandler(async (req, res) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      res.status(404);
      throw new Error("Not found");
    }
    res.json(doc);
  });

  const createOne = asyncHandler(async (req, res) => {
    const doc = await Model.create(req.body);
    res.status(201).json(doc);
  });

  const updateById = asyncHandler(async (req, res) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      res.status(404);
      throw new Error("Not found");
    }

    res.json(doc);
  });

  const deleteById = asyncHandler(async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      res.status(404);
      throw new Error("Not found");
    }
    res.json({ success: true });
  });

  return { getAll, getById, createOne, updateById, deleteById };
};

module.exports = { createCrudControllers };