const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const { DEFAULT_STATE, DEFAULT_FEN, COLORS } = require("./../constants");

const peiceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
  },
  { _id: false }
);
const gameSchema = new mongoose.Schema({
  gameId: {
    type: Number,
    ref: "gameId",
  },
  fen: {
    type: String,
    default: DEFAULT_FEN,
  },
  state: {
    type: [[peiceSchema]],
    default: DEFAULT_STATE,
  },
  turn: {
    type: String,
    default: COLORS.WHITE,
  },
  moveNumber: {
    type: Number,
    default: 0,
  },
});

autoIncrement.initialize(mongoose.connection);
gameSchema.plugin(autoIncrement.plugin, {
  model: "Game",
  field: "gameId",
});
const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
