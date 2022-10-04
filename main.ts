import Player from "./players/player.model"
import { chooseImpostor } from "./game/impostors"

const players : Player[] = [
    new Player("1", "player 1"),
    new Player("2", "player 2"),
    new Player("3", "player 3"),
    new Player("4", "player 4"),
    new Player("5", "player 5"),
    new Player("6", "player 6"),
    new Player("7", "player 7"),
];

const chosen : any = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
}

let totalImpostors = 0;

for(let i = 0; i < 100; i++) {
    const impostors = chooseImpostor(players, 1);

    players.map((player) : Player => {
        const coincidence : Player[] = impostors.filter((impostor) => {
            return impostor.id == player.id;
        })

        if (coincidence.length > 0) {
            player.resetOportunities();
            let id = player.id;
            chosen[id]++;
            totalImpostors++;
        } else {
            player.increaseOportunities();
        }

        return player;
    });
}