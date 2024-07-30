export const BOARD_WIDTH = 660;
export const SQUARE_SIZE = BOARD_WIDTH / 8;

export function getSquarePosition(square: string): {
  top: number;
  left: number;
} {
  const file = square[0];
  const rank = parseInt(square[1], 10);
  const fileIndex = "abcdefgh".indexOf(file);
  const rankIndex = 8 - rank;
  return {
    top: rankIndex * SQUARE_SIZE,
    left: fileIndex * SQUARE_SIZE,
  };
}
