import Player from "../players/player.model";

export default class Game {
    players: Player[] = [];
    impostors: Player[] = [];
    topic: string = "";
    maxRounds: number;
    currentRound: number = 1;
    tiedPlayers: Player[] = [];
    latestEliminated: Player | undefined;

    constructor(players: Player[], maxRounds: number) {
        this.players = players;
        this.maxRounds = maxRounds;
    }

    addNewPlayer(player: Player) {
        const duplicated = this.players.filter((existingPlayer) => existingPlayer.equals(player));

        if (duplicated.length > 0) {
            throw new Error("Player already exist");
        }

        this.players.push(player);
    }

    removePlayer(player: Player) {
        this.removePlayerById(player.id);
    }

    removePlayerById(playerId : string) {
        this.players = this.players.filter((player) => player.id != playerId);
    }

    setNewTopic(topic : string) {
        this.topic = topic;
    }

    restart() {
        this.players = this.players.map((player) => {
            player.resetOportunities();
            player.resetVotes();
            player.incorporate();
            return player;
        });

        this.impostors = [];
    }

    isImpostor(player : Player) : boolean {
        const found = this.impostors.filter((impostor) => impostor.equals(player));

        return found.length > 0;
    }

    voteForPlayer(player : Player) {
        this.players.map((existingPlayer) => {
            if (!existingPlayer.isEliminated && existingPlayer.equals(player)) {
                existingPlayer.addVote();
            }

            return existingPlayer;
        });
    }

    processVotes() {
        let players = [...this.players];

        players = players
                    .filter((existingPlayer) => !existingPlayer.isEliminated);
        
        const mostVotes = players.reduce((votes : number, player : Player) : number => {
            if (player.votes > votes) {
                return player.votes;
            }

            return votes;
        }, 0);

        this.tiedPlayers = players.filter((player) => player.votes == mostVotes);

        if (this.tiedPlayers.length == 1) {
            this.eliminatePlayer(this.tiedPlayers[0]);
            this.players.map((existingPlayer) => {
                existingPlayer.resetVotes();
            });
            return;
        }
    }

    eliminatePlayer(player : Player) {
        this.players.map((existingPlayer) => {
            if (existingPlayer.equals(player)) {
                existingPlayer.eliminate();
                existingPlayer.resetOportunities();
                existingPlayer.resetVotes();
            }

            return existingPlayer;
        });
    }
}