export interface Game {
    name: string,
    index: number
}

export interface ResponseData {
    [key: string]: Game;
}