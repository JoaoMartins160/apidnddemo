const moongose = require("mongoose");
const schema = moongose.Schema;

const dndEquipSchema = new schema({
  name: { type: String, required: true },
  equipment_category: { type: String, required: true },
  weapon_category: { type: String, required: false },
  weapon_range: { type: String, required: false },
  category_range: { type: String, required: false },
  cost: { type: Object, required: true },
  damage: { type: Object, required: false },
  range: { type: Object, required: false },
  weight: { type: Number, required: true },
  properties: { type: Array, required: false },
  throw_range: { type: Object, required: false },
  two_handed_damage: { type: Object, required: false },
  special: { type: Array, required: false },
  desc: { type: Array, required: false },
});

module.exports = moongose.model("dndEquip", dndEquipSchema);
