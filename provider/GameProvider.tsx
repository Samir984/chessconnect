import  { createContext, ReactNode, useContext, useState, useEffect } from "react";


interface GameState {
  board: string[]; // Example game state
  currentPlayer: string;
  winner: string | null;
}

interface GameContextType {
  gameState: GameState;
  startNewGame: () => void;
  makeMove: (move: string) => void;
  // Add more actions as needed
}


const defaultGameContext: GameContextType = {
  gameState: {
    board: Array(9).fill(''), // Example initial state
    currentPlayer: 'Player 1',
    winner: null,
  },
  startNewGame: () => {},
  makeMove: () => {},
};

const GameContext = createContext<GameContextType>(defaultGameContext);

export default function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(defaultGameContext.gameState);


  const startNewGame = () => {
    setGameState({
      board: Array(9).fill(''),
      currentPlayer: 'Player 1',
      winner: null,
    });
  };

  const makeMove = (move: string) => {
    // Implement move logic here
  };

  useEffect(() => {
    // Example setup code if needed
  }, []);

  return (
    <GameContext.Provider value={{ gameState, startNewGame, makeMove }}>
      {children}
    </GameContext.Provider>
  );
}

// Custom hook to use the GameContext
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
