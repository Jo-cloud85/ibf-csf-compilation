import { Observable } from 'rxjs';
import { ProjectRepository } from './project.repository';
import { Component, OnInit, inject } from '@angular/core';
import { ProjectStore } from './project.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // If we using Dexie
  // private readonly projectRepo = inject(ProjectRepository)

  // If we using Component Store
  private readonly projectStore = inject(ProjectStore)

  count$!: Observable<number>

  ngOnInit(): void {
    // If we using Dexie
    // this.count$ = this.projectRepo.onCount.asObservable()

    // If we using Component
    this.count$ = this.projectStore.getProjectCount
  }
  

}
