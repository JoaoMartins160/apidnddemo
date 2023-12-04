const DndMonsterSchema = require("../schemas/dndmonsterschema");

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
    const allMonsters = await DndMonsterSchema.find();
    res.status(200).json(allMonsters);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMonsterById = async (req, res) => {
  const { id } = req.params;
  try {
    const monster = await DndMonsterSchema.findById(id);
    res.status(200).json(monster);
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
    const monster = await DndMonsterSchema.findOne({ name: name });
    res.status(200).json(monster);
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
