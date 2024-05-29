
import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { Project } from "./models";
import { Subject } from "rxjs";

@Injectable()
export class ProjectRepository extends Dexie {

    projectTable!: Dexie.Table<Project, string>   // type is Project model, primary key (id) is a string
    onCount = new Subject<number>

    constructor() {
        // create database
        super('project')
        // create tables
        this.version(1).stores({
            project: 'id' // primary key
        })
        // link to variable outside of constructor
        this.projectTable = this.table('project')
    }

    projectCount(): Promise<number> {
        return this.projectTable.toArray()
            .then(projects => {
                this.onCount.next(projects.length)
                return projects.length
            })
    }

}
