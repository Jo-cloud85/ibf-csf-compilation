export interface CharInfo {
  id: number // naming must match backend model
  name: string
}
  
export interface CharDetail {
  id: number
  name: string
  description: string
  thumbnailURL: string
  resourceURI: string
  comments: Comment[]
}

export interface Comment {
  commentId: string;
  characterId: number;
  text: string;
  timestamp: Date;
}
  