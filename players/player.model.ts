export default class Player {
    id: string;
    name: string;
    impostorOportunities: number;
    votes: number = 0;
    isEliminated: boolean = false;

    constructor(
        id: string,
        name: string
    ) {
        this.id = id;
        this.name = name;
        this.impostorOportunities = 0;
    }

    increaseOportunities() : void {
        this.impostorOportunities++;
    }

    resetOportunities() : void {
        this.impostorOportunities = 0;
    }

    addVote() : void {
        this.votes++;
    }

    resetVotes() : void {
        this.votes = 0;
    }

    equals(player : Player) {
        return player.id == this.id;
    }

    eliminate() {
        this.isEliminated = true;
    }

    incorporate() {
        this.isEliminated = false;
    }
}