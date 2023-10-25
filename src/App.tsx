import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import AppleLogo from './images/applePixels.png';
import useInterval from './useInterval';
import SettingsDialog from './components/SettingsDialog';
import { Player, savePlayerToLocalStorage } from './components/storageUtils';

const canvasX = 1000;
const canvasY = 1000;
const initialSnake = [[4, 10], [4, 10]];
const initialApple = [14, 10];
const scale = 50;
const timeDelay = 100;
const difficultyDelays = {
  easy: 100,
  medium: 75,
  hard: 50,
};

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState(initialSnake);
  const [apple, setApple] = useState(initialApple);
  const [direction, setDirection] = useState([0, -1]);
  const [delay, setDelay] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [openSettings, setOpenSettings] = useState(true); // Change the initial state to false
  const [currentPlayerName, setCurrentPlayerName] = useState<string>('');
  const [currentPlayerDifficulty, setCurrentPlayerDifficulty] = useState<string>('easy');

  useInterval(() => runGame(), delay);

  useEffect(() => {
    const fruit = document.getElementById('fruit') as HTMLCanvasElement;
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.clearRect(0, 0, canvasX, canvasY);
        ctx.fillStyle = '#a3d001';
        snake.forEach(([x, y]) => ctx.fillRect(x, y, 1, 1));
        ctx.drawImage(fruit, apple[0], apple[1], 1, 1);
      }
    }
  }, [snake, apple, gameOver]);

  function handleSetScore() {
    const storedScore = Number(localStorage.getItem('snakeScore')) || 0;
    if (score > storedScore) {
      localStorage.setItem('snakeScore', JSON.stringify(score));
      savePlayerToLocalStorage({ name: currentPlayerName, score, difficulty: currentPlayerDifficulty });
    }
  }

  function play() {
    setSnake(initialSnake);
    setApple(initialApple);
    setDirection([1, 0]);
    setDelay(difficultyDelays[currentPlayerDifficulty as keyof typeof difficultyDelays]); // Use type assertion
    setScore(0);
    setGameOver(false);
  }

  function checkCollision(head: number[]) {
    for (let i = 0; i < head.length; i++) {
      if (head[i] < 0 || head[i] * scale >= canvasX) return true;
    }
    for (const s of snake) {
      if (head[0] === s[0] && head[1] === s[1]) return true;
    }
    return false;
  }

  function appleAte(newSnake: number[][]) {
    let coord = apple.map(() => Math.floor(Math.random() * (canvasX / scale)));
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = coord;
      setScore(score + 1);
      setApple(newApple);
      return true;
    }
    return false;
  }

  function runGame() {
    const newSnake = [...snake];
    const newSnakeHead = [newSnake[0][0] + direction[0], newSnake[0][1] + direction[1]];
    newSnake.unshift(newSnakeHead);

    if (gameOver || checkCollision(newSnakeHead)) {
      setDelay(null);
      handleSetScore();
      setGameOver(true);
      setOpenSettings(true); // Open the settings dialog when the game is over
    } else if (!appleAte(newSnake)) {
      newSnake.pop();
    }

    setSnake(newSnake);
  }

  function changeDirection(e: React.KeyboardEvent<HTMLDivElement>) {
    switch (e.key) {
      case 'ArrowLeft':
        setDirection([-1, 0]);
        break;
      case 'ArrowUp':
        setDirection([0, -1]);
        break;
      case 'ArrowRight':
        setDirection([1, 0]);
        break;
      case 'ArrowDown':
        setDirection([0, 1]);
        break;
    }
  }

  return (
    <div onKeyDown={(e) => changeDirection(e)}>
      <img id="fruit" src={AppleLogo} alt="fruit" width="30" />
      <canvas className="playArea" ref={canvasRef} width={`${canvasX}px`} height={`${canvasY}px`} />
      {gameOver && <div className="gameOver">Game Over</div>}
      <button onClick={play} className="playButton">
        Play
      </button>
      <div className="scoreBox">
        <h2>Score: {score}</h2>
        <h2>High Score: {localStorage.getItem('snakeScore') || 0}</h2>
      </div>
      <SettingsDialog
        open={openSettings}
        onClose={() => setOpenSettings(false)} // Close the settings dialog
        onSettingsSubmit={(name: string, difficulty: string) => {
          console.log('Name:', name);
          console.log('Difficulty:', difficulty);
          setCurrentPlayerName(name);
          setCurrentPlayerDifficulty(difficulty);
          setOpenSettings(false); // Close the settings dialog after submission
        }}
        initialName={currentPlayerName}
        initialDifficulty={currentPlayerDifficulty}
      />
      <div className="playerRatings">
        <h2>Player Ratings</h2>
        <ul>
          {JSON.parse(localStorage.getItem('players') || '[]')
            .filter((player: Player) => player.difficulty === 'easy')
            .sort((a: any, b: any) => b.score - a.score)
            .map((player: any, index: number) => (
              <li key={index}>
                {player.name}: {player.score}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
