const mongoose = require("mongoose");
const schema = mongoose.Schema;

const languagesenum = [
  "comum",
  "anão",
  "elfo",
  "gnomo",
  "halfling",
  "orc",
  "abissal",
  "celestial",
  "dracônico",
  "infernal",
  "primordial",
  "silvestre",
];

const dndRaceSchema = new schema({
  name: String,
  desc: String,
  speed: Number,
  ability_bonuses: [
    {
      name: String,
      bonus: Number,
    },
  ],
  starting_proficiencies: [
    {
      name: String,
      desc: String,
    },
  ],
  languages: [
    {
      name: String,
      desc: String,
      type: { type: String, enum: languagesenum },
    },
  ],
  traits: [
    {
      name: String,
      desc: String,
    },
  ],
});

module.exports = mongoose.model("dndRace", dndRaceSchema);
