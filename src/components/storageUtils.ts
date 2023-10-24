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
  }
  existingPlayers.push(player);
  localStorage.setItem('players', JSON.stringify(existingPlayers));
}
