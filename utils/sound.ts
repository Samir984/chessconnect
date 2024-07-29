"use client";
import { Chess } from "chess.js";

// export const pieceMoveSound = function () {
//   const audio = new Audio("/sound/move.mp3");
//   audio.play();
// };

// export const checkSound = function () {
//   const audio = new Audio("/sound/check.mp3");
//   audio.play();
// };

export class MakeSound {
  constructor(gameInstance: Chess) {
    switch (true) {
      case gameInstance.inCheck():
        this.checkSound();
        break;

      default:
        this.pieceMoveSound();
    }
  }

  pieceMoveSound = function () {
    console.log("move sound");
    const audio = new Audio("/sound/move.mp3");
    audio.play();
  };

  checkSound = function () {
    console.log("checked sound");
    const audio = new Audio("/sound/check.mp3");
    audio.play();
  };
}
