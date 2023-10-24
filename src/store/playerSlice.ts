import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Player {
  name: string;
  score: number;
  difficulty: string;
}

interface PlayerState {
  players: Player[];
  selectedDifficulty: string;
}

const initialState: PlayerState = {
  players: [],
  selectedDifficulty: 'easy',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    updatePlayerData: (state, action: PayloadAction<Player>) => {
      const { name, score, difficulty } = action.payload;
      const existingPlayer = state.players.find((player) => player.name === name);

      if (existingPlayer) {
        if (score > existingPlayer.score) {
          existingPlayer.score = score;
        }
      } else {
        state.players.push({ name, score, difficulty });
      }
    },
    setDifficulty: (state, action: PayloadAction<string>) => {
      state.selectedDifficulty = action.payload;
    },
  },
});

export const { setDifficulty, updatePlayerData } = playerSlice.actions;
export const selectPlayerData = (state: { player: PlayerState }) => state.player.players;

export default playerSlice.reducer;
