const {
  COLORS,
  PIECES,
  DEFAULT_FEN,
  SQUARES,
  PAWN_MOVES,
  RANKS,
  BOARD_BOUNDARIES,
} = require("./constants");
const {
  pieceColor,
  swapTurn,
  squareByIndex,
  squareRankByIndex,
  validateFEN,
} = require("./utils");

const Chess = function () {
  let board = new Array(128);
  let turn = COLORS.WHITE;
  let moveNumber = 1;

  const startGame = (fen = DEFAULT_FEN) => {
    loadGame(fen);
  };

  const resetGame = () => {
    loadGame(DEFAULT_FEN);
  };

  const loadGame = (fen) => {
    if (!validateFEN(fen)) {
      throw "Invalid fen is passed in";
    }
    const fenArray = fen.split(/\s+/);
    let squareIndex = 0;
    const piecePositions = fenArray[0];
    turn = fenArray[1];
    moveNumber = parseInt(fenArray[5]);

    for (let position of piecePositions) {
      let pieceNotation = position;
      if (pieceNotation === "/") {
        squareIndex += 8;
      } else if (parseInt(pieceNotation) > 0) {
        squareIndex += parseInt(pieceNotation);
      } else {
        let square = squareByIndex(squareIndex);
        placePieceOnBoard(pieceNotation, square);
        squareIndex += 1;
      }
    }
  };

  const registerMove = (board, from, to, color) => {
    const move = {
      color: color,
      from: from,
      to: to,
      fromMatrixNotation: squareByIndex(from),
      toMatrixNotation: squareByIndex(to),
      piece: board[from].type,
    };

    if (board[to] && color !== board[to].color) {
      move.attackMove = true;
      move.captures = board[to].type;
    }
    return move;
  };

  const generateAllMoves = () => {
    let moves = [];
    let currMove = {};
    let rightBoundaryArray = BOARD_BOUNDARIES.RIGHT.slice();
    for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
      if (i > rightBoundaryArray[0]) {
        i += 7;
        rightBoundaryArray.shift();
        continue;
      }

      let piece = board[i];

      if (!piece) {
        continue;
      }

      // Generating moves for only PAWNS
      if (piece.type === PIECES.PAWN) {
        // pawn one square move
        let toSquare =
          piece.color === COLORS.BLACK
            ? i + PAWN_MOVES.oneSquare
            : i - PAWN_MOVES.oneSquare;

        if (board[toSquare] == null) {
          currMove = registerMove(board, i, toSquare, piece.color);
          moves.push(currMove);

          // pawn two squares move
          toSquare =
            piece.color === COLORS.BLACK
              ? i + PAWN_MOVES.twoSquares
              : i - PAWN_MOVES.twoSquares;

          const pieceRank = squareRankByIndex(i);

          if (
            (pieceRank === RANKS.RANK_2 || pieceRank === RANKS.RANK_7) &&
            board[toSquare] == null
          ) {
            currMove = registerMove(board, i, toSquare, piece.color);
            moves.push(currMove);
          }
        }

        // pawn left capture moves
        toSquare =
          piece.color === COLORS.BLACK
            ? i + PAWN_MOVES.attackLeft
            : i - PAWN_MOVES.attackRight;

        if (
          BOARD_BOUNDARIES.RIGHT.indexOf(i) !== -1 ||
          BOARD_BOUNDARIES.LEFT.indexOf(i) !== -1
        )
          continue;

        if (board[toSquare] != null && board[toSquare].color !== piece.color) {
          currMove = registerMove(board, i, toSquare, piece.color);
          moves.push(currMove);
        }

        // pawn right capture moves
        toSquare =
          piece.color === COLORS.BLACK
            ? i + PAWN_MOVES.attackRight
            : i - PAWN_MOVES.attackLeft;

        if (
          BOARD_BOUNDARIES.RIGHT.indexOf(i) !== -1 ||
          BOARD_BOUNDARIES.LEFT.indexOf(i) !== -1
        )
          continue;

        if (board[toSquare] != null && board[toSquare].color !== piece.color) {
          currMove = registerMove(board, i, toSquare, piece.color);
          moves.push(currMove);
        }
      }
    }
    return moves;
  };

  const generatePieceMoves = (toMovePiecePosition, moves) => {
    const squareIndex = SQUARES[toMovePiecePosition];
    return moves.filter((moveObj) => moveObj.from === squareIndex);
  };

  const moves = (toMovePiecePosition = null) => {
    let moves = [];

    if (toMovePiecePosition && !SQUARES[toMovePiecePosition]) {
      throw "Invalid piece position";
    }

    if (toMovePiecePosition && !board[SQUARES[toMovePiecePosition]]) {
      throw "No peice available on the selected position";
    }

    const squareIndex = SQUARES[toMovePiecePosition];
    const toMovePiece = board[squareIndex];

    if (toMovePiece && toMovePiece.type !== PIECES.PAWN) {
      throw "Not supported for non-pawn peices";
    }

    moves = generateAllMoves();

    if (!toMovePiece) {
      return moves;
    } else {
      return generatePieceMoves(toMovePiecePosition, moves);
    }
  };

  const movePiece = (move) => {
    if (
      !move ||
      !move.piece ||
      !move.color ||
      !move.from ||
      !move.to ||
      !move.fromMatrixNotation ||
      !move.toMatrixNotation
    ) {
      throw "Invalid move object passed";
    }
    if (move.color !== turn) {
      throw "Opponent's turn";
    }

    if (move.piece !== PIECES.PAWN) {
      throw "Not supported for non-pawn peices";
    }

    const validMoves = moves(move.fromMatrixNotation);

    if (validMoves.filter((el) => el.to === move.to).length === 0) {
      throw "Invalid move";
    }

    board[move.to] = board[move.from];
    board[move.from] = null;
    moveNumber = turn === COLORS.BLACK ? moveNumber + 1 : moveNumber;
    turn = swapTurn(turn);
    // TODO: Implement logic to push to moveHistory array
  };

  const placePieceOnBoard = (pieceNotation, square) => {
    let color = pieceColor(pieceNotation);
    let type = pieceNotation.toLowerCase();
    const piece = {
      type,
      color,
    };
    placePieceOnSquare(piece, square);
  };

  const placePieceOnSquare = (piece, square) => {
    const { type, color } = piece;

    if (!type || !color) {
      return;
    }
    if (Object.values(PIECES).indexOf(type) === -1) {
      return;
    }

    if (Object.keys(SQUARES).indexOf(square) === -1) {
      return;
    }

    const currSquare = SQUARES[square];

    board[currSquare] = {
      type,
      color,
    };
  };

  const boardFenRepresentation = () => {
    let empty = 0;
    let fen = "";

    for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
      if (board[i] == null) {
        empty++;
      } else {
        if (empty > 0) {
          fen += empty;
          empty = 0;
        }
        let color = board[i].color;
        let piece = board[i].type;

        fen +=
          color === COLORS.WHITE ? piece.toUpperCase() : piece.toLowerCase();
      }

      if (BOARD_BOUNDARIES.RIGHT.indexOf(i) !== -1) {
        if (empty > 0) {
          fen += empty;
        }

        if (i !== SQUARES.h1) {
          fen += "/";
        }

        empty = 0;
        i += 8;
      }
    }
    return [fen, turn, "-", "-", 0, moveNumber].join(" ");
  };

  const boardMatrixRepresentation = () => {
    var output = [],
      row = [];

    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      if (board[i] == null) {
        row.push(null);
      } else {
        row.push({ type: board[i].type, color: board[i].color });
      }

      if (BOARD_BOUNDARIES.RIGHT.indexOf(i) !== -1) {
        output.push(row);
        row = [];
        i += 8;
      }
    }
    return output;
  };

  const getMovesHistory = () => {
    throw "The API does not support this functionality yet";
  };

  return Object.freeze({
    startGame: (fen = null) => startGame(fen),
    getFen: () => boardFenRepresentation(),
    getGameState: () => boardMatrixRepresentation(),
    getTurn: () => turn,
    getMoveNumber: () => moveNumber,
    getMoves: (toMovePiecePosition = null) => moves(toMovePiecePosition),
    move: (move) => movePiece(move),
    getMovesHistory: () => getMovesHistory(),
  });
};

module.exports.Chess = Chess;
