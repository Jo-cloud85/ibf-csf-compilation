export interface SearchResult {
    date: number
    q: string
    urls: string[]
}

export interface SearchResultSlice {
    results: SearchResult[]
}