import { Injectable } from "@angular/core";
import { SearchResult, SearchResultSlice } from "./models";
import { ComponentStore } from "@ngrx/component-store";

const INIT_VALUE: SearchResultSlice = {
    results: []
}

@Injectable({providedIn: 'root'})
export class GiphyStore extends ComponentStore<SearchResultSlice> {
    constructor() {
        super(INIT_VALUE)
    }

    // updater/reducer
    readonly saveResult = this.updater<SearchResult>(
        (currStore: SearchResultSlice, result: SearchResult) => {
            //create a new copy of the store
            const newStore: SearchResultSlice = { ...currStore }
            newStore.results.push(result)
            return newStore;
        }
    )

    // query / selector
    readonly getSavedSearches = this.select<string[]>(
        (currStore: SearchResultSlice) => {
            return currStore.results.map(result => result.q)
        }
    )
}
