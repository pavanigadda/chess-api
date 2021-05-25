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
} = require("./utils");

class Chess {
  constructor() {
    board = new Array(128);
    turn = COLORS.WHITE;
    moveNumber = 1;
  }

  startGame(fen = DEFAULT_FEN) {
    loadGame(fen);
  }

  resetGame() {
    loadGame(DEFAULT_FEN);
  }

  #loadGame(fen) {
    //TODO: implement logic to validate user provided fen
    const fenArray = fen.split(/\s+/);
    let squareIndex = 0;
    const piecePositions = fenArray[0];
    this.turn = fenArray[1];
    this.moveNumber = parseInt(fenArray[5]);

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
  }

  gameCurrentState(detailed = false) {
    return detailed ? boardMatrixRepresentation() : boardFenRepresentation();
  }

  #registerMove(board, from, to, color) {
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
  }

  #generateAllMoves() {
    let moves = [];
    let currMove = {};
    for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
      if (BOARD_BOUNDARIES.RIGHT.indexOf(i) !== -1) {
        i += 7;
        continue;
      }

      let piece = this.board[i];

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

        if (this.board[toSquare] == null) {
          currMove = registerMove(this.board, i, toSquare, piece.color);
          moves.push(currMove);

          // pawn two squares move
          toSquare =
            piece.color === COLORS.BLACK
              ? i + PAWN_MOVES.twoSquares
              : i - PAWN_MOVES.twoSquares;

          const pieceRank = squareRankByIndex(i);

          if (
            (pieceRank === RANKS.RANK_2 || pieceRank === RANKS.RANK_7) &&
            this.board[toSquare] == null
          ) {
            currMove = registerMove(this.board, i, toSquare, piece.color);
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

        if (
          this.board[toSquare] != null &&
          this.board[toSquare].color !== piece.color
        ) {
          currMove = registerMove(this.board, i, toSquare, piece.color);
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

        if (
          this.board[toSquare] != null &&
          this.board[toSquare].color !== piece.color
        ) {
          currMove = registerMove(this.board, i, toSquare, piece.color);
          moves.push(currMove);
        }
      }
    }
    return moves;
  }

  #generatePieceMoves(toMovePiecePosition, moves) {
    const squareIndex = SQUARES[toMovePiecePosition];
    return moves.filter((moveObj) => moveObj.from === squareIndex);
  }

  moves(toMovePiece = null, toMovePiecePosition = null) {
    let moves = [];

    if (toMovePiece && toMovePiece.type !== PIECES.PAWN) {
      //TODO: Throw error - "Not supported for non-pawn pieces"
      return;
    }

    if (toMovePiece && !toMovePiecePosition) {
      //TODO: Throw error - "specify the position of the peice to be moved"
      return;
    }

    moves = generateAllMoves();

    if (!toMovePiece) {
      return moves;
    } else {
      return generatePieceMoves(toMovePiecePosition, moves);
    }
  }

  movePiece(move) {
    if (!move || !move.piece || !move.color || !move.from || !move.to) {
      //TODO: Throw error - "Invalid move object"
      return;
    }
    if (move.color !== turn) {
      //TODO: Throw error - "It is opponent's turn"
      console.log("Opponent's turn");
      return;
    }

    if (move.piece !== PIECES.PAWN) {
      //TODO: Throw error - "Not supported for non-pawn pieces"
      return;
    }

    this.board[move.to] = this.board[move.from];
    this.board[move.from] = null;
    moveNumber = turn === COLORS.BLACK ? moveNumber + 1 : moveNumber;
    turn = swapTurn(turn);
    // TODO: Implement logic to push to moveHistory array
  }

  #placePieceOnBoard(pieceNotation, square) {
    let color = pieceColor(pieceNotation);
    let type = pieceNotation.toLowerCase();
    const piece = {
      type,
      color,
    };
    placePieceOnSquare(piece, square);
  }

  #placePieceOnSquare(piece, square) {
    const { type, color } = piece;

    // TODO: validate piece
    if (!type || !color) {
      return;
    }
    if (Object.values(PIECES).indexOf(type) === -1) {
      return;
    }

    // TODO: validate square
    if (Object.keys(SQUARES).indexOf(square) === -1) {
      return;
    }

    const currSquare = SQUARES[square];

    this.board[currSquare] = {
      type,
      color,
    };
  }

  #boardFenRepresentation() {
    let empty = 0;
    let fen = "";

    for (let i = SQUARES.a8; i <= SQUARES.h1; i++) {
      if (this.board[i] == null) {
        empty++;
      } else {
        if (empty > 0) {
          fen += empty;
          empty = 0;
        }
        let color = this.board[i].color;
        let piece = this.board[i].type;

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
  }

  boardMatrixRepresentation() {
    var output = [],
      row = [];

    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      if (board[i] == null) {
        row.push(null);
      } else {
        row.push({ type: this.board[i].type, color: this.board[i].color });
      }

      if (BOARD_BOUNDARIES.RIGHT.indexOf(i) !== -1) {
        output.push(row);
        row = [];
        i += 8;
      }
    }
    return output;
  }
}

module.exports.Chess = Chess;
