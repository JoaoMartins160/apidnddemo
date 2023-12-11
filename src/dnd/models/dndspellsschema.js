const mongoose = require("mongoose");
const schema = mongoose.Schema;

const damageenum = [
  "acido",
  "fogo",
  "frio",
  "eletricidade",
  "forca",
  "necrotico",
  "perfurante",
  "contudente",
  "cortante",
  "psiquico",
  "radiante",
  "relampago",
  "sangramento",
  "sonico",
  "veneno",
];

const dndSpellsSchema = new schema({
  name: String,
  desc: String,
  higher_level: String,
  range: String,
  components: [String],
  material: String,
  ritual: Boolean,
  duration: String,
  concentration: Boolean,
  casting_time: String,
  level: Number,
  attack_type: String,
  damage: {
    damage_type: {
      type: String,
      enum: damageenum,
    },
    damage_at_slot_level: {
      level: Number,
      damage_dice: String,
    },
  },
  school: {
    name: String,
  },
  classes: [
    {
      name: String,
    },
  ],
});

module.exports = mongoose.model("dndSpells", dndSpellsSchema);
