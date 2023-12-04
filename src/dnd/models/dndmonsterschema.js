const mongoose = require("mongoose");
const schema = mongoose.Schema;

const alignmentenum = [
  "Leal Bom",
  "Neutro Bom",
  "Caótico Bom",
  "Leal Neutro",
  "Neutro",
  "Caótico Neutro",
  "Leal Mau",
  "Neutro Mau",
  "Caótico Mau",
];

const proficienciesenum = [
  "acrobacia",
  "arcanismo",
  "atletismo",
  "atuação",
  "enganação",
  "furtividade",
  "história",
  "intimidação",
  "intuição",
  "investigação",
  "lidar com animais",
  "medicina",
  "natureza",
  "percepção",
  "persuasão",
  "prestidigitação",
  "religião",
  "sobrevivência",
];

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

const dndMonsterSchema = new schema({
  name: String,
  desc: String,
  size: String,
  type: String,
  alignment: { type: String, enum: alignmentenum },
  armor_class: Number,
  hit_points: Number,
  hit_dice: String,
  speed: {
    walk: { type: Number, required: false },
    swim: { type: Number, required: false },
    fly: { type: Number, required: false },
    burrow: { type: Number, required: false },
    climb: { type: Number, required: false },
  },
  strength: Number,
  dexterity: Number,
  constitution: Number,
  intelligence: Number,
  wisdom: Number,
  charisma: Number,
  proficiencies: [{ type: String, enum: proficienciesenum, value: Number }],
  damage_vulnerabilities: [String],
  damage_resistances: [String],
  damage_immunities: [String],
  condition_immunities: [String],
  senses: {
    darkvision: Number,
    blindsight: Number,
    tremorsense: Number,
    truesight: Number,
  },
  languages: [{ type: String, enum: languagesenum }],
  challenge_rating: Number,
});

module.exports = mongoose.model("dndMonster", dndMonsterSchema);
