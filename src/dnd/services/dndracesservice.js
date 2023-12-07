const dndRaceSchema = require("../models/dndracesschema");
const cache = require("../../cache/cache");

const createNewRace = async (req, res) => {
  const {
    name,
    desc,
    speed,
    ability_bonuses,
    starting_proficiencies,
    languages,
    traits,
  } = req.body;

  const newRace = new dndRaceSchema({
    name,
    desc,
    speed,
    ability_bonuses,
    starting_proficiencies,
    languages,
    traits,
  });

  try {
    const savedRace = await newRace.save();
    res.status(200).json(savedRace);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllRaces = async (req, res) => {
  try {
    const cacheKey = "allRaces";
    const cachedRaces = await cache.get(cacheKey);

    if (cachedRaces) {
      res.status(200).json(cachedRaces);
    } else {
      const allRaces = await dndRaceSchema.find();
      cache.set(cacheKey, allRaces, 240);
      res.status(200).json(allRaces);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getRaceById = async (req, res) => {
  const { id } = req.params;
  try {
    const cacheKey = `races:${id}`;
    const cachedRaces = await cache.get(cacheKey);

    if (cachedRaces) {
      res.status(200).json(cachedRaces);
    } else {
      const raceById = await dndRaceSchema.findById(id);
      cache.set(cacheKey, races, 240);
      res.status(200).json(raceById);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateRaceById = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    desc,
    speed,
    ability_bonuses,
    starting_proficiencies,
    languages,
    traits,
  } = req.body;

  try {
    const updatedRace = await dndRaceSchema.findByIdAndUpdate(
      id,
      {
        name,
        desc,
        speed,
        ability_bonuses,
        starting_proficiencies,
        languages,
        traits,
      },
      { new: true }
    );
    const cacheKey = `races:${id}`;
    await cache.del(cacheKey);
    res.status(200).json(updatedRace);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteRaceById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRace = await dndRaceSchema.findByIdAndDelete(id);
    res.status(200).json(deletedRace);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getRaceByName = async (req, res) => {
  const { name } = req.params;
  try {
    const cacheKey = `races:${name}`;
    const cachedRaces = await cache.get(cacheKey);

    if (cachedRaces) {
      res.status(200).json(cachedRaces);
    } else {
      const raceByName = await dndRaceSchema.find({ name: name });
      cache.set(cacheKey, races, 240);
      res.status(200).json(raceByName);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createNewRace,
  getAllRaces,
  getRaceById,
  updateRaceById,
  deleteRaceById,
  getRaceByName,
};
