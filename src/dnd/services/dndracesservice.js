const dndRaceSchema = require("../models/dndracesschema");
const cache = require("../../cache/cache");

const createNewRace = (webSocketService) => async (req, res) => {
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
  webSocketService.notifyClients("Uma nova raça foi criada", req.userId);
  res.status(201).send();
};

const getAllRaces = async (req, res) => {
  try {
    const cacheKey = "allRaces";
    const cachedRaces = await cache.get(cacheKey);

    if (cachedRaces) {
      res.status(200).json(cachedRaces);
    } else {
      const race = await dndRaceSchema.find();
      cache.set(cacheKey, race, 240);
      res.status(200).json(race);
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
      const race = await dndRaceSchema.findById(id);
      cache.set(cacheKey, race, 240);
      res.status(200).json(race);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateRaceById = (webSocketService) => async (req, res) => {
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
  webSocketService.notifyClients(
    `A raça ${req.params.id} foi atualizada`,
    req.userId
  );
  res.status(200).send();
};

const deleteRaceById = (webSocketService) => async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRace = await dndRaceSchema.findByIdAndDelete(id);
    res.status(200).json(deletedRace);
  } catch (error) {
    res.status(500).json(error);
  }
  webSocketService.notifyClients(
    `A raça ${req.params.id} foi deletada`,
    req.userId
  );
  res.status(200).send();
};

const getRaceByName = async (req, res) => {
  const { name } = req.params;
  try {
    const cacheKey = `races:${name}`;
    const cachedRaces = await cache.get(cacheKey);

    if (cachedRaces) {
      res.status(200).json(cachedRaces);
    } else {
      const races = await dndRaceSchema.find({
        name: { $regex: name, $options: "i" },
      });
      cache.set(cacheKey, races, 240);
      res.status(200).json(races);
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
