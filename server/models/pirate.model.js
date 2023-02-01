const mongoose = require("mongoose");

const PirateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Pirate name is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    treasureChests: {
      type: Number,
      required: [true, "Number of Treasure Chests is required"],
    },
    catchPhrase: { 
      type: String, 
      required: [true, "Pirate Catch Phrase is required"] 
    },
    position: { 
      type: String, 
      enum: ["Captain", "First Mate", "Quarter Monkey", "Boatswain", "Powder Monkey"],
      required: [true, "Crew Position is required"] 
    },
    pegLeg: {
      type: Boolean,
      default: false 
    },
    eyePatch: {
      type: Boolean,
      default: false 
    },
    hookHand: {
      type: Boolean,
      default: false 
    }
  },
  { timestamps: true }
);

const Pirate = mongoose.model("Pirate", PirateSchema);

module.exports = Pirate;
