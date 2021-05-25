const Chess = require("./../chess").Chess;

const GameController = function (gameModel) {
  const createGame = async (req, res) => {
    try {
      let newChess = new Chess();
      let gameBody = req.body;

      if (req.body.fen) {
        newChess.startGame(req.body.fen);
        gameBody.fen = newChess.getFen();
        gameBody.state = newChess.getGameState();
        gameBody.turn = newChess.getTurn();
        gameBody.moveNumber = newChess.getMoveNumber();
      }
      const newGame = await gameModel.create({
        fen: gameBody.fen,
        state: gameBody.state,
        turn: gameBody.turn,
        moveNumber: gameBody.moveNumber,
      });
      res.status(201).json({
        status: "success",
        data: {
          game: newGame,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  };

  const getGameState = async (req, res) => {
    try {
      const inputGameId = req.params.gameId;
      const gameById = await gameModel.findOne({ gameId: inputGameId }).exec();
      if (!gameById) {
        throw "Invalid game Id passed";
      }

      res.status(200).json({
        status: "success",
        data: {
          game: gameById,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  };

  const getGameMoves = async (req, res) => {
    try {
      const inputGameId = req.params.gameId;
      const piecePosition = req.body.position;
      const gameById = await gameModel.findOne({ gameId: inputGameId }).exec();
      if (!gameById) {
        throw "Invalid game Id passed";
      }
      const fen = gameById.fen;
      const newChess = new Chess();
      newChess.startGame(fen);
      const moves = newChess.getMoves(piecePosition);

      res.status(200).json({
        status: "success",
        data: {
          gameId: inputGameId,
          moves: moves,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  };

  const move = async (req, res) => {
    try {
      const inputGameId = req.params.gameId;
      const moveObj = req.body.move;
      const gameById = await gameModel.findOne({ gameId: inputGameId }).exec();
      if (!gameById) {
        throw "Invalid game Id passed";
      }
      const fen = gameById.fen;
      const newChess = new Chess();
      newChess.startGame(fen);
      newChess.move(moveObj);

      const newGame = await gameModel.findOneAndUpdate(
        { gameId: inputGameId },
        {
          fen: newChess.getFen(),
          state: newChess.getGameState(),
          turn: newChess.getTurn(),
          moveNumber: newChess.getMoveNumber(),
        },
        { new: true, runValidators: true }
      );

      res.status(200).json({
        status: "success",
        data: {
          game: newGame,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: err,
      });
    }
  };

  const getGameMovesHistory = async (req, res) => {
    try {
      const inputGameId = req.params.gameId;
      const gameById = await gameModel.findOne({ gameId: inputGameId }).exec();
      if (!gameById) {
        throw "Invalid game Id passed";
      }
      const fen = gameById.fen;
      const newChess = new Chess();
      newChess.startGame(fen);
      newChess.getMovesHistory();
    } catch (err) {
      res.status(501).json({
        status: "fail",
        message: err,
      });
    }
  };

  return Object.freeze({
    createGame,
    getGameState,
    getGameMoves,
    move,
    getGameMovesHistory,
  });
};

module.exports.GameController = GameController;
