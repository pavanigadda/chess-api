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
