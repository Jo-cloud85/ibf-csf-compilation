export interface Game {
    game_id: string,
    name: string,
    index: number
}

export interface ResponseData {
    [key: string]: Game;
}