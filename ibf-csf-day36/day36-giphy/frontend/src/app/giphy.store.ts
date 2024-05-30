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

  // query/selector
  readonly getSavedSearches = this.select<string[]>(
    (currStore: SearchResultSlice) => {
      return currStore.results.map(result => result.q)
    }
  )

  // query/selector - using the concept of closure. Q is the unbounded parameter
  readonly getSavedSearchesByQ = (qText: string) => {
    return this.select<SearchResult | undefined>(
      (currStore: SearchResultSlice) => {
        return currStore.results.find(s => s.q == qText)
      }
    )
  }
 
  // Just cleaner syntax i.e. no need {}, thus no need the word 'return'
  readonly getSavedSearchesByQ2 = (qText: string) => 
    // return the select function which takes in a function/query
    this.select<SearchResult | undefined>(
      // this is where the 'nested function' starts, which returns an observable
      (currStore: SearchResultSlice) => currStore.results.find(s => s.q == qText)
    )

  /*
  readonly f = (x: number) => 
    (n: number) => {
      console.log(`n: ${n}, x: ${x}`)
    }
  */

  readonly getFullSavedSearches = this.select<SearchResult[]>(
    (currStore: SearchResultSlice) => currStore.results
  )

  readonly getCachedResultCount = this.select<number>(
    (currStore: SearchResultSlice) => currStore.results.length
  )
}
