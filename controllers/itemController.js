import Item from "../models/Item.js";

//Create
const createItem = async (req, res) => {
  try {
    const itemData = req.body;

    if (!itemData.category) {
      return res.status(400).json({ msg: "category data is missing" });
    }

    if (!itemData) {
      return res.status(400).json({ msg: "Item data is missing" });
    }

    const newItem = await Item.create(itemData);
    res.status(200).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//getAll
const getAllItems = async (req, res) => {
  const queryDb = { isActive: true };

  const queryKeys = ["category", "brand", "product_name"];

  queryKeys.forEach((key) => {
    if (req.query[key]) {
      queryDb[key] = { $regex: new RegExp(req.query[key], "i") };
    }
  });

  try {
    const items = await Item.find(queryDb);
    if (!items) {
      return res.status(404).json({ msg: "Books not found" });
    }

    res.status(200).json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//getById
const getItemById = async (req, res) => {
  //valido que el id sea un objetId de mongo valido (que tenga 24 caracteres alfanumericos)
  if (!req.params.itemId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: "Invalid item ID" });
  }

  try {
    const item = await Item.findById({
      _id: req.params.itemId,
      isActive: true,
    });
    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update
const updateItemById = async (req, res) => {
  // Valido que el ID sea un ObjectID de Mongo válido (24 caracteres alfanuméricos)
  if (!req.params.itemId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: "Invalid item ID" });
  }

  try {
    const item = await Item.findByIdAndUpdate(req.params.itemId, req.body, {
      new: true,
    });
    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//delete
const deleteItemById = async (req, res) => {
  if (!req.params.itemId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: "Invalid item ID" });
  }

  // cambio el campo isActive a false
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.itemId,
      { isActive: false },
      { new: false }
    );
    if (!item || item.isActive === false) {
      return res.status(404).json({ msg: "Item not found" });
    }
    res.status(204).json();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { createItem, getAllItems, getItemById, updateItemById, deleteItemById };
