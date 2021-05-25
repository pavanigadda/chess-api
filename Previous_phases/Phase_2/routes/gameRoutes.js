const express = require("express");
const gameController = require("./../controllers/gameController");

const router = express.Router();

router.route("/").post(gameController.createGame);

router.route("/:gameId").get(gameController.getGameState);

router.route("/:gameId/moves").post(gameController.getGameMoves);

router.route("/:gameId/move").post(gameController.move);

module.exports = router;
