const dndSpellsSchema = require("../models/dndspellsschema");
const cache = require("../../cache/cache");

const createNewSpell = async (req, res) => {
  const {
    name,
    desc,
    higher_level,
    range,
    components,
    material,
    ritual,
    duration,
    concentration,
    casting_time,
    level,
    attack_type,
    damage,
    school,
    classes,
  } = req.body;

  const newSpell = new dndSpellsSchema({
    name,
    desc,
    higher_level,
    range,
    components,
    material,
    ritual,
    duration,
    concentration,
    casting_time,
    level,
    attack_type,
    damage,
    school,
    classes,
  });

  try {
    const savedSpell = await newSpell.save();
    res.status(200).json(savedSpell);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllSpells = async (req, res) => {
  try {
    const cacheKey = "allSpells";
    const cachedSpells = await cache.get(cacheKey);

    if (cachedSpells) {
      res.status(200).json(cachedSpells);
    } else {
      const allSpells = await dndSpellsSchema.find();
      cache.set(cacheKey, allSpells, 240);
      res.status(200).json(allSpells);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSpellById = async (req, res) => {
  const { id } = req.params;
  try {
    const cacheKey = `spells:${id}`;
    const cachedSpells = await cache.get(cacheKey);

    if (cachedSpells) {
      res.status(200).json(cachedSpells);
    } else {
      const spellById = await dndSpellsSchema.findById(id);
      cache.set(cacheKey, spells, 240);
      res.status(200).json(spellById);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateSpellById = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    desc,
    higher_level,
    range,
    components,
    material,
    ritual,
    duration,
    concentration,
    casting_time,
    level,
    attack_type,
    damage,
    school,
    classes,
  } = req.body;

  try {
    const updatedSpell = await dndSpellsSchema.findByIdAndUpdate(
      id,
      {
        name,
        desc,
        higher_level,
        range,
        components,
        material,
        ritual,
        duration,
        concentration,
        casting_time,
        level,
        attack_type,
        damage,
        school,
        classes,
      },
      { new: true }
    );
    const cacheKey = `spells:${id}`;
    await cache.del(cacheKey);
    res.status(200).json(updatedSpell);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteSpellById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSpell = await dndSpellsSchema.findByIdAndDelete(id);
    res.status(200).json(deletedSpell);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSpellByName = async (req, res) => {
  const { name } = req.params;
  try {
    const cacheKey = `spells:${name}`;
    const cachedSpells = await cache.get(cacheKey);

    if (cachedSpells) {
      res.status(200).json(cachedSpells);
    } else {
      const spellByName = await dndSpellsSchema.find({ name: name });
      cache.set(cacheKey, spells, 240);
      res.status(200).json(spellByName);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createNewSpell,
  getAllSpells,
  getSpellById,
  updateSpellById,
  deleteSpellById,
  getSpellByName,
};
