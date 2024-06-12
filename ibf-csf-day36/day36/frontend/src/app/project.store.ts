// This file is only if you are using state management i.e. storing data in memory using Component Store,
// not Dexie, which is IndexedDB

// AND REMEMBER TO INSTALL THIS:
// npm install @ngrx/component-store

import { Injectable } from "@angular/core";
import { Project, ProjectInfo, ProjectSlice } from "./models";
import { ComponentStore } from "@ngrx/component-store";

const INIT_STORE: ProjectSlice = {
    projects: []
}

@Injectable({providedIn: 'root'})
export class ProjectStore extends ComponentStore<ProjectSlice> {
    constructor() {
        super(INIT_STORE)
    }

    readonly addNewProject = this.updater<Project>(
        (currStore: ProjectSlice, newProject: Project) => {
            // How do I add newProject to store??
            // You DONT add to the existing store. You create a new one from the existing store
            // and add your data to it
            const newStore: ProjectSlice = { ...currStore }
            newStore.projects.push(newProject);
            return newStore;
        }
    )

    readonly getProjectInfo = this.select<ProjectInfo[]>(
        (currStore: ProjectSlice) => {
            // How do I return ProjectInfo[] (this is like our SQL statement)
            // And this returns an Observable
            return currStore.projects.map(
                project => {
                    return {
                        id: project.id,
                        projectName: project.projectName,
                        taskCount: project.tasks.length
                    } as ProjectInfo
                }
            )
        }
    )

    readonly getProjectCount = this.select<number>(
        (currStore: ProjectSlice) => {
          return currStore.projects.length
        }
    )
}