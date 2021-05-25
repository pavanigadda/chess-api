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

const validateFEN = (input) => {
  const fenArr = input.split(/\s+/);
  const piecePositions = fenArr[0];
  const turn = fenArr[1];
  const moveNumber = parseInt(fenArr[5]);

  if (fenArr.length !== 6) {
    return false;
  }

  if (!isValidPieceNotation(piecePositions)) {
    return false;
  }

  // check if turn value is either w or b
  if (!/^(w|b)$/.test(turn)) {
    return false;
  }

  // check if the move number is a valid number
  if (!/^([1-9][0-9]{0,1})$/.test(moveNumber)) {
    return false;
  }

  //TODO: Implement logic to consider castling, halfnumber, en-Passant techniques once implemented
  return true;
};

const isValidPieceNotation = (pieceNotations) => {
  const ranks = pieceNotations.split("/");
  if (ranks.length !== 8) {
    return false;
  }

  for (let rank of ranks) {
    let validRank = isValidRank(rank);
    if (!validRank) {
      return false;
    }
  }
  return true;
};

const isValidRank = (rank) => {
  const containsConsequtiveNumbers = /\d{2}/.test(rank);

  if (containsConsequtiveNumbers) {
    return false;
  }

  const pieces = rank.split("");
  let sum = 0;

  for (let index in pieces) {
    // Verify to see if each piece is either a valid character or a number between 1 & 8
    if (!/[1-8]|[pkqbnrPKQBNR]/.test(pieces[index])) {
      return false;
    } else {
      if (parseInt(pieces[index]) > 0) {
        sum += parseInt(pieces[index]);
      } else {
        sum++;
      }

      if (parseInt(index) === pieces.length - 1) {
        // Sum of pieces must be 8
        if (sum !== 8) {
          return false;
        }
        sum = 0;
      }
    }
  }

  return true;
};
module.exports = {
  pieceColor,
  swapTurn,
  squareByIndex,
  squareRankByIndex,
  squareFileByIndex,
  validateFEN,
};
