import Game from "../../game/game.model"
import Player from "../../players/player.model"

describe("testing game model", () => {
    test("adding a new player to a game", () => {
        const player = new Player("1", "player 1");
        const game = new Game([], 3);

        game.addNewPlayer(player);

        expect(game.players.length).toBe(1);
        expect(game.players[0].id).toBe(player.id);
    });

    test("adding twice the same player should error", () => {
        const player = new Player("1", "player 1");
        const game = new Game([], 3);

        game.addNewPlayer(player);

        expect(game.players.length).toBe(1);
        expect(game.players[0].id).toBe(player.id);


        expect(() => {
            game.addNewPlayer(player);
        }).toThrow(Error("Player already exist"));
    });

    test("remove an existing player", () => {
        const player = new Player("1", "player 1");
        const game = new Game([], 3);

        game.addNewPlayer(player);

        expect(game.players.length).toBe(1);
        expect(game.players[0].id).toBe(player.id);

        game.removePlayer(player);

        expect(game.players.length).toBe(0);
    });

    test("remove player by id", () => {
        const player = new Player("1", "player 1");
        const game = new Game([], 3);

        game.addNewPlayer(player);

        expect(game.players.length).toBe(1);
        expect(game.players[0].id).toBe(player.id);

        game.removePlayerById(player.id);

        expect(game.players.length).toBe(0);
    });

    test("removing non existing player should have no effect", () => {
        const player = new Player("1", "player 1");
        const anotherPlayer = new Player("2", "player 2");
        const game = new Game([], 3);

        game.addNewPlayer(player);

        expect(game.players.length).toBe(1);
        expect(game.players[0].id).toBe(player.id);

        game.removePlayer(anotherPlayer);

        expect(game.players.length).toBe(1);
        expect(game.players[0].id).toBe(player.id);

        game.removePlayerById(anotherPlayer.id);

        expect(game.players.length).toBe(1);
        expect(game.players[0].id).toBe(player.id);
    });

    test("add a new round to the game", () => {
        const game = new Game([], 3);

        expect(game.currentRound).toBe(1);

        game.nextRound();
        expect(game.currentRound).toBe(2);

        game.nextRound();
        expect(game.currentRound).toBe(3);
    });

    test("add impostors to the game", () => {
        const impostor = new Player("1", "impostor");
        const game = new Game([
            impostor
        ], 3);

        expect(game.impostors.length).toBe(0);

        game.setImpostors([
            impostor
        ]);

        expect(game.impostors.length).toBe(1);
        expect(game.impostors[0].id).toBe(impostor.id);
    });

    test("add impostors fail if no impostors passed", () => {
        const player = new Player("2", "player 2");
        const game = new Game([
            player
        ], 3);

        expect(() => {
            game.setImpostors([]);
        }).toThrow(Error("There are not enough impostors"));
    })

    test("add impostors fail if the impostor is not a player", () => {
        const impostor = new Player("1", "impostor");
        const player = new Player("2", "player 2");
        const game = new Game([
            player
        ], 3);

        expect(() => {
            game.setImpostors([
                impostor
            ]);
        }).toThrow(Error("Impostor needs to be a player of the game"));

        expect(game.impostors.length).toBe(0);
    });

    test("check impostor finds an actual impostor", () => {
        const impostor = new Player("1", "impostor");
        const game = new Game([
            impostor
        ], 3);

        expect(game.impostors.length).toBe(0);

        game.setImpostors([
            impostor
        ]);

        expect(game.isImpostor(impostor)).toBe(true);
    });

    test("check impostor doesn't flag a non impostor", () => {
        const player = new Player("1", "player");
        const impostor = new Player("2", "impostor");
        const game = new Game([
            player,
            impostor
        ], 3);

        expect(game.impostors.length).toBe(0);

        game.setImpostors([
            impostor
        ]);

        expect(game.isImpostor(player)).toBe(false);
    });

    // test("restarting a game values and players statistics", () => {
    //     const player = new Player("1", "player 1");
    //     const anotherPlayer = new Player("2", "player 2");
    //     const impostor = new Player("3", "impostor");

    //     player.impostorOportunities = 10;
    //     anotherPlayer.impostorOportunities = 3;

    //     const game = new Game([
    //         player,
    //         anotherPlayer,
    //         impostor
    //     ], 3);

    //     game.nextRound();

    //     game.restart();
    // });
});