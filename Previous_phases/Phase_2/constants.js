module.exports.COLORS = { BLACK: "b", WHITE: "w" };

module.exports.DEFAULT_FEN =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1";

module.exports.PIECES = {
  KING: "k",
  QUEEN: "q",
  BISHOP: "b",
  KNIGHT: "n",
  ROOK: "r",
  PAWN: "p",
};

module.exports.PAWN_MOVES = {
  oneSquare: 16,
  twoSquares: 32,
  attackLeft: 15,
  attackRight: 17,
};

module.exports.RANKS = {
  RANK_1: 7,
  RANK_2: 6,
  RANK_3: 5,
  RANK_4: 4,
  RANK_5: 3,
  RANK_6: 2,
  RANK_7: 1,
  RANK_8: 0,
  MAX_RANK: 8,
};

module.exports.FILES = {
  0: "a",
  1: "b",
  2: "c",
  3: "d",
  4: "e",
  5: "f",
  6: "g",
  7: "h",
};

//prettier-ignore
module.exports.SQUARES = {
  a8:   0, b8:   1, c8:   2, d8:   3, e8:   4, f8:   5, g8:   6, h8:   7,
  a7:  16, b7:  17, c7:  18, d7:  19, e7:  20, f7:  21, g7:  22, h7:  23,
  a6:  32, b6:  33, c6:  34, d6:  35, e6:  36, f6:  37, g6:  38, h6:  39,
  a5:  48, b5:  49, c5:  50, d5:  51, e5:  52, f5:  53, g5:  54, h5:  55,
  a4:  64, b4:  65, c4:  66, d4:  67, e4:  68, f4:  69, g4:  70, h4:  71,
  a3:  80, b3:  81, c3:  82, d3:  83, e3:  84, f3:  85, g3:  86, h3:  87,
  a2:  96, b2:  97, c2:  98, d2:  99, e2: 100, f2: 101, g2: 102, h2: 103,
  a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
};

module.exports.BOARD_BOUNDARIES = {
  RIGHT: [
    this.SQUARES.h8,
    this.SQUARES.h7,
    this.SQUARES.h6,
    this.SQUARES.h5,
    this.SQUARES.h4,
    this.SQUARES.h3,
    this.SQUARES.h2,
    this.SQUARES.h1,
  ],
  TOP: [
    this.SQUARES.a8,
    this.SQUARES.b8,
    this.SQUARES.c8,
    this.SQUARES.d8,
    this.SQUARES.e8,
    this.SQUARES.f8,
    this.SQUARES.g8,
    this.SQUARES.h8,
  ],
  BOTTOM: [
    this.SQUARES.a1,
    this.SQUARES.b1,
    this.SQUARES.c1,
    this.SQUARES.d1,
    this.SQUARES.e1,
    this.SQUARES.f1,
    this.SQUARES.g1,
    this.SQUARES.h1,
  ],
  LEFT: [
    this.SQUARES.a8,
    this.SQUARES.a7,
    this.SQUARES.a6,
    this.SQUARES.a5,
    this.SQUARES.a4,
    this.SQUARES.a3,
    this.SQUARES.a2,
    this.SQUARES.a1,
  ],
};

module.exports.DEFAULT_STATE = [
  [
    { type: "r", color: "b" },
    { type: "n", color: "b" },
    { type: "b", color: "b" },
    { type: "q", color: "b" },
    { type: "k", color: "b" },
    { type: "b", color: "b" },
    { type: "n", color: "b" },
    { type: "r", color: "b" },
  ],
  [
    { type: "p", color: "b" },
    { type: "p", color: "b" },
    { type: "p", color: "b" },
    { type: "p", color: "b" },
    { type: "p", color: "b" },
    { type: "p", color: "b" },
    { type: "p", color: "b" },
    { type: "p", color: "b" },
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    { type: "p", color: "w" },
    { type: "p", color: "w" },
    { type: "p", color: "w" },
    { type: "p", color: "w" },
    { type: "p", color: "w" },
    { type: "p", color: "w" },
    { type: "p", color: "w" },
    { type: "p", color: "w" },
  ],
  [
    { type: "r", color: "w" },
    { type: "n", color: "w" },
    { type: "b", color: "w" },
    { type: "q", color: "w" },
    { type: "k", color: "w" },
    { type: "b", color: "w" },
    { type: "n", color: "w" },
    { type: "r", color: "w" },
  ],
];

const board = new Array(128);
board[0] = { type: "r", color: "b" };
board[1] = { type: "n", color: "b" };
board[2] = { type: "b", color: "b" };
board[3] = { type: "q", color: "b" };
board[4] = { type: "k", color: "b" };
board[5] = { type: "b", color: "b" };
board[6] = { type: "n", color: "b" };
board[7] = { type: "r", color: "b" };
board[16] = { type: "p", color: "b" };
board[17] = { type: "p", color: "b" };
board[18] = { type: "p", color: "b" };
board[19] = { type: "p", color: "b" };
board[20] = { type: "p", color: "b" };
board[21] = { type: "p", color: "b" };
board[22] = { type: "p", color: "b" };
board[23] = { type: "p", color: "b" };
board[96] = { type: "p", color: "w" };
board[97] = { type: "p", color: "w" };
board[98] = { type: "p", color: "w" };
board[99] = { type: "p", color: "w" };
board[100] = { type: "p", color: "w" };
board[101] = { type: "p", color: "w" };
board[102] = { type: "p", color: "w" };
board[103] = { type: "p", color: "w" };
board[112] = { type: "r", color: "w" };
board[113] = { type: "n", color: "w" };
board[114] = { type: "b", color: "w" };
board[115] = { type: "q", color: "w" };
board[116] = { type: "k", color: "w" };
board[117] = { type: "b", color: "w" };
board[118] = { type: "n", color: "w" };
board[119] = { type: "r", color: "w" };

module.exports.DEFAULT_BOARD = board;
