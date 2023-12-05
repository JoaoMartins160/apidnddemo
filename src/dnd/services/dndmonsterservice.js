const DndMonsterSchema = require("../models/dndmonsterschema");
const cache = require("../../cache/cache");

const createNewMonster = async (req, res) => {
  const {
    name,
    desc,
    size,
    type,
    alignment,
    armor_class,
    hit_points,
    hit_dice,
    speed,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    proficiencies,
    damage_vulnerabilities,
    damage_resistances,
    damage_immunities,
    condition_immunities,
    senses,
    languages,
    challenge_rating,
  } = req.body;

  const newMonster = new DndMonsterSchema({
    name,
    desc,
    size,
    type,
    alignment,
    armor_class,
    hit_points,
    hit_dice,
    speed,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    proficiencies,
    damage_vulnerabilities,
    damage_resistances,
    damage_immunities,
    condition_immunities,
    senses,
    languages,
    challenge_rating,
  });

  try {
    const savedMonster = await newMonster.save();
    res.status(200).json(savedMonster);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllMonsters = async (req, res) => {
  try {
    const cacheKey = "allMonsters";
    const cachedMonsters = await cache.get(cacheKey);

    if (cachedMonsters) {
      res.status(200).json(cachedMonsters);
    } else {
      const allMonsters = await DndMonsterSchema.find();
      cache.set(cacheKey, allMonsters, 240);
      res.status(200).json(allMonsters);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "Ocorreu um erro ao tentar buscar todos os monstros" });
  }
};

const getMonsterById = async (req, res) => {
  const { id } = req.params;
  try {
    const cacheKey = `monster:${id}`;
    const cachedMonster = await cache.get(cacheKey);

    if (cachedMonster) {
      res.status(200).json(cachedMonster);
    } else {
      const monster = await DndMonsterSchema.findById(id);
      cache.set(cacheKey, monster, 240);
      res.status(200).json(monster);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateMonsterById = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    desc,
    size,
    type,
    alignment,
    armor_class,
    hit_points,
    hit_dice,
    speed,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    proficiencies,
    damage_vulnerabilities,
    damage_resistances,
    damage_immunities,
    condition_immunities,
    senses,
    languages,
    challenge_rating,
  } = req.body;

  try {
    const updatedMonster = await DndMonsterSchema.findByIdAndUpdate(
      id,
      {
        name,
        desc,
        size,
        type,
        alignment,
        armor_class,
        hit_points,
        hit_dice,
        speed,
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        proficiencies,
        damage_vulnerabilities,
        damage_resistances,
        damage_immunities,
        condition_immunities,
        senses,
        languages,
        challenge_rating,
      },
      { new: true }
    );
    res.status(200).json(updatedMonster);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteMonsterById = async (req, res) => {
  const { id } = req.params;
  try {
    await DndMonsterSchema.findByIdAndDelete(id);
    res.status(200).json("Monstro deletado com sucesso!");
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMonsterByName = async (req, res) => {
  const { name } = req.params;
  try {
    const cacheKey = `monster:${name}`;
    const cachedMonster = await cache.get(cacheKey);

    if (cachedMonster) {
      res.status(200).json(cachedMonster);
    } else {
      const monster = await DndMonsterSchema.findOne({ name: name });
      cache.set(cacheKey, monster, 240);
      res.status(200).json(monster);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createNewMonster,
  getAllMonsters,
  getMonsterById,
  updateMonsterById,
  deleteMonsterById,
  getMonsterByName,
};
