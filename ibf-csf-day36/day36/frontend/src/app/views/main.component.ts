import { Component, OnInit, inject } from '@angular/core';
import { ProjectRepository } from '../project.repository';
import { ProjectInfo } from '../models';
import { ProjectService } from '../project.service';
import { ProjectStore } from '../project.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  private readonly projectRepo = inject(ProjectRepository)
  private readonly projectSvc = inject(ProjectService)
  private readonly projectStore =  inject(ProjectStore)

  projectInfo: ProjectInfo[] = []
  // If you want Promise
  // projectInfoP$!: Promise<ProjectInfo[]>

  // If you want Observable
  projectInfoO$!: Observable<ProjectInfo[]>

  ngOnInit(): void {
    // From Dexie
    // this.projectInfoP$ = this.getProjects()

    // From Component Store
    this.projectInfoO$ = this.projectStore.getProjectInfo
    this.projectRepo.projectCount()
  }

  // This is using Dexie
  // private getProjects(): Promise<ProjectInfo[]> {
  //   return this.projectRepo.projectTable.toArray()
  //     .then(projects => {
  //       return projects.map(p => {
  //         return {
  //           id: p.id,
  //           projectName: p.projectName,
  //           taskCount: p.tasks.length
  //         } as ProjectInfo
  //       })
  //     })
  // }

  // This is using Dexie
  // deleteProject(projId: string) {
  //   this.projectInfoP$ = this.projectRepo.projectTable.delete(projId)
  //     .then(result => {
  //       console.info('>>> deleted:', projId)
  //       this.projectRepo.projectCount()
  //       return this.getProjects()
  //     })
  // }

  // This is using Dexie
  // persist() {
  //   this.projectRepo.projectTable.toArray()
  //     .then(projects => this.projectSvc.save(projects))
  //     .then(result => console.info('>>> result:', result))
  //     .catch(error => console.error('>>> error:', error))
  // }

}