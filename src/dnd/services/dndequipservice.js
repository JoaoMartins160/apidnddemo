const dndEquipSchema = require("../models/dndequipschema");
const cache = require("../../cache/cache");

const createNewEquip = async (req, res) => {
  const {
    name,
    equipment_category,
    weapon_category,
    weapon_range,
    category_range,
    cost,
    damage,
    range,
    weight,
    properties,
    throw_range,
    two_handed_damage,
    special,
    desc,
  } = req.body;

  const newEquip = new dndEquipSchema({
    name,
    equipment_category,
    weapon_category,
    weapon_range,
    category_range,
    cost,
    damage,
    range,
    weight,
    properties,
    throw_range,
    two_handed_damage,
    special,
    desc,
  });

  try {
    const savedEquip = await newEquip.save();
    res.status(200).json(savedEquip);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllEquips = async (req, res) => {
  try {
    const cacheKey = "allEquips";
    const cachedEquips = await cache.get(cacheKey);

    if (cachedEquips) {
      res.status(200).json(cachedEquips);
    } else {
      const allEquips = await dndEquipSchema.find();
      cache.set(cacheKey, allEquips, 240);
      res.status(200).json(allEquips);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getEquipById = async (req, res) => {
  const { id } = req.params;
  try {
    const cacheKey = `equip:${id}`;
    const cachedEquips = await cache.get(cacheKey);

    if (cachedEquips) {
      res.status(200).json(cachedEquips);
    } else {
      const equipById = await dndEquipSchema.findById(id);
      cache.set(cacheKey, equips, 240);
      res.status(200).json(equipById);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateEquipById = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    equipment_category,
    weapon_category,
    weapon_range,
    category_range,
    cost,
    damage,
    range,
    weight,
    properties,
    throw_range,
    two_handed_damage,
    special,
    desc,
  } = req.body;

  try {
    const updatedEquip = await dndEquipSchema.findByIdAndUpdate(
      id,
      {
        name,
        equipment_category,
        weapon_category,
        weapon_range,
        category_range,
        cost,
        damage,
        range,
        weight,
        properties,
        throw_range,
        two_handed_damage,
        special,
        desc,
      },
      { new: true }
    );
    const cacheKey = `equip:${id}`;
    await cache.del(cacheKey);
    res.status(200).json(updatedEquip);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteEquipById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEquip = await dndEquipSchema.findByIdAndDelete(id);
    res.status(200).json(deletedEquip);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getEquipByName = async (req, res) => {
  const { name } = req.params;
  try {
    const cacheKey = `equip:${name}`;
    const cachedEquips = await cache.get(cacheKey);

    if (cachedEquips) {
      res.status(200).json(cachedEquips);
    } else {
      const equipByName = await dndEquipSchema.find({ name: name });
      cache.set(cacheKey, equip, 240);
      res.status(200).json(equipByName);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createNewEquip,
  getAllEquips,
  getEquipById,
  updateEquipById,
  deleteEquipById,
  getEquipByName,
};
