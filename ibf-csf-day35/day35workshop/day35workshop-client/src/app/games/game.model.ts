export interface Game {
    game_id: string,
    name: string,
    index: number
}

export interface GameDetails {
    game_id: string,
    name: string,
    ranking: number,
    thumbnail: string,
    timestamp: string,
    url: string,
    users_rated: number,
    year: number
}

export interface ResponseData {
    [key: string]: Game;
}