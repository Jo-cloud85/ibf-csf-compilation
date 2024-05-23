import { Injectable } from "@angular/core";
import Dexie from "dexie";

@Injectable({providedIn: 'root'})
export class CitiesStorage extends Dexie {

    /* Returns a Table instance representing the object store with the given name. If database is opened with a defined 
    schema (using db.version().stores()), this method can be called before database has been opened, but if not defining 
    a schema, tables are not accessible until database has been successfully opened. */

    // Table with City as the schema and the primary key is string?
    private cities!: Dexie.Table<{name:string}, string>

    constructor() {
        // Create database if it does not exists
        super('citiesdb')

        const COL_CITY = 'cities'

        // Define schema
        this.version(1).stores({
            [COL_CITY]: '&name'
        })
        this.cities = this.table(COL_CITY)
    }

    addCity(city: string): Promise<string> {
        return this.cities.add({name: city})
    }

    getAllCities(): Promise<{name: string}[]> {
        return this.cities.toArray();
    }
}