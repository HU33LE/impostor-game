class Player {
    id: string;
    name: string;
    impostorOportunities: number;

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
}