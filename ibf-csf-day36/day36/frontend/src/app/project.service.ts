import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Project } from "./models";
import { firstValueFrom } from "rxjs";

@Injectable({providedIn: 'root'})
export class ProjectService {
    private readonly http = inject(HttpClient)

    save(projects: Project[]): Promise<any> {
        return firstValueFrom(this.http.post('/api/projects', projects))
    }
}