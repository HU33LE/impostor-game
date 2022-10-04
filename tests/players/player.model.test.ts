import Player from "../../players/player.model";

describe("testing player model", () => {
    test("increase impostor oportunities", () => {
        let player = new Player("0", "player 0");

        expect(player.impostorOportunities).toBe(0);

        player.increaseOportunities();
        expect(player.impostorOportunities).toBe(1);

        player.increaseOportunities();
        expect(player.impostorOportunities).toBe(2);
    });

    test("reset impostor oportunities", () => {
        let player = new Player("0", "player 0");

        for(let i = 0; i < 3; i++) {
            player.increaseOportunities();
        }

        player.resetOportunities();
        expect(player.impostorOportunities).toBe(0);
    });
});