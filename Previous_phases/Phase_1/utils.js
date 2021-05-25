const { COLORS, SQUARES, RANKS, FILES } = require("./constants");
const pieceColor = (pieceNotation) => {
  return pieceNotation < "a" ? COLORS.WHITE : COLORS.BLACK;
};

const squareByIndex = (index) => {
  const reversedRank = squareRankByIndex(index);
  const fileIndex = squareFileByIndex(index);

  const rank = RANKS.MAX_RANK - reversedRank;
  const file = FILES[fileIndex];

  return `${file}${rank}`;
};

const squareRankByIndex = (index) => {
  switch (index >= 0) {
    case index < SQUARES.a7:
      return 0;
    case index < SQUARES.a6:
      return 1;
    case index < SQUARES.a5:
      return 2;
    case index < SQUARES.a4:
      return 3;
    case index < SQUARES.a3:
      return 4;
    case index < SQUARES.a2:
      return 5;
    case index < SQUARES.a1:
      return 6;
    case index <= SQUARES.h1:
      return 7;
    default:
      return -1;
  }
};

const squareFileByIndex = (index) => {
  return (index % 15) - parseInt(index / 15);
};
const swapTurn = (color) => {
  return color === COLORS.BLACK ? COLORS.WHITE : COLORS.BLACK;
};
module.exports = {
  pieceColor,
  swapTurn,
  squareByIndex,
  squareRankByIndex,
  squareFileByIndex,
};
