require("../players/player");

function chooseImpostor(players: Player[], totalImpostors : number = 1) : Player[] {
    let sortedPlayers = [...players];

    sortedPlayers = players.sort((a, b) : number => {
        return a.impostorOportunities - b.impostorOportunities;
    });

    const totalChances = sortedPlayers.reduce((total, player) : number => {
        return total + player.impostorOportunities;
    }, 0);

    if (totalChances == 0) {
        return chooseEqualChances(sortedPlayers, totalImpostors);
    }

    for(let i = 0; i < totalImpostors; i++) {
        
    }
    
    return [];
}

function chooseEqualChances(players : Player[], totalImpostors : number = 1) : Player[] {
    let impostors : Player[] = [];

    for(let i = 0; i < totalImpostors; i++) {
        const totalChances = players.length;
        const nextImpostor = getRandomNumber(totalChances);
        impostors.push(players[nextImpostor]);

        players.splice(nextImpostor, 1);
    }

    return impostors;
}

function getRandomNumber(max : number) : number {
    return Math.floor(Math.random() * max);
}