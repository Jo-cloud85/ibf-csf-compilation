export interface GameInfo {
  gameId: number
  name: string
}

export interface Comment {
  user: string
  gameId: number
  text: string
  rating: number
}

export interface GameDetail {
  gameId: number
  name: string
  image: string
  url: string
  comments: Comment[]
}