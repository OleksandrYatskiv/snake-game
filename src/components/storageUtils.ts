export interface Player {
  name: string;
  score: number;
  difficulty: string;
}

export function savePlayerToLocalStorage(player: Player) {
  const existingPlayersJSON = localStorage.getItem('players');
  let existingPlayers: Player[] = [];

  if (existingPlayersJSON) {
    existingPlayers = JSON.parse(existingPlayersJSON);

    const playerIndex = existingPlayers.findIndex((p) => p.name === player.name);

    if (playerIndex !== -1) {
      // Player with the same name exists, update their score
      existingPlayers[playerIndex].score = player.score;
    } else {
      // Player doesn't exist, add the new player
      existingPlayers.push(player);
    }
  } else {
    // No players in storage, so add the new player
    existingPlayers.push(player);
  }

  localStorage.setItem('players', JSON.stringify(existingPlayers));
}
