import Player from "../players/player"

export function chooseImpostor(players: Player[], totalImpostors : number = 1) : Player[] {
    if (players.length == 0) {
        return [];
    }

    let sortedPlayers = [...players];
    let impostors : Player[] = [];
    let previousValue = sortedPlayers[0].impostorOportunities;
    let equalChances = true;

    totalImpostors = Math.min(players.length, totalImpostors);

    sortedPlayers = sortedPlayers.sort((a, b) : number => {
        return b.impostorOportunities - a.impostorOportunities;
    });

    let totalChances = sortedPlayers.reduce((total, player) : number => {
        if (equalChances && player.impostorOportunities != previousValue) {
            equalChances = false;
        }

        return total + player.impostorOportunities;
    }, 0);

    if (equalChances) {
        return chooseEqualChances(sortedPlayers, totalImpostors);
    }

    for(let i = 0; i < totalImpostors; i++) {
        const chance = getRandomNumber(totalChances);
        const impostor = getImpostorForChance(sortedPlayers, chance);

        totalChances -= impostor!.impostorOportunities;
        
        impostors.push(impostor!);
    }
    
    return impostors;
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

function getImpostorForChance(sortedPlayers : Player[], chosenChance : number) : Player | undefined {
    for(let index in sortedPlayers) {
        let player = sortedPlayers[index];
        if (chosenChance < player.impostorOportunities) {
            sortedPlayers.splice(index as unknown as number, 1);
            return player;
        }

        chosenChance -= player.impostorOportunities;
    }

    return undefined;
}

function getRandomNumber(max : number) : number {
    return Math.floor(Math.random() * max);
}