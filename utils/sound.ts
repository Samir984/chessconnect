"use client";
import { Chess } from "chess.js";


export class MakeSound {
  constructor(gameInstance: Chess) {
    switch (true) {
      case gameInstance.isCheckmate():
        this.checkMateSound();
        break;

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

  checkMateSound = function () {
    console.log("move sound");
    const audio = new Audio("/sound/checkMate.mp3");
    audio.play();
  };

  checkSound = function () {
    console.log("checked sound");
    const audio = new Audio("/sound/check.mp3");
    audio.play();
  };
}
