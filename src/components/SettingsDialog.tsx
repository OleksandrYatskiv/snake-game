// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   DialogActions,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   SelectChangeEvent,
// } from '@mui/material';
// import { Player } from './storageUtils';

// interface SettingsDialogProps {
//   open: boolean;
//   onClose: () => void;
//   onSettingsSubmit: (name: string, difficulty: string) => void;
//   initialName: string;
//   initialDifficulty: string;
// }


// const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onClose, onSettingsSubmit }) => {
//   const [name, setName] = useState(localStorage.getItem('userName') || '');
//   const [playerDifficulty, setPlayerDifficulty] = useState(localStorage.getItem('selectedDifficulty') || 'easy');

//   function savePlayerToLocalStorage(player: Player) {
//     const existingPlayersJSON = localStorage.getItem('players');
//     let existingPlayers: Player[] = [];
//     if (existingPlayersJSON) {
//       existingPlayers = JSON.parse(existingPlayersJSON);
//     }
//     existingPlayers.push(player);
//     localStorage.setItem('players', JSON.stringify(existingPlayers));
//   }

//   const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newName = event.target.value;
//     setName(newName);
//     // Store the username in local storage
//     localStorage.setItem('userName', newName);
//   };

//   const handleDifficultyChange = (event: SelectChangeEvent<string>) => {
//     const newDifficulty = event.target.value;
//     setPlayerDifficulty(newDifficulty);
//     // Store the difficulty in local storage
//     localStorage.setItem('selectedDifficulty', newDifficulty);
//   };

//   const handleSubmit = () => {
//     onSettingsSubmit(name, playerDifficulty);
//     savePlayerToLocalStorage({ name, score: 0, difficulty: playerDifficulty });
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Snake Game Settings</DialogTitle>
//       <DialogContent>
//         <TextField
//           sx={{ mt: '20px' }}
//           fullWidth
//           label="Your Name"
//           value={name}
//           onChange={handleNameChange}
//         />
//         <FormControl sx={{ mt: '20px' }} fullWidth>
//           <InputLabel>Difficulty</InputLabel>
//           <Select
//             value={playerDifficulty}
//             onChange={handleDifficultyChange}
//           >
//             <MenuItem value="easy">Easy</MenuItem>
//             <MenuItem value="medium">Medium</MenuItem>
//             <MenuItem value="hard">Hard</MenuItem>
//           </Select>
//         </FormControl>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button onClick={handleSubmit}>Submit</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default SettingsDialog;


import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { Player } from './storageUtils';

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
  onSettingsSubmit: (name: string, difficulty: string) => void;
  initialName: string;
  initialDifficulty: string;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ open, onClose, onSettingsSubmit }) => {
  const [name, setName] = useState(localStorage.getItem('userName') || '');
  const [playerDifficulty, setPlayerDifficulty] = useState(localStorage.getItem('selectedDifficulty') || 'easy');

  const savePlayerToLocalStorage = (player: Player) => {
    const existingPlayersJSON = localStorage.getItem('players');
    let existingPlayers: Player[] = [];
    
    if (existingPlayersJSON) {
      existingPlayers = JSON.parse(existingPlayersJSON);
    }

    const existingPlayerIndex = existingPlayers.findIndex((p) => p.name === player.name);

    if (existingPlayerIndex !== -1) {
      // Player with the same name exists, update their score
      existingPlayers[existingPlayerIndex].score = player.score;
    } else {
      // Player doesn't exist, add the new player
      existingPlayers.push(player);
    }

    localStorage.setItem('players', JSON.stringify(existingPlayers));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
    // Store the username in local storage
    localStorage.setItem('userName', newName);
  };

  const handleDifficultyChange = (event: SelectChangeEvent<string>) => {
    const newDifficulty = event.target.value;
    setPlayerDifficulty(newDifficulty);
    // Store the difficulty in local storage
    localStorage.setItem('selectedDifficulty', newDifficulty);
  };

  const handleSubmit = () => {
    onSettingsSubmit(name, playerDifficulty);
    savePlayerToLocalStorage({ name, score: 0, difficulty: playerDifficulty });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Snake Game Settings</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ mt: '20px' }}
          fullWidth
          label="Your Name"
          value={name}
          onChange={handleNameChange}
        />
        <FormControl sx={{ mt: '20px' }} fullWidth>
          <InputLabel>Difficulty</InputLabel>
          <Select
            value={playerDifficulty}
            onChange={handleDifficultyChange}
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
