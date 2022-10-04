import { chooseImpostor } from "../../game/impostors";
import Player from "../../players/player.model";

describe("test impostors file", () => {
    test("chooseImpostor should not mutate players array", () => {
        let players : Player[] = [
            new Player("1", "player 1"),
            new Player("2", "player 2"),
            new Player("3", "player 3")
        ];

        chooseImpostor(players, 1);

        expect(players.length).toBe(3);
    });

    test("right amount of impostors are returned", () => {
        let players : Player[] = [
            new Player("1", "player 1"),
            new Player("2", "player 2"),
            new Player("3", "player 3")
        ];

        let impostors = chooseImpostor(players, 1);
        expect(impostors.length).toBe(1);

        impostors = chooseImpostor(players, 3);
        expect(impostors.length).toBe(3);
    });

    test("impostors are not greater than ammount of players", () => {
        let players : Player[] = [
            new Player("1", "player 1"),
            new Player("2", "player 2"),
            new Player("3", "player 3")
        ];

        let impostors = chooseImpostor(players, 5);
        expect(impostors.length).toBe(3);
    })
});