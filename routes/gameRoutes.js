const express = require("express");
const GameController =
  require("./../controllers/gameController").GameController;
const Game = require("./../models/gameModel");

const router = express.Router();

const gameController = new GameController(Game);

/**
 * @swagger
 * /api/v1/game:
 *   post:
 *     summary: Create a new Chess game.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             fen:
 *               type: string
 *     responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Bad request
 */
router.route("/").post(gameController.createGame);

/**
 * @swagger
 * /api/v1/game/{gameId}:
 *  get:
 *    summary: Get game current state
 *    parameters:
 *      - in: path
 *        name: gameId
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric ID of the game to get
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Bad request
 */
router.route("/:gameId").get(gameController.getGameState);

/**
 * @swagger
 * /api/v1/game/{gameId}/moves:
 *   post:
 *     summary: Get valid moves for a game.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: gameId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the game to get
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             position:
 *               type: string
 *     responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Bad request
 */
router.route("/:gameId/moves").post(gameController.getGameMoves);

/**
 * @swagger
 * /api/v1/game/{gameId}/move:
 *   post:
 *     summary: Move a piece and update state.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: gameId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the game to get
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             move:
 *               type: object
 *               properties:
 *                 color:
 *                    type: string
 *                    required: true
 *                 from:
 *                    type: integer
 *                 to:
 *                    type: integer
 *                 fromMatrixNotation:
 *                    type: string
 *                 toMatrixNotation:
 *                    type: string
 *                 piece:
 *                    type: string
 *     responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Bad request
 */
router.route("/:gameId/move").post(gameController.move);

/**
 * @swagger
 * /api/v1/game/{gameId}/moves/history:
 *   post:
 *     summary: Get history of all moves in a game.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: gameId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the game to get
 *     responses:
 *      '501':
 *        description: End point not fully supported
 */
router.route("/:gameId/moves/history").post(gameController.getGameMovesHistory);

module.exports = router;
